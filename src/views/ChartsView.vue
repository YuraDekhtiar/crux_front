<template>
  <div class="main">
    <div class="cls">
      <img src="../../public/images/cls.svg">
      <BarChart :data="dataCLS" :labels="labels" v-if="!isLoading"/>
    </div>
    <div class="fid">
      <img src="../../public/images/fid.svg">
      <BarChart :data="dataCLS" :labels="labels" v-if="!isLoading"/>
    </div>
    <div class="lcp">
      <img src="../../public/images/lcp.svg">
      <BarChart :data="dataCLS" :labels="labels" v-if="!isLoading"/>
    </div>

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
      url: [
          'https://auto.ria.com/news/',
          'https://auto.ria.com/uk/legkovie/?page=1',
          'https://auto.ria.com/uk/legkovie/?page=2',
          'https://auto.ria.com/uk/legkovie/?page=3',
          'https://auto.ria.com/uk/legkovie/?page=4',
          'https://auto.ria.com/uk/legkovie/?page=5',
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
        this.responseData = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url=${this.url.join('&url=')}`, {
          method: 'GET',
        }).then(res => res.json())
        this.isLoading = false;
      } catch (e) {
        console.log(e)
      }
      this.filterCLS();
    },
    filterCLS() {
      const data = this.responseData;
      let prev = null;
      this.labelsCLS = [];

      const cls = {
        good: { '0.02': [], '0.04': [], '0.06' :[], '0.08': [], '0.1': [] },
        needs_improvement: { '0.12': [], '0.16': [],'0.2': [], '0.25': [] },
        poor: { '0.3': [], '0.4': [], '0.5': [], '0.6': [], '0.7': [], '0.8': [], '0.9': [], '1.0': [] }

      }
      const cls_data = data.filter(i => i.metrics_name === 'cumulative_layout_shift')
      for(const cls_item in cls) {
        for(const curr in cls[cls_item]) {
          this.labelsCLS.push(curr)
          prev = prev === null ? 0 : prev
          cls[cls_item][curr] = (cls_data.filter(i => i.percentiles_75.toFixed(2) >= prev && i.percentiles_75.toFixed(2) <= curr ).length)
          prev = curr + 0.1;
        }
      }
      this.dataCLS = cls;
    },
    filterFID() {

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