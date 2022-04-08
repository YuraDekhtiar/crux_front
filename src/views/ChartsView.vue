<template>
  <Preloader v-if="isLoading" color="red" scale="0.6" />
  <div v-else class="content">
    <div>
      Кількість URL: {{this.getAllUrls.length}}
    </div>
    <b-tabs content-class="mt-3" align="left">
      <b-tab title="DESKTOP" active>
        <div class="chart">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <BarChart :data="dataClsDesktop" :labels="labelsCLS"/>
          <div></div>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <BarChart :data="dataFidDesktop" :labels="labelsFID" />
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <BarChart :data="dataLcpDesktop" :labels="labelsLCP"/>
        </div>
        <hr/>
      </b-tab>
      <b-tab title="PHONE">
        <div class="chart">
          <img src="../../public/images/cls.svg" class="image" alt="CLS">
          <BarChart :data="dataClsPhone" :labels="labelsCLS"/>
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/fid.svg" class="image" alt="FID">
          <BarChart :data="dataFidPhone" :labels="labelsFID" />
        </div>
        <hr/>
        <div class="chart">
          <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
          <BarChart :data="dataLcpPhone" :labels="labelsLCP"/>
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
      responseDataDesktop: [],
      responseDataPhone: [],
      isLoading: true,
      dataClsDesktop: {},
      dataClsPhone: {},
      labelsCLS: [],
      dataFidDesktop: [],
      dataFidPhone: [],
      labelsFID: [],
      dataLcpDesktop: [],
      dataLcpPhone: [],
      labelsLCP: [],
    }
  },
  computed: mapGetters(['getAllUrls', 'getDataCharts']),
  async mounted() {
    if(this.$route.params.type === 'analyze') {
      await this.groupDesktop(this.getDataCharts.filter(i => i.form_factor === 'desktop'));
      await this.groupPhone(this.getDataCharts.filter(i => i.form_factor === 'phone'));
    } else if(this.$route.params.type === 'history') {
      await this.$store.dispatch('fetchAllUrlHistory');
      await this.fetchDataHistory();
    } else {
      await this.$router.push({name: 'page404'});
    }
    this.isLoading = false;
  },
  methods: {
    async fetchDataHistory() {
      const url = this.getAllUrls;
      try {
        this.responseDataDesktop = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${url.join('&url=')}&form_factor=desktop`, {
          method: 'GET',
        }).then(res => res.json());
        this.groupDesktop(this.responseDataDesktop);

        this.responseDataPhone = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${url.join('&url=')}&form_factor=phone`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
      this.groupPhone(this.responseDataPhone);
    },
    groupDesktop(data) {
      let result = this.filterCLS(data);
      this.dataClsDesktop = result.data;
      this.labelsCLS = result.label;
      result = this.filterFID(data);
      this.dataFidDesktop = result.data;
      this.labelsFID = result.label;
      result = this.filterLCP(data);
      this.dataLcpDesktop = result.data;
      this.labelsLCP = result.label;
    },
    groupPhone(data) {
      let result = this.filterCLS(data);
      this.dataClsPhone = result.data;
      this.labelsCLS = result.label;
      result = this.filterFID(data);
      this.dataFidPhone = result.data;
      this.labelsFID = result.label;
      result = this.filterLCP(data);
      this.dataLcpPhone = result.data;
      this.labelsLCP = result.label;

    },
    filterCLS(data) {
      const cls = {
        good: { '0.02': [], '0.04': [], '0.06' :[], '0.08': [], '0.1': [] },
        needs_improvement: { '0.12': [], '0.16': [],'0.2': [], '0.25': [] },
        poor: { '0.3': [], '0.4': [], '0.5': [], '0.6': [], '0.7': [], '0.8': [], '0.9': [], '1.0': [] }
      }
      const result = this.groupMetricsUrl(data.filter(i => i.metrics_name === 'cumulative_layout_shift'), cls);
      return {data:result.arrayMetrics, label:result.label};
    },
    filterFID(data) {
      const fid = {
        good: { '20': [], '40': [], '60' :[], '80': [], '100': [] },
        needs_improvement: { '120': [], '160': [], '200': [], '240': [], '300': [] },
        poor: { '320': [], '360': [],'400': [], '600': [], '800': [] }
      }
      const result = this.groupMetricsUrl(data.filter(i => i.metrics_name === 'first_input_delay'), fid);
      return {data:result.arrayMetrics, label:result.label};
    },
    filterLCP(data) {
      const fid = {
        good: { '500': [], '1000': [], '1500' :[], '2000': [], '2500': [] },
        needs_improvement: { '2700': [], '3000': [], '3500': [], '4000': []},
        poor: { '4500': [], '5000': [],'5500': [], '6000': [] }
      }
      const result = this.groupMetricsUrl(data.filter(i => i.metrics_name === 'largest_contentful_paint'), fid);
      return{data:result.arrayMetrics, label:result.label}
    },
    groupMetricsUrl(data, arrayMetrics) {
      let prev = 0.00;
      const label = [];
      for(const status in arrayMetrics) {
        for(const curr in arrayMetrics[status]) {
          label.push(curr)
          arrayMetrics[status][curr] = (data.filter(i => i.percentiles_75 >= prev && i.percentiles_75 <= curr ).length)
          prev = parseFloat(curr) + 0.0001;
        }
      }
      return {arrayMetrics, label};
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