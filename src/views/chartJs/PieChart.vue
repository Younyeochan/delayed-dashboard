<template>
  <v-card
    width="480px"
    height="500px"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-h5 text--primary font-weight-black">
            지체시간 데이터
          </p>
          <div class="text-caption text--primary font-weight-light">
            오늘과 당일 전 데이터를 시간에 맞춰 비교하여 분석할 수 있습니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <Pie
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
    </v-col>
  </v-card>
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 360
    },
    height: {
      type: Number,
      default: 340
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: ['산본역', '군포역', '금정역', '안양역'],
        legend: {
          display: true
        },
        datasets: [
          {
            backgroundColor: ['#4BA895', '#C8DD9F', '#F5D48F', '#F28376'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
