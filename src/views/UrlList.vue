<template>
  <div class="listUrl">
    <div class="d-flex">
    <div class="mx-auto p-3" style="width: 27%" >
      <div class="input-group w-100 align-items-center">
        <input class="form-control mr-2" type="search" placeholder="Search" v-model="search">
      </div>
    </div>
    <div class="mx-auto p-3" style="width: 27%">
    <div class="input-group w-100 align-items-center">
        <input type="text" class="form-control mr-2" placeholder="Enter url" v-model="url">
        <button type="button" class="h-75 w-25 mr-2 btn btn-info" id="add" v-on:click="addData">Add</button>
        <button type="button" class="h-75 w-25 btn btn-danger" id="delete" v-on:click="deleteData">Delete</button>
    </div>
    </div>
    </div>
    <div style="height: 720px; overflow: auto" class="w-75 mx-auto">
    <Preloader v-if="isLoading"/>
    <table v-else class="table-bordered w-100">
      <thead>
      <tr>
        <th scope="col" style="inline-size: 50px"><input type="checkbox" v-model="selectedAll"><span style="margin-left: 2px">All</span></th>
        <th scope="col">URL</th>
        <th scope="col" >Date of last tracking</th>
        <th scope="col" class="p-2">Status</th>
      </tr>
      </thead>
      <tbody style="height: 721px">
      <tr v-for="item in filteredItems" :key="item" >
        <td> <input type="checkbox" v-model="selected" :value="item.id" ></td>
        <td class="text-left p-2">{{ item.url }}</td>
        <td>{{ item.last_tracking_date === null? '' : item.last_tracking_date.substring(0,10)}}</td>
        <td v-if="item.success"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" color="green" class="bi bi-check2 fs-2" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg></td>
        <td v-else ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" color="red" class="bi bi-x fs-2" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import Preloader from '../components/Preloader'

export default {
  name: "UrlListView",
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
    filteredItems() {
      return this.data.filter(elem => {
        return elem.url.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    async fetchData() {
      try {
        this.responseData = '';
        this.responseData = await fetch(`${this.$store.state.backendUrl}/dataFetcher/tracking_url`, {
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
        const response = await fetch(`${this.$store.state.backendUrl}/dataFetcher/add_url`, {
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
      await this.fetchData();
    },
    async deleteData() {
      let data = {id: this.selected}
      const response = await fetch(`${this.$store.state.backendUrl}/dataFetcher/delete_url`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      let result = await response.json();
      console.log('Успех:', JSON.stringify(result));
      await this.fetchData();
    }
  },
}
</script>

<style>
table{
  --bs-table-bg: transparent;
  --bs-table-striped-color: #212529;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #212529;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #212529;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  color: #212529;
  --bs-table-accent-bg: var(--bs-table-striped-bg);
}
thead th {
  position: sticky;
  top: 0;
  background: white;
}
</style>
