<template>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>

  <div class="d-flex">
    <div class="mx-auto p-3" style="width: 900px">
      <div class="input-group w-100 ">
        <div style="width: 25%; height: 50px; float: left">
          <input type="text" class="form-control mr-2" style="float: left" placeholder="Enter text for search..." v-model="searchQuery">
        </div>
        <div style="width: 75%; height:  50px; float: right">
          <button type="button" class="h-75 w-25 mr-3 btn btn-info" id="add" v-on:click="viewGraphs">View graphs</button>
          <button type="button" class="h-75 w-30 btn btn-danger" id="delete" v-on:click="dynamicsOfChange">Dynamics of change</button>
        </div>
      </div>
    </div>
  </div>

  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
    <tr>
      <!-- loop through each value of the fields to get the table header -->
      <th>
          <input type="checkbox" v-on:click="checkAll()" v-model="checkedAll">All
      </th>
      <th :key='fields[0]' @click="sortTable(fields[0])">
        {{fieldsName[0]}}
      </th>
      <th :key='fields[1]'>
        {{fieldsName[1]}}
      </th>
      <th :key='fields[2]'>
        {{fieldsName[2]}}
      </th>

      <th :key='fields[3]'>
        {{fieldsName[3]}}
      </th>
      <th :key='fields[4]'>
        {{fieldsName[4]}}
      </th>
      <!--      <th  v-for="(field, index) in fields" :key='field' @click="sortTable(field)" >-->

<!--        {{fieldsName[index]}} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>-->
<!--      </th>-->
    </tr>
    </thead>

    <tbody>
    <!-- Loop through the list get the each student data -->
    <tr v-for="item in filteredList" :key='item'>
      <td><input type="checkbox" v-bind:value='item.url_id' v-model="checked" v-on:change="checkUpdate()" ></td>
      <td class="text-left p-2">{{ item.url }}</td>

      <td v-if="item.form_factor=='phone'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg></td>
      <td v-else ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
      </svg></td>
      <td class="text-left p-2">{{ Math.round(item.good*100)+'%'}}</td>
      <td class="text-left p-2">{{ Math.round(item.needs_improvement*100)+'%' }}</td>
      <td class="text-left p-2">{{ Math.round(item.poor*100)+'%' }}</td>
<!--      <td class="text-left" v-for="field in fields" :key='field'>{{item[field]}}</td>-->
    </tr>
    </tbody>
  </table>

</template>
<script>
import {computed,ref} from "vue";
// Importing  the lodash library
import { sortBy} from 'lodash';

export default {
  name: 'TableComponent',
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
</style>
