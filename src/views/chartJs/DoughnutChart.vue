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
        <v-col>
          <v-btn
            outlined
            rounded
            text
            class="float-right"
          >
            <router-link to="/graph-system">
              상세보기
            </router-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-col>
      <div
        style="position: relative; margin-top: 10px"
      >
        <canvas
          id="canvas"
          ref="chart1"
        />
        <div
          class="inner_clock"
          align="center"
          style="background: transparent; border-color: transparent;"
        >
          <HourClock />
        </div>
      </div>
    </v-col>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

import HourClock from '../../Utils/HourClock' ;

const CHART_COLORS = {
  red: '#198972',
  orange: '#4BA895',
  yellow: '#C8DD9F',
  green: '#F5D48F',
  blue: '#F1B98C',
  purple: '#E56F61',
  grey: 'rgb(201, 203, 207)',
};

const COLOR_white = 'rgb(255, 255, 255)';

const chart_data = [
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
];

const today_color_val = [
  30,20,30,20,30,20,30,20,30,20,
  20,20,20,20,20,20,20,20,20,20,
  30,10,30,10,30,10,30,10,30,10,
  20,10,20,10,20,10,20,10,20,10,
  30,10,30,10,30,10,30,10,30,10,
  10,20,30,20,10,20,30,10,20,10,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
];

let today_color = [];
const get_inner_bg_colors = () => {
  today_color_val.forEach((value, index) => {
    if (value >= 30) {
      today_color.push(CHART_COLORS.red);
    } else if (value >= 20) {
      today_color.push(CHART_COLORS.orange);
    } else if (value >= 10) {
      today_color.push(CHART_COLORS.yellow);
    } else {
      today_color.push(CHART_COLORS.grey);
    }
  });
  return today_color;
}

let clock_color = [];
const get_clock_bg_colors = () => {
  today_color_val.forEach((value, index) => {
    if (index == 59 || index == 60 || index == 61) {
      clock_color.push(CHART_COLORS.grey);
    } else {
      clock_color.push(COLOR_white);
    }
  });
  return clock_color;
}

const chartData = {
  labels: [''],
  datasets: [
    {
      data: chart_data,
      backgroundColor: Object.values(CHART_COLORS),
    },
    {
      data: chart_data,
      backgroundColor: get_inner_bg_colors,
    },
    {
      data: chart_data,
      backgroundColor: get_clock_bg_colors,
    },
  ]
};

export default ({
  components : {
    HourClock,
  },
  data(){
    return {
      data : chartData,
    }
  },
  mounted () {
    let ctx1 = this.$refs.chart1.getContext("2d");
    this.chart_1 = new Chart(ctx1, {
      type: 'doughnut',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
  beforeDestroy: function () {
    this.chart_1.destroy();
  },
})

</script>

<style lang="scss">
	.inner_clock {
		width: 40%;
		height: 40%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
  #canvas {
    max-width: 90vw;
    max-height: 34vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
