<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" >
  </head>

<!--  <div class="ml-4">-->
<!--    <input class="form-check-input" type="checkbox" v-bind:value="true" v-model="formFactor.desktop" id="desktop">-->
<!--    <label class="form-check-label" for="desktop">-->
<!--      Desktop-->
<!--    </label>-->
<!--  </div>-->
<!--  <div class="ml-4">-->
<!--    <input class="form-check-input" type="checkbox" v-bind:value="true" v-model="formFactor.phone" id="phone">-->
<!--    <label class="form-check-label" for="phone">-->
<!--      Phone-->
<!--    </label>-->
<!--  </div>-->


  <div class="container text-center  mt-5 mb-5">
    {{test}}
    <div class="table-responsive my-5">
      <!-- The table component -->
      <TableAnalysis :fields='fields' :urlData ="[...responseDataPhone, ...responseDataDesktop]" :fieldsName="fieldsName"></TableAnalysis>
    </div>

  </div>


</template>

<script>
// Importing the table component
import TableAnalysis from '../components/TableAnalysis.vue'

export default {
  name: "HistoryView",
  components: {
    TableAnalysis
  },
  data() {
    return {
      data: [],
      dataAboutUrl:[],
      responseDataDesktop: [],
      responseDataPhone: [],
      getUrlsFromTable: [],
      urlForAnalyse: [],
      isLoading: true,
      urlsId: [],
    }
  },
  async beforeMount() {
    await this.getUrls();
    await this.fetchDataDesktop()
    await this.fetchDataPhone()
  },

  setup() {
    // const urlData = [
    //
    //   {url:"https://auto.ria.com/uk/legkovie/?page=6", form_factor:"phone", lcp:"45", fid: "64", cls: "24"},
    //   {url:"https://makeup.com.ua/ua/categorys/20272/", form_factor:"desktop", lcp:"43", fid: "54", cls: "64"},
    //   {url:"https://auto.ria.com/uk/legkovie/?page=9", form_factor:"desktop", lcp:"53", fid: "24", cls: "23"},
    //   {url:"https://makeup.com.ua/ua/categorys/467/", form_factor:"desktop", lcp:"64", fid: "86", cls: "87"},
    //   {url:"https://auto.ria.com/uk/", form_factor:"phone", lcp:"24", fid: "37", cls: "20"},
    //   {url:"https://dom.ria.com/uk/prodazha-nedvizhimosti/", form_factor:"phone", lcp:"85", fid: "29", cls: "35"},
    //   {url:"https://dom.ria.com/uk/arenda-nedvizhimosti/", form_factor:"desktop", lcp:"54", fid: "57", cls: "56"},
    //   {url:"https://auto.ria.com/uk/legkovie/?page=4", form_factor:"phone", lcp:"43", fid: "64", cls: "22"},
    //
    // ]

    const fields = [
      'url','form_factor','good','needs_improvement','poor'
    ]

    const fieldsName = [
      'URL','Form Factor','LCP','FID','CLS'
    ]

    return{ fields, fieldsName}
  },
  // data() {
  //   return {
  //     data: '',
  //     formFactor: {
  //       desktop: 'true',
  //       phone: 'true',
  //     },
  //
  //     url: 'https://auto.ria.com/uk/',
  //     loading: true,
  //   }
  // },
  methods: {
    async fetchDataDesktop() {
      console.log("start fetch")

      try {
        this.responseDataDesktop = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url_id=${this.urlsId.join('&url_id=')}&form_factor=desktop`, {
          method: 'GET',
        }).then(res => res.json());
       // this.groupDesktop(this.responseDataDesktop);
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false;
    },
    async fetchDataPhone() {
      try {
        this.responseDataPhone = await fetch(`http://127.0.0.1:3000/adminPanel/metrics/?url_id=${this.urlsId.join('&url_id=')}&form_factor=phone`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
      console.log("end fetch")
      this.isLoading = false;
    },
    async getUrls() {
      try {
        this.getUrlsFromTable = await fetch(`http://127.0.0.1:3000/adminPanel/url_history`, {
          method: 'GET',
        })
        .then(res => res.json())
        this.isLoading = false;
      } catch (e) {
        console.log(e)
      }

      this.urlsId = this.getUrlsFromTable.map(u => u.id);
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