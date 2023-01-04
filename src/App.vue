<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
      style="z-index: 10000"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="font-weight-bold">
        지체 산정 프로그램
      </v-app-bar-title>
      <v-spacer />
      <v-btn>
        Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      :src="require('@/assets/sidebar.jpg')"
      style="z-index: 10000"
    >
      <template
        #img="props"
      >
        <v-img
          :gradient="gradient"
          v-bind="props"
        />
      </template>
      <v-list-item>
        <v-list-item-content
          class="py-5"
        >
          <v-img
            :src="require('@/assets/easy.png')"
            max-width="100px"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          active-class="primary"
          class="py-1"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-col
        id="text-list"
        class="white--text"
      >
        <h4
          lass="font-weight-bold white--text "
        >
          Current Time<br>
          {{ today }}<br>
          <p class="text-caption">
            아래 데이터는 15분마다 갱신 됩니다.
          </p>
        </h4>
      </v-col>
      <v-col>
        <v-card
          color="#263238"
          width="95%"
        >
          <!-- 아래 실시간 데이터 바인딩해야합니다. -->
          <v-card-title>{{ 190 }} s/h</v-card-title>
          <v-card-subtitle>오늘 평균 지체시간</v-card-subtitle>
          <v-card-text>
            현재 시각을 기준으로 지체시간을 나타냅니다.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="#263238"
          width="95%"
        >
          <!-- 아래 실시간 데이터 바인딩해야합니다. -->
          <v-card-title>{{ 170 }} s/h</v-card-title>
          <v-card-subtitle>1주 전 평균 지체시간</v-card-subtitle>
          <v-card-text>
            1주 전 데이터를 기준으로 지체시간을 나타냅니다.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="#263238"
          width="95%"
        >
          <!-- 아래 실시간 데이터 바인딩해야합니다. -->
          <v-card-title>{{ 150 }} s/h</v-card-title>
          <v-card-subtitle>2주 전 평균 지체시간</v-card-subtitle>
          <v-card-text>
            2주 전 데이터를 기준으로 지체시간을 나타냅니다.
          </v-card-text>
        </v-card>
      </v-col>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'App',
  component: {
    dayjs
  },
  data: () => ({
    today: dayjs().format("YYYY년MM월DD일 HH시mm분"),
    drawer: true,
    gradient: 'rgba(0,0,0,.7), rgba(0,0,0,.7)',
    items: [
      { title: 'Dashboard', icon: 'mdi-monitor-dashboard', to: '/' },
      { title: 'Graph', icon: 'mdi-alarm-multiple', to: '/graph-system'},
      { title: 'Delay data', icon: 'mdi-chevron-triple-up', to: '/map-container' },
      // { title: 'Edit', icon: 'mdi-application-edit', to: '/typography' },
    ],
    right: null,
  }),
};
</script>

<style>
#text-list {
  margin-top: 10%;
  text-align: left;
}
#app {
  height: 100%;
  background-color: #EFEFEF;
}
</style>
