<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" >
  </head>
  <div v-if="isElVisible" class="page-main">
    <div class="main-part_input">
      <label>Enter a URL to analyze </label>
    </div>
    <div class="main-part_input">
      <label>or</label>
    </div>
    <div class="main-part_input">
      <input type="file" id="file-input">
      <label for="file-input">upload from file</label>
    </div>


    <div class="input-group m-3">

        <textarea type="text"
                  class="form-control"
                  placeholder="Input URL..."
                  aria-describedby="basic-addon2"
                  accept=".txt"
                  v-model="textWithTextarea"/>
    </div>
    <div class="container-button">

      <button @click="postUrls" class="btn btn-outline-secondary" value="false">START</button>

    </div>
  </div>
  <div class="page-analysis_main" v-else>
    <router-link :to="{name:'home'}">
      <button @click="isElVisible=!isElVisible" class="btn btn-outline-secondary btn-back-to-home" type="button">Back to home</button>
    </router-link>
    <div class="table-analysis m-10" >
      <table class="table table-bordered" >
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
          <th scope="row" ></th>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      data: '',
      url: '',
      loading: true,
      textWithTextarea: '',
      arrayOfUrls: [],
      isElVisible:true ,
    }
  },
  methods: {
    //for button example
    // getTextarea () {
    //     this.arrayOfUrls = this.textWithTextarea.split("\n");
    //     console.log(this.arrayOfUrls)
    // },
    async postUrls() {
      this.isElVisible = !this.isElVisible;
      this.arrayOfUrls = this.textWithTextarea.split("\n");
      console.log(this.arrayOfUrls)
      let data = {url:this.arrayOfUrls}
      const response = await fetch('http://127.0.0.1:3000/adminPanel/analyze_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let resultOfAnalysis = await response.json();
      console.log(resultOfAnalysis);
    },

  }
}
</script>

<style>
input#file-input{
  display: none;
}
input#file-input + label{
  background-color: #4d8cf2;
  padding: 0px;
  color: #ffffff;
  border: 0px solid #9ec3ff;
  border-radius: 0px;
}
input#file-input + label:hover{
  background-color: #3b73ce;
  border-color: #729fe7;
  cursor: pointer;
}
textarea {
  width: 800px; /* Ширина поля в процентах */
  margin: 0 auto;
  resize: none; /* Запрещаем изменять размер */

  border: 2px solid #ffffff;
  border-radius: 10px;
  font-size: inherit;
  outline: none;
  padding: 20px;
  min-height: 200px;

}

button {
  height: 50px;
  width: 300px;
  position: relative;
}
.main-part_input {
  float: left;
  justify-content: space-around;
  padding: 30px;
}

.btn-back-to-home {
  position:fixed;
  left:10px;

}

</style>