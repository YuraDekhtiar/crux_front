<template>
  <div v-if="!isLoading">
      <TableHistory :fields='fields' :urlData ="[...responseData]" :fieldsName="fieldsName"></TableHistory>
  </div>
  <Preloader v-else/>

</template>

<script>
import TableHistory from '../components/TableHistory.vue'

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
      urls: [],
    }
  },
  async beforeMount() {
    await this.fetchData()
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
