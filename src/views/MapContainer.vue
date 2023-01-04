<template>
  <v-container>
    <v-col>
      <h2>
        실시간 LOS 현황
      </h2>
      <v-btn
        x-small
        outlined
        rounded
        text
        class="float-right"
        @click="zoomIn"
      >
        <router-link to="/">
          돌아가기
        </router-link>
      </v-btn>
      <div class="text-caption text--primary">
        지체대상 교차로 130 개를 비교하여 분석할 수 있습니다.
      </div>
    </v-col>
    <v-col>
      <l-map
        :zoom="zoom"
        :center="center"
        style="height: calc(100vh - 230px); width: 100%"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-circle-marker
          :lat-lng="circle01.center"
          :radius="circle01.radius"
          :color="circle01.color"
          :fill-color="circle01.fillColor"
        >
          <l-tooltip>26</l-tooltip>
        </l-circle-marker>
        <l-circle-marker
          :lat-lng="circle02.center"
          :radius="circle02.radius"
          :color="circle02.color"
          :fill-color="circle02.fillColor"
        >
          <l-tooltip>16</l-tooltip>
        </l-circle-marker>
        <l-circle-marker
          :lat-lng="circle03.center"
          :radius="circle03.radius"
          :color="circle03.color"
          :fill-color="circle03.fillColor"
        >
          <l-tooltip>36</l-tooltip>
        </l-circle-marker>
        <l-circle-marker
          :lat-lng="circle04.center"
          :radius="circle04.radius"
          :color="circle04.color"
          :fill-color="circle04.fillColor"
        >
          <l-tooltip>46</l-tooltip>
        </l-circle-marker>
        <l-circle-marker
          :lat-lng="circle05.center"
          :radius="circle05.radius"
          :color="circle05.color"
          :fill-color="circle05.fillColor"
        >
          <l-tooltip>56</l-tooltip>
        </l-circle-marker>
      </l-map>
    </v-col>
  </v-container>
</template>

<script>
// import * as L from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LTooltip } from "vue2-leaflet";
import "leaflet/dist/leaflet.css"


export default {
  name: 'RealLOSTimeStatus',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
  },
  data() {
    return {
      zoom: 16,
      center: [37.373544, 126.947630],
      url: 'http://api.vworld.kr/req/wmts/2.1.3/7DB0439A-7EA4-3366-A7E9-7C723569137A/gray/{z}/{y}/{x}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      circle01: {
        center: [37.374744, 126.947630],
        radius: 26,
        color: '#227C70',
        fillColor: '#227C70'
      },
      circle02: {
        center: [37.372349, 126.946671],
        radius: 16,
        color: '#4CAF50',
        fillColor: '#4CAF50'
      },
      circle03: {
        center: [37.372349, 126.943458],
        radius: 36,
        color: '#EB6440',
        fillColor: '#EB6440'
      },
      circle04: {
        center: [37.374454, 126.945019],
        radius: 46,
        color: '#CF0A0A',
        fillColor: '#CF0A0A'
      },
      circle05: {
        center: [37.371435, 126.957755],
        radius: 56,
        color: '#CF0A0A',
        fillColor: '#CF0A0A'
      },
    }
  },
  methods: {
    zoomIn() {
      console.log('클릭')

    }
  }
}
</script>

<style>
#app {height: 100%;}
</style>
