<template>
  <div>
    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'lineGraph',
      data: Array,
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 25
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object
    },
    labels: {
      type: Array
    }
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [ {
          data: this.data.good,
          label: 'GOOD',
          backgroundColor: '#2E8B57',
        }, {
          data: this.data.needs_improvement,
          label: 'NEEDS INVOROPMENT',
          backgroundColor: '#FFC300',
        }, {
            data: this.data.poor,
            label: 'POOR',
            backgroundColor: '#FF5733',
          }],
      },
      chartOptions: {
        responsive: true,
      },

    }
  },
}
</script>
