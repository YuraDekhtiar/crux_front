<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" >
  </head>

  <div class="ml-4">
    <input class="form-check-input" type="checkbox" v-bind:value="true" v-model="formFactor.desktop" id="desktop">
    <label class="form-check-label" for="desktop">
      Desktop
    </label>
  </div>
  <div class="ml-4">
    <input class="form-check-input" type="checkbox" v-bind:value="true" v-model="formFactor.phone" id="phone">
    <label class="form-check-label" for="phone">
      Phone
    </label>
  </div>




  <table class="table table-bordered">
    <thead>
    <tr>
      <th scope="col">URL</th>
      <th scope="col">LCP</th>
      <th scope="col">FID</th>
      <th scope="col">CLS</th>
    </tr>
    </thead>

    <tbody>
    <tr class="v-table_body" v-for="(item, index) in data" :key="index">
      <th scope="row" >{{item.url}}</th>
      <td>

      </td>
      <td>

      </td>
      <td>

      </td>
    </tr>
    </tbody>
  </table>


</template>

<script>
export default {
  name: "AnalysisView",
  components: {
  },
  data() {
    return {
      data: '',
      formFactor: {
        desktop: 'true',
        phone: 'true',
      },

      url: 'https://auto.ria.com/uk/',
      loading: true,
    }
  },
  methods: {

  }
}
</script>

<style scoped>
textarea {
  width: 100%; /* Ширина поля в процентах */
  height: 200px; /* Высота поля в пикселах */
  resize: none; /* Запрещаем изменять размер */
}
button {
  height: 50px;
  width: 300px;
  position:relative ;
}


</style>