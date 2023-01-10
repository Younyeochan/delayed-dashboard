<template>
  <v-container
    pa-0
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
      >
        <bar-chart />
      </v-col>
      <v-col cols="auto">
        <leaflet-map />
      </v-col>
      <v-col cols="auto">
        <doughnut-chart />
      </v-col>
      <v-col cols="auto">
        <line-chart />
      </v-col>
      <v-col cols="auto">
        <pie-chart />
      </v-col>
      <v-col cols="auto">
        <horizontal-chart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DoughnutChart from './chartJs/DoughnutChart'
import BarChart from './chartJs/BarChart'
import LineChart from './chartJs/LineChart'
import PieChart from './chartJs/PieChart'
import HorizontalChart from './chartJs/HorizontalChart.vue'
import LeafletMap from './map/LeafletMap'

export default {
  name: 'DelayedDashboardGridSystem',
  components: { DoughnutChart, BarChart, LineChart, PieChart, LeafletMap, HorizontalChart },
  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>

</style>
