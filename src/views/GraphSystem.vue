<template>
  <v-containe>
    <v-col>
      <v-col>
        <h2>
          지체시간 데이터
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
          오늘과 당일 전 데이터를 시간에 맞춰 비교하여 분석할 수 있습니다.
        </div>
      </v-col>
      <v-row>
        <v-col cols="12">
          <v-card
            color="grey lighten-4"
          >
            <v-card-title>
              <v-row align="start">
                <div>
                  <span
                    class="text-h3 font-weight-black"
                    v-text="avg || '—'"
                  />
                </div>
              </v-row>

              <v-spacer />

              <v-btn
                icon
                class="align-self-start"
                size="28"
              >
                <v-icon>mdi-arrow-right-thick</v-icon>
              </v-btn>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                :key="String(avg)"
                :smooth="16"
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                :line-width="3"
                :value="heartbeats"
                auto-draw
                stroke-linecap="round"
              />
            </v-sheet>
          </v-card>
        </v-col>
        <v-col
          v-for="count in 4"
          :key="count"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="mx-auto text-center"
            color="teal"
            dark
            max-width="600"
          >
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="value"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    ${{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class="text-h5 font-weight-black">
                평균 지체 산정
              </div>
            </v-card-text>

            <v-divider />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-containe>
</template>

<script>
const exhale = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export default {
  data() {
    return {
      checking: false,
      heartbeats: [],
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
        760,
        510,
        760,
        423,
        446,
      ],
    };
  },

  computed: {
    avg () {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
  },

  created () {
    this.takePulse(false)
  },

  methods: {
    heartbeat () {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse (inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
