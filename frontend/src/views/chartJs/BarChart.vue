<template>
  <v-card
    width="500px"
    height="410px"
    elevation="5"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-h5 text--primary font-weight-black">
            LOS Top 10
          </p>
          <div class="text-caption text--primary font-weight-light">
            지난주와 오늘의 데이터를 비교하여 한눈에 볼 수 있는 차트입니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <apexchart
        type="bar"
        height="290"
        :options="chartOptions"
        :series="series"
      />
    </v-col>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Bar",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {

      series: [{
        name: '이번 주',
        data: [0.4, 0.65, 0.76, 0.88, 3.8, 3.9, 4.2, 1.5, 2.1, 2.9]
      },
      {
        name: '지난 주',
        data: [-0.8, -1.05, -1.06, -3.7, -3.96, -4.22, -1.18, -1.4, -2.2, -2.85]
      }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 440,
          stacked: true
        },
        colors: ['#198972', '#E56F61'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },

        grid: {
          xaxis: {
            lines: {
              show: false
            }
          }
        },
        yaxis: {
          min: -5,
          max: 5,
          title: {
            // text: 'Age',
          },
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val
            }
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "분"
            }
          }
        },
        xaxis: {
          categories: [
            '금정역', '군포역', '당정역', '명학역', '안양역', '관악역', '석수역', '수리산역', '성균관대역', '대야미역'
          ],
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "분"
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
        },
      },
    }
  },
}
</script>

<style>
.apexcharts-toolbar {
  display: none !important;
}
</style>
