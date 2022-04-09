<template>
  <div v-if="!isLoading">
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
                  @change="loadingUrlFromFile"
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
      <button @click="analyzeUrls" class="btn btn-outline-secondary" value="false">ANALYZE</button>
    </div>
  </div>
  <Preloader v-else/>
</template>

<script>
import Preloader from '../components/Preloader'
import {mapGetters} from "vuex";

export default {
  name: 'HomeView',

  components: {
    // eslint-disable-next-line vue/no-unused-components
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
  mounted() {
    this.isLoading = false;
  },
  computed: mapGetters(['getUrlId']),
  methods: {
      async analyzeUrls() {
      if(this.textWithTextarea.trim().length !== 0) {
        this.isLoading = true;
        this.arrayOfUrls = this.textWithTextarea.split("\n");
        let data = {url:this.arrayOfUrls.filter(i => i.length !== 0).map(i => i.trim())}
        await this.$store.dispatch('analyzeUrl', data);
        await this.$router.push({path: '/didsribution'});
      }

    },
    loadingUrlFromFile(event) {
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

</style>