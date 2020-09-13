import Vue from "vue"
import Vuelidate from "vuelidate"
import App from "@/App"
import router from "@/router"
import store from "@/store"

import "materialize-css/dist/js/materialize.min"
import "@/styles/main.scss"

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
