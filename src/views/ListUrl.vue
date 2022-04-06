<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <div class="listUrl">
    <div class="d-flex">
    <nav class="mx-auto p-3" style="width: 500px" >
      <div class="input-group w-100 align-items-center">
        <input class="form-control mr-2" type="search" placeholder="Search" v-model.trim="search">
        <button class="btn h-75 mr-2 w-25 btn btn-outline-secondary" type="button" id="search" :onclick="searchUrl">Search</button>
      </div>
    </nav>
    <div class="mx-auto p-3" style="width: 500px">
    <div class="input-group w-100 align-items-center" style="height: 50px" >
        <input type="text" class="form-control mr-2" placeholder="Enter url" v-model="url">
        <button type="button" class="h-75 w-25 mr-2 btn btn-info" id="add" v-on:click="addData">Add</button>
        <button type="button" class="h-75 w-25 btn btn-danger" id="delete" v-on:click="deleteData">Delete</button>
    </div>
    </div>
    </div>
    <div style="height: 720px; overflow: auto">
    <Preloader v-if="isLoading"/>
    <table v-else class="table-bordered w-75 mx-auto">
      <thead>
      <tr>
        <th><input type="checkbox" v-model="selectedAll"><span id="all">All</span></th>
        <th scope="col">URL</th>
        <th scope="col">Date of last tracking</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody style="height: 1500px">
      <tr v-for="(item, index) in data" :key="index" >
        <td> <input type="checkbox" v-model="selected" :value="item.id"></td>
        <td >{{ item.url }}</td>
        <td>{{ item.last_tracking_date === null? '' : item.last_tracking_date.substring(0,10)}}</td>
        <td v-if="item.success" class="bg-success">Success</td>
        <td v-else class="bg-warning">No success</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import Preloader from '../components/Preloader'

export default {
  name: "ListUrlView",
  components: {
    Preloader,
  },
  data() {
    return {
      responseData: [],
      data: [],
      search: '',
      selected: [],
      isLoading: true,

    }
  },
  beforeMount() {
    this.fetchData()
  },
  computed: {
    rows() {
      return this.data.length
    },
    selectedAll: {
      get: function() {
        return this.data ? this.selected.length === this.data.length : false;
      },
      set: function (value) {
        let selected = [];
        if (value) {
          this.data.forEach(function (item) {
            selected.push(item.id);
          });
        }
        this.selected = selected;
      }
    },
  },
  methods: {
    async fetchData() {
      try {
        this.responseData = '';
        this.responseData = await fetch(`http://127.0.0.1:3000/dataFetcher/tracking_url`, {
          method: 'GET',
        })
            .then(res => res.json())
        this.isLoading = false;
      } catch (e) {
        console.log(e)
      }
      this.data = this.responseData;
    },
    async addData() {
      try {
        let data = {url: [this.url]}
        const response = await fetch('http://127.0.0.1:3000/dataFetcher/add_url', {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
            .then(res => res.json())
        let result = await response.json();
        console.log('Успех:', JSON.stringify(result));
      } catch (e) {
        console.log(e)
      }
      this.url= '';
      this.fetchData();
    },
    async deleteData() {
      let data = {id: this.selected}
      console.log(data)
      const response = await fetch('http://127.0.0.1:3000/dataFetcher/delete_url', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      let result = await response.json();
      console.log('Успех:', JSON.stringify(result));
      this.fetchData();
    },
    searchUrl() {
      if(this.search.length !== 0)
        this.data = this.responseData.filter(i =>  i.url.indexOf(this.search) > 0)
      else
        this.data = this.responseData;
    }

  },
}
</script>

<style>
table{
  position: relative;
}

#all{
  margin: 5px;
}
</style>
