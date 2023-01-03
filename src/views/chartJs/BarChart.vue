<template>
  <v-card
    width="480px"
    height="500px"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-h5 text--primary">
            LOS 상위 TOP 10
          </p>
          <div class="text-caption text--primary">
            오늘과 1주전, 2주전 데이터를 한눈에 볼 수 있습니다.
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <canvas
        ref="chart1"
        width="69vw"
        height="54vh"
      />
    </v-col>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

const delay_data = [400,380,375,370,360,350,340,340,330,330,];

let data_color = [];
const delay_color = () => {
  delay_data.forEach((value, index) => {
    if (value >= 380) {
      data_color.push(CHART_COLORS.red);
    } else if (value >= 360) {
      data_color.push(CHART_COLORS.orange);
    } else {
      data_color.push(CHART_COLORS.yellow);
    }
  });
  return data_color;
}


const chartData = {
  labels: [
    '수리산역', '금정역', '명학역', '범계역', '안양역', '평촌역',
    '관악역','당정역','군포역','산본역',
  ],
  datasets: [
    {
      xAxisID : 'A_DATA',
      label: '주기',
      data: [30,28,30,27,25,27,25,24,23,20,],
      borderColor: CHART_COLORS.green,
      backgroundColor: CHART_COLORS.green,
      barThickness: 10,
    },
    {
      xAxisID : 'B_DATA',
      label: '지체시간(s/h)',
      data: delay_data,
      borderColor: delay_color,
      backgroundColor: delay_color,
      barThickness: 10,
    }
  ]
};

export default ({
  data(){
    return {
      data : chartData,
      interval : 10000,
    }
  },
  mounted () {
    let ctx1 = this.$refs.chart1.getContext("2d");
    this.chart_1 = new Chart(ctx1, {
      type: 'bar',
      data: this.data,
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false
            },
          },
          y: {
            ticks: {
              font: {
                weight: 'bold',
                size: 11,
              },
            },
            grid: {
              display: false
            },
          },
          A_DATA: {
            title: {
              display: true,
              text: '주기',
              font: {
                weight: 'bold',
                size: 10,
              },
              color: 'green'
            },
            type: 'linear',
        					position: 'top',
            ticks: {
              font: {
                weight: 'bold',
                size: 10,
              },
              display: true,
              beginAtZero: true,
              color: 'green'
            },
            max:50,
          },
          B_DATA: {
            title: {
              display: true,
              text: '지체시간(s/h)',
              font: {
                weight: 'bold',
                size: 10,
              },
              color: 'grey'
            },
            type: 'linear',
        					position: 'bottom',
            ticks: {
              font: {
                weight: 'bold',
                size: 10,
              },
              display: true,
              beginAtZero: true,
              color: 'grey'
            },
            grid: {
              display: false
            },
          },
        },
      },
    });
  },
  created() {
    // this.interval = setInterval(() => {
    // 	console.log('timer');
    // }, this.interval)
  },
  // Right before the component is destroyed,
  // also destroy the chart.
  beforeDestroy: function () {
    this.chart_1.destroy();
    clearInterval(this.interval);
  },
})

</script>
