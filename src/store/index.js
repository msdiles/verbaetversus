import Vue from "vue"
import Vuex from "vuex"
import auth from "./auth"
import words from "./words"
import reset from "./resetPassword"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {},
  getters: {},
  modules: { auth,words,reset },
})
