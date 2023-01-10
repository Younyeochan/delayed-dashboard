<template>
  <v-container>
    <v-card>
      <v-card-title>
        Typography
      </v-card-title>
      <v-container class="grey lighten-3">
        <v-card class="pa-3 text-h2 primary lighten-1">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 secondary">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 error">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 primary--text">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 secondary--text">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 error--text d-none d-sm-block float-left">
          <!-- d-none === display:none -->
          <!-- d-sm-block : 해당 -sm-을 통해 원하는 사이즈를 중간에 입력하면 원하는 사이즈일때만 블럭처리를 다른 코드없이 사용할 수 있다.(헬퍼 코드) -->
          <!-- float : 해당 코드를 이용하여 우리가 원하는 화면 구현이 가능해보인다. 예를들어 지도만 키운다던가 -->
          컨텐츠
        </v-card>
        <v-card class="pa-3">
          <p class="text-h5 text-center text-sm-justify">
            Stepping upon the carousel of love
            We offer our hearts to God and each other
            Taking a picturesque seat we look and smile gently
            At the one we have promised our life to obey

            The days are beginning in new wedded bliss
            Slowly at first and we wonder at the hours
            Hours of changing scenery and feelings
            One is up, the other down

            One is down, the other up
            We continue to love and hold hands when we can
            Sometimes within the realms of day
            We meet and share each others dreams

            The moments take on new momentum of time
            We often miss the beauty of things passing by
            But because we are one, on this journey and beyond
            We can cherish each other, no matter what comes

            Cherish the one to whom we’ve been given
            A wonderful joy, sent straight from heaven
            Because one day this beautiful carousel of ours
          </p>
          <!-- <p class="text-h2">
            h2
          </p> -->
          <!-- <p class="text-h3 text-sm-subtitle-1 font-weight-black">
            h3
          </p> -->
          <!-- <p class="text-h4">
            h4
          </p>
          <p class="text-h5">
            h5
          </p>
          <p class="text-h6">
            h6
          </p>
          <p class="text-subtitle-1">
            subtitle-1
          </p>
          <p class="text-subtitle-2">
            subtitle-2
          </p>
          <p class="text-body-1">
            body-1
          </p>
          <p class="text-body-2">
            body-2
          </p>
          <p class="text-button">
            button
          </p>
          <p class="text-caption">
            caption
          </p>
          <p class="text-overline">
            overline
          </p> -->
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DelayedDashboardTypography',

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
