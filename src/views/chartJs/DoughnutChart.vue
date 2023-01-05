<template>
  <v-card
    width="480px"
    height="500px"
    elevation="5"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-h5 text--primary font-weight-black">
            Two-week Data
          </p>
          <div class="text-caption text--primary font-weight-light">
            1번째 원 : 1주일 전 <br> 2번째 원 : 오늘 <br> 3번째 원: 현재 시각을 나타냅니다.
            <br> ※ 15분마다 한칸씩 이동합니다.
          </div>
        </v-col>
        <v-col>
          <v-btn
            outlined
            rounded
            text
            class="float-right"
            to="/graph-system"
          >
            상세보기
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <canvas
        id="canvas"
        ref="doughnut"
      />
      <p class="inner-time">
        {{ today }}
      </p>
    </v-col>
  </v-card>
</template>

<script>
import {Chart, registerables} from 'chart.js'
import dayjs from 'dayjs'

Chart.register(...registerables);

export default {
  name: 'PieChart',
  component: {
    dayjs
  },
  data() {
    return {
      doughnutChart: null,
      today: dayjs().format("HH:mm"),
      timeInterval: null,

      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'FF', 'FFF'],
      datasets: [],
      data: [10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,
        10,10,10,10,10,10,10,10,10,10,10,10,]
    };
  },
  mounted() {
    this.drawDoughnutChart();
    setInterval(() => {
      this.today = dayjs().format("HH:mm");
    }, 1000)
  },

  beforeDestroy() {
    this.doughnutChart.destroy();
  },
  methods: {
    drawDoughnutChart() {
      let ctx = this.$refs.doughnut.getContext("2d");
      this.doughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              backgroundColor: ['#C8DD9F', '#C8DD9F', '#C8DD9F', '#C8DD9F', '#F5D48F', '#F5D48F', '#F5D48F', '#F5D48F', '#F5D48F', '#F5D48F', '#F1B98C', '#F5AEA7', '#F5AEA7'
                ,'#C8DD9F', '#C8DD9F', '#F5D48F','#F5AEA7','#F5AEA7','#F5AEA7','#F5AEA7', '#F28376',
                '#F28376', '#F28376', '#F28376','#198972', '#C8DD9F', '#F5D48F', '#F28376', '#E56F61'],
              borderWidth: 1
            },
            {
              data: this.data,
              backgroundColor: this.todayDataColor(),
              borderWidth: 1
            },
            {
              data: this.data,
              backgroundColor: this.timeDataColor(),
              borderColor: '#efefef',
              borderWidth: 1
            },
          ]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
      this.doughnutChart.update('none')
    },

    todayDataColor() {
      let color = []
      let fillCnt = (new Date().getHours() * 4) + (parseInt(new Date().getMinutes() / 15));

      this.data.forEach((d, i) => {
        if (i < fillCnt) {
          switch(i % 4) {
          case 0:
            color.push('#C8DD9F')
            break;
          case 1:
            color.push('#F1B98C')
            break;
          case 2:
            color.push('#4BA895')
            break;
          case 3:
            color.push('#F28376')
            break;
          }
        } else {
          color.push('#E0E0E0')
        }
      })

      return color
    },

    timeDataColor() {
      let color = [];
      let fillCnt = (new Date().getHours() * 4) + (parseInt(new Date().getMinutes() / 15));

      this.data.forEach((d, i) => {
        if (i == fillCnt -1) {
          color.push('#E0E0E0')
        } else {
          color.push('#FFF')
        }
      })

      return color
    }
  },
};
</script>

<style lang="scss" scoped>
/* @media (max-width: 750px) {
  #canvas {
    max-width: 100%;
    max-height: 100%;
  }
} */
	.inner_clock {
		width: 40%;
		height: 40%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

  #canvas {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
    max-height: 100%;
  }

  .inner-time {
    width: 40%;
		height: 40%;
		position: absolute;
		top: 80.5%;
		left: 63.5%;
    font-size: 25px;
		transform: translate(-50%, -50%);
    font-weight: 900;
  }
</style>
