<template>
  <v-card
    width="480px"
    height="500px"
    elevation="5"
  >
    <v-card-text>
      <v-col>
        <p class="text-h5 text--primary font-weight-black">
          지체시간 데이터
        </p>
        <div class="text-caption text--primary font-weight-light">
          오늘과 1주전, 2주전 데이터를 한눈에 볼 수 있습니다.
        </div>
      </v-col>
    </v-card-text>
    <v-col>
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </v-col>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: 'LineChart',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {

      series: [{
        name: "이번 주",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6]
      },
      {
        name: "1주 전",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36]
      },
      {
        name: '2주 전',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82]
      }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00'],
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 120,
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        },
        colors : ['#198972', '#C8DD9F', '#F5D48F'],
      },
    }
  },
}
</script>

<style>
.apexcharts-toolbar {
  display: none;
}
</style>
