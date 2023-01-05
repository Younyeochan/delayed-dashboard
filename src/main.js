import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.config.productionTip = false
Vue.use(VueApexCharts);
Vue.use(Vuex);

new Vue({
  Vuex,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
