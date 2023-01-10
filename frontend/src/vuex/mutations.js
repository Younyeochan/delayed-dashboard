const mutations = {
  // 로그인이 성공했을 때
  loginSuccess(state) {
    state.isLogin = true
    state.isLoginError = false
  },
  // 로그인이 실패했을 때
  loginError(state) {
    state.isLogin =false,
    state.isLoginError = true
  }
};

export default mutations;
