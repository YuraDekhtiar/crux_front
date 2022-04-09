<template>
  <Preloader v-if="isLoading" />
  <div v-else class="content">
    <div>
      Tracking url: {{response.query_url_count}} | Tests url: {{response.result_url_count}}
    </div>
    <div style="width: 300px; margin:0 auto" class="mt-2">
      <Datepicker v-model="date" :enableTimePicker="false" @update:modelValue="fetch" range/>
    </div>
    <b-tabs content-class="mt-3" align="left">
      <b-tab title="DESKTOP" active>
        <div class="chart mb-4">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'cls'" />
          <div class="float-left ">X - "Date" | Y - "URL count"</div>
        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'fid'" />
          <div class="float-left ">X - "Millisecond" | Y - "URL count"</div>
        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <LineChart :data="response.desktop" :labels="response.labels" :keyMetric="'lcp'" />
          <div class="float-left ">X - "Millisecond" | Y - "URL count"</div>
        </div>
        <hr/>
      </b-tab>
      <b-tab title="PHONE">
        <div class="chart mb-4">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'cls'" />
          <div class="float-left ">X - "Date" | Y - "URL count"</div>
        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'fid'" />
          <div class="float-left ">X - "Date" | Y - "URL count"</div>
        </div>
        <hr/>
        <div class="chart mb-4">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <LineChart :data="response.phone" :labels="response.labels" :keyMetric="'lcp'" />
          <div class="float-left ">X - "Date" | Y - "URL count"</div>
        </div>
        <hr/>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Preloader from '../components/Preloader'
import LineChart from "@/components/LineChart";
import Datepicker from '@vuepic/vue-datepicker';
import { ref, onMounted } from 'vue';

import '@vuepic/vue-datepicker/dist/main.css'
import {mapGetters} from "vuex";

export default {
  name: 'ChartsLineView.vue',
  components: {
    LineChart,
    Preloader,
    Datepicker
  },
  setup() {
    const date = ref();
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() - 7));
      date.value = [endDate, startDate];
    })
    return {
      date,
    }
  },
  data() {
    return {
      isLoading: true,
      response: {},
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
      this.isLoading = true;
      try {
        this.response = await fetch(`${this.$store.state.backendUrl}/dynamics_charts/?url_id=${this.getUrlId.join('&url_id=')}&date_from=${this.date.map(i => i.toISOString().slice(0, 10)).join('&date_to=')}`, {
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