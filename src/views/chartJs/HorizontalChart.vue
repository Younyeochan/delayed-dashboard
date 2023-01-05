<template>
  <v-card
    width="480px"
    height="500px"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-h5 text--primary font-weight-black">
            LOS Intersection Status
          </p>
          <div class="text-caption text--primary font-weight-light">
            LOS 등급 별 교차로 개수 이력을 확인할 수 있습니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <canvas
        ref="chart1"
        width="100vw"
        height="80vh"
      />
    </v-col>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CHART_COLORS = {
  red: '#198972',
  orange: '#4BA895',
  yellow: '#C8DD9F',
  green: '#F5D48F',
  blue: '#F1B98C',
  purple: '#E56F61',
};

const chartData = {
  labels: ['11:00', '11:15', '11:30', '11:45', '12:00','12:15','12:30', '12:45', '13:00', '13:15', '13:30','13:45'],
  datasets: [
    {
      label: '11:00',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.red,
      barThickness: 16,
    },
    {
      label: '11:15',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.orange,
      barThickness: 16,
    },
    {
      label: '11:30',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.yellow,
      barThickness: 16,
    },
    {
      label: '11:45',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.green,
      barThickness: 16,
    },
    {
      label: '12:00',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      barThickness: 16,
    },
    {
      label: '12:15',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.red,
      barThickness: 16,
    },
    {
      label: '12:30',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.orange,
      barThickness: 16,
    },
    {
      label: '12:45',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.purple,
      barThickness: 16,
    },
    {
      label: '13:00',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.red,
      barThickness: 16,
    },
    {
      label: '13:15',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.purple,
      barThickness: 16,
    },
    {
      label: '13:30',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.blue,
      barThickness: 16,
    },
    {
      label: '13:45',
      data: [10,10,10,10,10,10,10,10,10,10,10,10],
      borderColor: CHART_COLORS.grey,
      backgroundColor: CHART_COLORS.green,
      barThickness: 16,
    },
  ]
};

export default ({
  data(){
    return {
      data : chartData,
    }
  },
  mounted () {
    let ctx1 = this.$refs.chart1.getContext("2d");
    this.chart_1 = new Chart(ctx1, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            ticks: {
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
          y: {
            stacked: true,
            ticks: {
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
  // Right before the component is destroyed,
  // also destroy the chart.
  beforeDestroy: function () {
    this.chart_1.destroy();
  },
})

</script>
