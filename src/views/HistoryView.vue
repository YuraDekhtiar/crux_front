<template>
  <div class="container text-center">
    <div class="table-responsive ">
      <TableHistory :fields='fields' :urlData ="[...responseData]" :fieldsName="fieldsName"></TableHistory>
    </div>
  </div>
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
    async fetchDataTest() {
      try {
        this.responseData = await fetch(`http://127.0.0.1:3000/`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false;
    },
    async fetchData() {
      try {
        this.responseData = await fetch(`http://localhost:3000/adminPanel/metrics_by_url_id/`, {
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