<template>
  <Preloader v-if="isLoading"/>
  <div v-else>
      <TableHistory
          :fields='fields'
          :urlData ="[...responseData]"
          :fieldsName="fieldsName"
          @distributionChartsEvent="viewDistributionCharts"
          @dynamicsChartsEvent="viewDynamicsCharts"
      />
  </div>

</template>

<script>
import TableHistory from '../components/TableHistory.vue'
import {mapMutations} from "vuex";

export default {
  name: "HistoryView",
  components: {
    TableHistory
  },
  data() {
    return {
      responseData: [],
      isLoading: true,
      urlsId: [],
    }
  },
  async beforeMount() {
    this.setUrlId([]);
    await this.fetchData();
    this.isLoading = false;
  },
  setup() {
    const fields = [
      'url','form_factor','good','needs_improvement','poor'
    ]

    const fieldsName = [
      'URL','Device','LCP','FID','CLS'
    ]
    return{ fields, fieldsName}
  },

  methods: {
    ...mapMutations(['setUrlId']),
    async fetchData() {
      try {
        this.responseData = await fetch(`${this.$store.state.backendUrl}/adminPanel/metrics_by_url_id/`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false;
    },
    viewDistributionCharts(urlsId) {
      this.setUrlId(urlsId);
      this.$router.push({path: '/distribution'});
    },
    viewDynamicsCharts(urlsId) {
      this.setUrlId(urlsId);
      this.$router.push({path: '/dynamics'});
    }
  }
}
</script>

<style>
button {
  height: 50px;
  width: 300px;
  position:relative ;
}


</style>
