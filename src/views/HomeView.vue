<template>

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
                :disabled="validated"
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
                    :disabled="validated"
                    :change="test"

          />
      </div>
      <div v-if="isElVisible">
        <button :disabled="isButtonDisabled" @click="isElVisible=!isElVisible; validated = !validated" class="btn btn-info">DOWNLOAD</button>
      </div>
      <div v-else>
        <div v-if="isLoading">
          <Preloader />
          <h2>Please wait while the data is processed...</h2>
         </div>
        <div v-else>
          <p style="position: center">All data successfully downloaded!</p>
        <button @click="analyzeUrls" class="h-75 w-50 btn btn-info" value="false">REVIEW TRACKING</button>
        </div>
      </div>
  </div>

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
      textWithTextarea: '',
      arrayOfUrls: [],
      isElVisible:true ,
      result: [],
      isLoading: true,

      validated: false,
      isButtonDisabled: true,
      canSend: false,
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
        await this.$router.push({path: '/distribution'});
      }
    },
    loadingUrlFromFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.textWithTextarea = e.target.result;
      reader.readAsText(file);
      this.test();
    },
    test() {
      this.isButtonDisabled = false;
      this.canSend = true;
    }
  },

  // block button "DOWNLOAD"
  // watch: {
  //   send: function() {
  //     this.canSend = this.textWithTextarea.length >= 2;
  //     this.isButtonDisabled = !this.canSend;
  //   }
  // },
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