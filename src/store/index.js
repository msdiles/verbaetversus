import Vue from "vue"
import Vuex from "vuex"
import auth from "./auth"
import words from "./words"
import reset from "./resetPassword"
import quotes from "./quotes"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    locale: "en-US",
    language: "eng",
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setLanguage(state, { locale, language }) {
      state.language = language
      state.locale = locale
    },
    clearLanguage(state) {
      state.language = "en-US",
      state.language = "eng"
    },
  },
  actions: {
    setLanguage({commit},{locale,language}){
      commit("setLanguage",{locale,language})
      localStorage.setItem("locale",JSON.stringify({locale,language}))
    },
    getLanguageOnLoad({commit}){
      const localeItem =JSON.parse(localStorage.getItem("locale"))
      if (localeItem)commit("setLanguage",{...localeItem})
    }
  },
  getters: {},
  modules: { auth, words, reset, quotes },
})
