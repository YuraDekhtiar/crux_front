<template>
  <Preloader v-if="isLoading" color="red" scale="0.6" />
  <div v-else class="content">
    <b-tabs content-class="mt-3" align="left">
      <Preloader v-if="isLoading" color="red" scale="0.6" />
      <b-tab title="DESKTOP" active  v-else>
        <div class="chart">
          <LineChart/>
          <div></div>
        </div>
        <hr/>
        <div class="chart">
          <LineChart/>
        </div>
        <hr/>
        <div class="chart">
          <LineChart/>
        </div>
        <hr/>
      </b-tab>
      <Preloader v-if="isLoading" color="red" scale="0.6" />
      <b-tab title="PHONE" active  v-else>
        <div class="chart">
          <LineChart/>
          <div></div>
        </div>
        <hr/>
        <div class="chart">
          <LineChart/>
        </div>
        <hr/>
        <div class="chart">
          <LineChart/>
        </div>
        <hr/>
      </b-tab>

    </b-tabs>
  </div>
</template>

<script>
import Preloader from '../components/Preloader'
import LineChart from "@/components/LineChart";

export default {
  name: 'ChartsLineView.vue',
  components: {
    LineChart,
    Preloader
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.isLoading = false
  }
}
</script>

<style scoped>
.chart {
  min-width: 50%;
  max-width: 80%;
  margin: 0 auto;
}

.image {
  height: 100px;
  width: 100%;
}

</style>