<template>
  <Preloader v-if="isLoading" color="red" scale="0.6" />
  <div v-else class="content">
    <div>
      Кількість URL(запити): {{response.query_url_count}}
      Кількість URL(відповіді): {{response.res_url_count}}

    </div>
    <b-tabs content-class="mt-3" align="left">
      <b-tab title="DESKTOP" active>
        <div class="chart">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'cls'" />
          <div>Кількість URL: {{response.desktop.cls}}</div>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'fid'" />
          <div>Кількість URL: {{response.res_url_count}}</div>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'lcp'" />
          <div>Кількість URL: {{response.res_url_count}}</div>
        </div>
        <hr/>
      </b-tab>
      <b-tab title="PHONE">
        <div class="chart">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'cls'" />
          <div>Кількість URL: {{response.res_url_count}}</div>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'fid'" />
          <div>Кількість URL: {{response.res_url_count}}</div>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'lcp'" />
          <div>Кількість URL: {{response.res_url_count}}</div>
        </div>
        <hr/>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Preloader from '../components/Preloader'
import LineChart from "@/components/LineChart";
import {mapGetters} from "vuex";

export default {
  name: 'ChartsLineView.vue',
  components: {
    LineChart,
    Preloader
  },
  data() {
    return {
      isLoading: true,
      response: {},
      url: ''
    }
  },
  computed: mapGetters(['getUrlId']),
  async mounted() {
    if (this.getUrlId.length === 0)
      await this.$store.dispatch('fetchAllUrlHistory');

    await this.fetch();
    this.isLoading = false;

  },
  methods: {
    async fetch() {
      try {
        this.response = await fetch(`http://localhost:3000/dynamics_charts/?url_id=${this.getUrlId.join('&url_id=')}&date_from=2022-03-30&date_to=2022-04-08`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.chart {
  min-width: 50%;
  max-width: 80%;
  margin: 0 auto;
}

.image {
  height: 100px;
}

</style>