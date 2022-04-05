<template>
  <div class="main">
    <div class="cls">
      <img src="../../public/images/cls.svg">
      <BarChart :data="dataCLS" :labels="labelsCLS" v-if="!isLoading"/>
    </div>
    <div class="fid">
    <img src="../../public/images/fid.svg">-->
     <BarChart :data="dataFID" :labels="labelsFID" v-if="!isLoading"/>
   </div>
   <div class="lcp">
     <img src="../../public/images/lcp.svg">
     <BarChart :data="dataLCP" :labels="labelsLCP" v-if="!isLoading"/>
   </div>
  </div>
  <div v-if="false">
  {{responseData.filter(i => i.metrics_name === 'largest_contentful_paint')}}
  </div>
</template>

<script>


import BarChart from "@/components/BarChart";

export default {
  name: 'ChartsView.vue',
  components: { BarChart },
  data() {
    return {
      responseData: [],
      test: [],
      isLoading: true,
      dataCLS: {},
      labelsCLS: [],
      dataFID: [],
      labelsFID: [],
      dataLCP: [],
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
      ]
    }
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.responseData = '';
        this.responseData = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${this.url.join('&url=')}&form_factor=phone`, {
          method: 'GET',
        }).then(res => res.json())
        this.isLoading = false;
      } catch (e) {
        console.log(e)
      }
      this.filterCLS();
      this.filterFID();
      this.filterLCP();
    },
    filterCLS() {
      this.labelsCLS = [];
      const cls = {
        good: { '0.02': [], '0.04': [], '0.06' :[], '0.08': [], '0.1': [] },
        needs_improvement: { '0.12': [], '0.16': [],'0.2': [], '0.25': [] },
        poor: { '0.3': [], '0.4': [], '0.5': [], '0.6': [], '0.7': [], '0.8': [], '0.9': [], '1.0': [] }
      }
      const result = this.groupMetricsUrl(this.responseData.filter(i => i.metrics_name === 'cumulative_layout_shift'), cls);
      this.dataCLS = result.arrayMetrics;
      this.labelsCLS = result.label;
    },
    filterFID() {
      const fid = {
        good: { '20': [], '40': [], '60' :[], '80': [], '100': [] },
        needs_improvement: { '120': [], '160': [], '200': [], '240': [], '300': [] },
        poor: { '320': [], '360': [],'400': [], '500': [] }
      }
      const result = this.groupMetricsUrl(this.responseData.filter(i => i.metrics_name === 'first_input_delay'), fid);

      this.dataFID = result.arrayMetrics;
      this.labelsFID= result.label;
    },
    filterLCP() {
      const fid = {
        good: { '0.5': [], '1.0': [], '1.5' :[], '2.0': [], '2.5': [] },
        needs_improvement: { '2.7': [], '3.0': [], '3.5': [], '4.0': []},
        poor: { '4.5': [], '5.0': [],'5.5': [], '6.0': [] }
      }
      const result = this.groupMetricsUrl(this.responseData.filter(i => i.metrics_name === 'largest_contentful_paint'), fid);

      this.dataLCP = result.arrayMetrics;
      this.labelsLCP = result.label;
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

</style>