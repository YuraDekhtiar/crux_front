<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <div class="about">
    <div class="float-right d-flex flex-row">
    <div class="input-group">
      <form>
        <div class="p-2" @submit.prevent="addData">
          <input type="text" aria-describedby="button-addon2" placeholder="Enter url" v-model="url">
        </div>
      </form>
      <div class="col-xs-6 p-2">
        <button type="button" class="btn btn-secondary" id="add" v-on:click="addData">Add</button>
        <button type="button" class="btn btn-secondary" id="delete" v-on:click="deleteData">Delete</button>
      </div>
    </div>
    </div>
    <table class="table-bordered ttt">
      <thead>
      <tr>
        <th><input type="checkbox" v-model="selectedAll"><span id="all">All</span></th>
        <th scope="col">URL</th>
        <th scope="col">Date of last tracking</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
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
</template>
<script>
export default {
  name: "AboutView",
  data() {
    return {
      data: '',
      selected: [],
    }
  },
  mounted() {
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
    }
  },
  methods: {
    async fetchData() {
      try {
        this.data = '';
        this.data = await fetch(`http://127.0.0.1:3000/dataFetcher/tracking_url`, {
          method: 'GET',
        })
            .then(res => res.json())
      } catch (e) {
        console.log(e)
      }
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

  },
}
</script>

<style>

.ttt {
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 1500px;
  background-color: transparent;
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
  border-color: grey;
}

#all{
  margin: 5px;
}

#add{
  background-color: #256799;
}
#delete{
  background-color: #db5c4c;
}
</style>
