<template>
<header>
  <div class="button-to-back">
    <router-link :to="{name:'home'}">
      <button @click="isElVisible=!isElVisible" class="back-to-home m-3" type="button">Back to home</button>
    </router-link>
  </div>
</header>
  <div class="searchBar">
    <!-- Filter Search -->
    <div class="input-group mb-5">
      <input type="search" class="form-control" v-model='searchQuery' placeholder="Enter text for search..." aria-label="Recipient's username" aria-describedby="button-addon2">
    </div>
  </div>

  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
    <tr>
      <!-- loop through each value of the fields to get the table header -->
      <th>
        <label class="form-checkbox">
          <input type="checkbox">All
        </label>
      </th>
      <th :key='fields[1]' @click="sortTable(fields[0])">
        {{fieldsName[1]}}
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
      <td><input type="checkbox" :value="item.id"></td>
      <td class="text-left" v-for="field in fields" :key='field'>{{item[field]}}</td>
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
    }
  },

methods:{

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
