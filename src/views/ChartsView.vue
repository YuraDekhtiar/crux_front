<template>
  <div class="content">
      <b-tabs content-class="mt-3" align="left">
        <Preloader v-if="isLoading" color="red" scale="0.6" />
        <b-tab class="main" title="DESKTOP" active  v-else>
            <div class="cls">
            <img src="../../public/images/cls.svg" class="image" alt="CLS">
            <BarChart :data="dataClsDesktop" :labels="labelsCLS"/>
            <hr/>
          </div>
            <div class="fid">
            <img src="../../public/images/fid.svg" class="image" alt="FID">
            <BarChart :data="dataFidDesktop" :labels="labelsFID" />
            <hr/>
          </div>
            <div class="lcp">
            <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
            <BarChart :data="dataLcpDesktop" :labels="labelsLCP"/>
            <hr/>
          </div>
        </b-tab>
        <Preloader v-if="isLoading" color="red" scale="0.6" />
        <b-tab class="main" title="PHONE" v-else>
          <div class="cls">
            <img src="../../public/images/cls.svg" class="image" alt="CLS">
            <BarChart :data="dataClsPhone" :labels="labelsCLS"/>
            <hr/>
          </div>
          <div class="fid">
            <img src="../../public/images/fid.svg" class="image" alt="FID">
            <BarChart :data="dataFidPhone" :labels="labelsFID" />
            <hr/>
          </div>
          <div class="lcp">
            <img src="../../public/images/lcp.svg" class="image"  alt="LCP">
            <BarChart :data="dataLcpPhone" :labels="labelsLCP"/>
            <hr/>
          </div>
        </b-tab>
      </b-tabs>
  </div>
</template>

<script>
import Preloader from '../components/Preloader'
import BarChart from "@/components/BarChart";
//import LineChart from "@/components/LineChart";

export default {
  name: 'ChartsView.vue',
  components: {BarChart, Preloader },
  data() {
    return {
      responseDataDesktop: [],
      responseDataPhone: [],
      test: [],
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
      url: [
          'https://auto.ria.com/news/',
          'https://auto.ria.com/uk/legkovie/?page=1',
          'https://auto.ria.com/uk/legkovie/?page=2',
          'https://auto.ria.com/uk/legkovie/?page=3',
          'https://auto.ria.com/uk/legkovie/?page=4',
          'https://auto.ria.com/uk/legkovie/?page=5',
          'https://auto.ria.com/uk/legkovie/?page=10',
          'https://auto.ria.com/uk/legkovie/?page=12',
          'https://auto.ria.com/car/used/',
          'https://auto.ria.com/uk/legkovie/?page=22',
          'https://auto.ria.com/uk/all_for_auto/',
          'https://auto.ria.com/uk/legkovie/?page=60',
          'https://auto.ria.com/uk/newauto/'
      ],
    }
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.responseDataDesktop = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${this.url.join('&url=')}&form_factor=desktop`, {
          method: 'GET',
        }).then(res => res.json());
        this.groupDesktop(this.responseDataDesktop);

        this.responseDataPhone = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${this.url.join('&url=')}&form_factor=phone`, {
          method: 'GET',
        }).then(res => res.json());
        this.isLoading = false;
      } catch (e) {
        console.log(e)
      }

      this.groupDPhone(this.responseDataPhone);
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
    groupDPhone(data) {
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
        poor: { '320': [], '360': [],'400': [], '500': [] }
      }
      const result = this.groupMetricsUrl(data.filter(i => i.metrics_name === 'first_input_delay'), fid);
      return {data:result.arrayMetrics, label:result.label};
    },
    filterLCP(data) {
      const fid = {
        good: { '0.5': [], '1.0': [], '1.5' :[], '2.0': [], '2.5': [] },
        needs_improvement: { '2.7': [], '3.0': [], '3.5': [], '4.0': []},
        poor: { '4.5': [], '5.0': [],'5.5': [], '6.0': [] }
      }
      const result = this.groupMetricsUrl(data.filter(i => i.metrics_name === 'largest_contentful_paint'), fid);

      return{data:result.arrayMetrics, label:result.label}
    },
    groupMetricsUrl(data, arrayMetrics) {
      let prev = null;
      const label = [];
      for(const status in arrayMetrics) {
        for(const curr in arrayMetrics[status]) {
          label.push(curr)
          prev = prev === null ? 0 : prev
          arrayMetrics[status][curr] = (data.filter(i => i.percentiles_75.toFixed(2) >= prev && i.percentiles_75.toFixed(2) <= curr ).length)
          prev = curr + 0.1;
        }
      }
      return {arrayMetrics, label};
    }
  }
}
</script>

<style scoped>
.main {
  width: 800px;
  margin: 0 auto;
}

.image {
  height: 100px;
  width: 100%;



}

</style>