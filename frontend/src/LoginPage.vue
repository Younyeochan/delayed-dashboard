<template>
  <v-content>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-snackbar
            :value="isError"
            type="error"
            :timeout="2000"
          >
            아이디와 비밀번호를 확인해주세요
          </v-snackbar>
          <v-snackbar
            :value="loginSuccess"
            type="success"
          >
            로그인이 완료되었습니다! 좋은 하루 보내세요! :)
          </v-snackbar>
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>지체 산정 프로그램 🔐</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Id"
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                depressed
                block
                large
                @click="this.$store.dispatch('login', email, password)"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'LoginPage',
  props: {
  },
  data() {
    return {
      email: null,
      password: null,
      isError: false,
      loginSuccess: false
    };
  },

  mounted() {

  },

  methods: {
    login(){
      console.log(this.email, this.password);
      // 유저의 정보를 확인하고 허용한다.
      // 전체 유저에서 해당 이메일로 유저를 찾는다. (db일 경우엔 쿼리로 확인 가능)
      let selectedUser = null;
      this.allUser.forEach(user => {
        if(user.email === this.email) selectedUser = user
      })
      selectedUser === null
        ? (this.isError = true)
        : selectedUser.password !== this.password
          ? (this.isError = true)
          : (this.loginSuccess = true)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
