<template>
  <Preloader v-if="isLoading" color="red" scale="0.6" />
  <div v-else class="content">
    <b-tabs content-class="mt-3" align="left">
      <b-tab title="DESKTOP" active>
        <div class="chart mb-4">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <BarChart :data="response.desktop.cls" :labels="response.desktop.cls.labels"/>
          <div class="float-left ">X - "Percentile" | Y - "URL count"</div>

        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <BarChart :data="response.desktop.fid" :labels="response.desktop.fid.labels"/>
          <div class="float-left ">X - "Percentile" | Y - "URL count"</div>
        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <BarChart :data="response.desktop.lcp" :labels="response.desktop.lcp.labels"/>
          <div class="float-left ">X - "Millisecond" | Y - "URL count"</div>
        </div>
      </b-tab>
      <b-tab title="PHONE">
        <div class="chart">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <BarChart :data="response.phone.cls" :labels="response.phone.cls.labels"/>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <BarChart :data="response.phone.fid" :labels="response.phone.fid.labels"/>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <BarChart :data="response.phone.lcp" :labels="response.phone.lcp.labels"/>
        </div>
        <hr/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Preloader from '../components/Preloader'
import BarChart from "@/components/BarChart";
import {mapGetters} from 'vuex'

export default {
  name: 'ChartsView.vue',
  components: {
    BarChart,
    Preloader },
  data() {
    return {
      isLoading: true,
      response: [],
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
        this.response = await fetch(`http://localhost:3000/statistics_charts/?url_id=${this.getUrlId.join('&url_id=')}&date=2022-04-08`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
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