<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <div v-if="isElVisible">
    <div class="container">
      <img src="../../public/images/logo.jpeg">
      <div class="row">
        <div class="col-lg">
          <div class="main-part_input">
            <label>Enter a URL to analyze </label>
          </div>
          <div class="main-part_input">
            <label>or</label>
          </div>
          <div class="main-part_input">
              <input
                  class="form-control"
                  accept=".txt" type="file"
                  id="formFile"
                  @change="previewFiles"
              >
          </div>
        </div>
      </div>
      <div class="input-group m-3">
        <textarea type="text"
                  class="form-control"
                  placeholder="Input URL..."
                  aria-describedby="basic-addon2"
                  v-model="textWithTextarea"
                  rows="10"
        />
      </div>
      <button @click="postUrls" class="btn btn-outline-secondary" value="false">START</button>
    </div>
  </div>
  <div class="page-analysis_main" v-else>
    <Preloader v-if="isLoading" color="red" scale="0.6" />
      <div class="page-analysis_main" v-else>
        <div class="button-to-back">
          <router-link :to="{name:'home'}">
            <button @click="isElVisible=!isElVisible" class="btn btn-outline-secondary btn-back-to-home" type="button">Back to home</button>
          </router-link>
        </div>

        <section class="table-analysis m-10" >
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
            <tr class="v-table_body" v-for="(item) of result" :key="item.id">
              <td>{{item.url}}</td>
              <td>{{Math.round(item.good*100)}}</td>
              <td>{{Math.round(item.needs_improvement*100)}}</td>
              <td>{{Math.round(item.poor*100)}}</td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>

  </div>
</template>

<script>
import Preloader from '../components/Preloader'

export default {
  name: 'HomeView',
  components: {
    Preloader,
  },
  data() {
    return {
      data: '',
      url: '',
      loading: true,
      textWithTextarea: '',
      arrayOfUrls: [],
      isElVisible:true ,
      result: [],
      isLoading: true,
    }
  },
  methods: {
    //for button example
    // getTextarea () {
    //     this.arrayOfUrls = this.textWithTextarea.split("\n");
    //     console.log(this.arrayOfUrls)
    // },
    async postUrls() {
      if(this.textWithTextarea.length !== 0) {
        this.isElVisible = !this.isElVisible;
        this.arrayOfUrls = this.textWithTextarea.split("\n");
        let data = {url:this.arrayOfUrls.filter(i => i.length !== 0)}
        this.result = await fetch('http://127.0.0.1:3000/adminPanel/analyze_url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(r => {
          return r.json();
        });
        this.isLoading = false;
      }
    },
    previewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.textWithTextarea = e.target.result;
      reader.readAsText(file);
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
button {
  height: 50px;
  width: 300px;
  position: relative;
}
.main-part_input {
  float: left;
  justify-content: space-around;
  margin: 10px  30px;
}

.btn-back-to-home {
  position:fixed;
  left:10px;
}

</style>