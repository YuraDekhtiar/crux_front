<template>
  <div class="d-flex">
    <div class="ml-auto pb-3 pt-3" style="width: 50%">
      <div class="input-group w-100 align-items-center">
          <input type="text" class="form-control mr-4" style="float: left" placeholder="Enter text for search..." v-model="searchQuery">
      </div>
    </div>
    <div class="mr-auto pb-3 pt-3" style="width: 25%">
      <div class="btn-group w-100 align-items-center" role="group">
          <button type="button" class="h-75 w-50 mr-2 btn btn-info" v-on:click="viewGraphs">View graphs</button>
          <button type="button" class="h-75 w-50 btn btn-danger" v-on:click="dynamicsOfChange">Dynamics of change</button>
      </div>
    </div>
  </div>
<div style="height: 720px; overflow: auto" class="w-75 mx-auto">
  <table id="tableComponent" class="table table-bordered w-100" style="table-layout: fixed;">
    <thead>
    <tr>
      <th style="table-layout: fixed; width: 40px">
        <input type="checkbox" v-on:click="checkAll()" v-model="checkedAll">
      </th>
      <th style="width: 60%">
        {{fieldsName[0]}}
      </th>
      <th style="width: 70px">
        {{fieldsName[1]}}
      </th>
      <th v-for="(item, index) in fieldsName.filter(i => i !== 'URL' && i!== 'Device')" :key="index">
        {{item}}
      </th>
    </tr>
    </thead>

    <tbody style="height: 1500px">
    <template v-for="(item, index) in filteredList" :key="index">
      <tr>
        <td class="align-middle" rowspan="2" >
          <input type="checkbox" v-bind:value="item.url_id" v-model="checked" v-on:change="checkUpdate()" >
        </td>
        <td style="overflow-x:scroll;" class="text-left p-2 align-middle" rowspan="2">
          <a :href="item.url" target="_blank">{{item.url}}</a>
        </td>
        <td class="">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
          </svg>
        </td>
        <td><ProgressBar :data="item.desktop.lcp"/></td>
        <td><ProgressBar :data="item.desktop.fid"/></td>
        <td><ProgressBar :data="item.desktop.cls"/></td>
      </tr>
      <tr>
        <td class="" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </td>
        <td class="" ><ProgressBar :data="item.phone.lcp"/></td>
        <td class="" ><ProgressBar :data="item.phone.fid"/></td>
        <td class="" ><ProgressBar :data="item.phone.cls"/></td>
      </tr>
    </template>
    </tbody>

  </table>

</div>
</template>
<script>
import {computed,ref} from "vue";
// Importing  the lodash library
import { sortBy } from 'lodash';
import ProgressBar from "@/components/ProgressBar";

export default {
  name: 'TableComponent',
  components: {
    ProgressBar
  },
  props:{
    urlData:{
      type: Array,
    },
    fields:{
      type: Array,
    },
    fieldsName: {
      type: Array
    },
    funcTest: {
      type: Function
    }
  },
  data() {
    return{
      checked: [],
      checkedAll: false,
    }
  },

  methods: {
    checkAll: function() {
      if (!this.checkedAll) {
        for (let i in this.filteredList) {
          this.checked.push(this.filteredList[i].url_id);
        }
        console.log(this.checked);
      }
      else
        this.checked = [];
    },
    checkUpdate: function() {
      if (this.checked.length === this.filteredList.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    }
  },

  setup(props) {
    let sort = ref(false);
    let updatedList =  ref([])
    let searchQuery = ref("");

    // a function to sort the table
    const sortTable = (col) => {
      sort.value = true
      // Use of _.sortBy() method
      updatedList.value = sortBy(props.urlData,col)
    }

    const sortedList = computed(() => {
      if (sort.value) {
        return updatedList.value
      }
      else{
        return props.urlData;
      }
    });


    // Filter Search
    const filteredList = computed(() => {
      return sortedList.value.filter((product) => {
        return (
            product.url.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });



    return {sortedList, sortTable,searchQuery,filteredList}
  }

}
</script>

<style scoped>
table th:hover {
  background:#f2f2f2;
}
thead th {
  position: sticky;
  top: 0;
  background: white;
}
</style>
