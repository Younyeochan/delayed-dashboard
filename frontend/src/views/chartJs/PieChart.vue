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
            LOS Ratio Status
          </p>
          <div class="text-caption text--primary font-weight-light">
            LOS의 비율의 현황을 한눈에 확인할 수 있습니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <apexchart
        type="pie"
        :options="chartOptions"
        :series="series"
        height="290"
      />
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'PieChart',
  data() {
    return {
      series: [10, 20, 10, 30, 30],
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: ["금정역", "명학역", "안양역", "군포역", "산본역"],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 50,
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '분']
          }
        },
        fill: {
          opacity: 1,
          colors : ['#198972', '#C8DD9F', '#F5D48F', '#F28376', '#E56F61'],
        },
        colors : ['#198972', '#C8DD9F', '#F5D48F', '#F28376', '#E56F61'],
      },
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
