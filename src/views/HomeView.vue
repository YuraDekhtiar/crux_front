<template>
  <div v-if="isElVisible">
    <div class="container">
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
    <div v-else>
      {{result}}

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
      result: '',
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
        let data = {url:this.arrayOfUrls}
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