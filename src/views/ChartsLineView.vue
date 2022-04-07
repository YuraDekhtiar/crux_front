<template>
  <Preloader v-if="isLoading" color="red" scale="0.6" />
  <div v-else class="content">
    <div class="chart">
      <LineChart />
    </div>
    <hr />
    <div class="chart">
      <LineChart />
    </div>
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