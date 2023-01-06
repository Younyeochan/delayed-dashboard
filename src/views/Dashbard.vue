<template>
  <v-container>
    <v-row
      :key="n"
      :cols="n === 1 ? 8 : 4"
    >
      <v-col>
        <bar-chart />
      </v-col>
      <v-col>
        <leaflet-map />
      </v-col>
      <v-col>
        <doughnut-chart />
      </v-col>
      <v-col>
        <line-chart />
      </v-col>
      <v-col>
        <pie-chart />
      </v-col>
      <v-col>
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
