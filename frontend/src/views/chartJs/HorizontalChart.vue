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
            LOS Intersection Status
          </p>
          <div class="text-caption text--primary font-weight-light">
            LOS 등급 시간에 따른 데이터를 확인할 수 있습니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <apexchart
        type="bar"
        width="100%"
        height="180%"
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
      series: [
        {
          name: '군포역',
          data: [10, 20, 25, 20, 25]
        },
        {
          name: '금정역',
          data: [5, 10, 30, 35, 20]
        },
        {
          name: '산본역',
          data: [20, 20, 20, 20, 20]
        },
        {
          name: '명학역',
          data: [20, 20, 20, 20, 20]
        },
        {
          name: '안양역',
          data: [20, 20, 20, 20, 20]
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                // 마지막 %를 지울 수 있어요 ↓
                enabled: false,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          categories: ['09:00', '09:15', '09:30', '09:45', '10:00'],
          labels: {
            formatter: function (val) {
              return val + "분"
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "분"
            }
          }
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
        // 위에 5개 네모 색 채우기입니다.
        colors : ['#198972', '#C8DD9F', '#F5D48F', '#F28376', '#E56F61'],
      },
    }
  }
}
</script>

<style>
.apexcharts-toolbar {
  display: none;
}
</style>
