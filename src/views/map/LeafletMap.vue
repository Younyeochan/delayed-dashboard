<template>
  <div>
    <v-card
      width="480px"
      height="500px"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <p class="text-h5 text--primary">
              실시간 LOS 현황
            </p>
            <div class="text-caption text--primary">
              지체대상 교차로 130 개를 비교하여 분석할 수 있습니다.
            </div>
          </v-col>
          <v-col>
            <v-btn
              outlined
              rounded
              text
              class="float-right"
              @click="zoomIn"
            >
              <router-link to="/map-container">
                상세보기
              </router-link>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-col>
        <l-map
          :zoom="zoom"
          :center="center"
          style="height: 36.5vh; width: 100%;"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          <l-circle-marker
            :lat-lng="circle01.center"
            :radius="circle01.radius"
            :color="circle01.color"
          />
          <l-circle-marker
            :lat-lng="circle02.center"
            :radius="circle02.radius"
            :color="circle02.color"
          />
          <l-circle-marker
            :lat-lng="circle03.center"
            :radius="circle03.radius"
            :color="circle03.color"
          />
          <l-circle-marker
            :lat-lng="circle04.center"
            :radius="circle04.radius"
            :color="circle04.color"
          />
          <l-circle-marker
            :lat-lng="circle05.center"
            :radius="circle05.radius"
            :color="circle05.color"
          />
        </l-map>
      </v-col>
    </v-card>
  </div>
</template>

<script>
// import * as L from "leaflet";
import { LMap, LTileLayer, LCircleMarker  } from "vue2-leaflet";
import "leaflet/dist/leaflet.css"


export default {
  name: 'RealLOSTimeStatus',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
  },
  data() {
    return {
      zoom: 16,
      center: [37.374454, 126.945299],
      url: 'http://api.vworld.kr/req/wmts/2.1.3/7DB0439A-7EA4-3366-A7E9-7C723569137A/gray/{z}/{y}/{x}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      circle01: {
        center: [37.374744, 126.947630],
        radius: 26,
        color: '#227C70'
      },
      circle02: {
        center: [37.372349, 126.946671],
        radius: 16,
        color: '#4CAF50'
      },
      circle03: {
        center: [37.372349, 126.943458],
        radius: 36,
        color: '#EB6440'
      },
      circle04: {
        center: [37.374454, 126.945019],
        radius: 46,
        color: '#CF0A0A'
      },
      circle05: {
        center: [37.371435, 126.957755],
        radius: 56,
        color: '#CF0A0A'
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
a {
  text-decoration: none;
}
</style>
