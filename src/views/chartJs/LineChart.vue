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
      <chart-line
        :height="height"
        :data="chartData"
      />
    </v-col>
  </v-card>
</template>

<script>

// Bar chart for "Active Users" card.
import ChartLine from './charts/ChartLine.vue' ;

export default ({
  components: {
    ChartLine,
  },
  data() {
    return {
      chartData: {
        labels: ["07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00"],
        datasets: [{
          label: "1주일전",
          tension: 0,
          pointRadius: 2,
          borderColor: "#1890FF",
          borderWidth: 6,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 400, 230, 500],
          maxBarThickness: 6
        },
        {
          label: "오늘",
          tension: 0,
          pointRadius: 2,
          borderColor: "#B37FEB",
          borderWidth: 6,
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400, 340, 230, 400],
          maxBarThickness: 6
        }],
      },
      height: 330
    }
  },
})

</script>
