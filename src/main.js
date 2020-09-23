import Vue from "vue"
import Vuelidate from "vuelidate"
import App from "@/App"
import router from "@/router"
import store from "@/store"

import messagePlugin from "./plugins/message.plugin"
import fetchPlugin from "./plugins/fetch.plugin"

import customFetch from "./utils/customFetch"
import Loader from "./components/Loader.vue"

import "materialize-css/dist/js/materialize.min"
import "@/styles/main.scss"

customFetch({ url: "http://localhost:3000" })
Vue.use(fetchPlugin, { url: "http://localhost:3000" })
Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.component("Loader", Loader)
;(async () => {
  await store.dispatch("refreshOnLoad")

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app")
})()
