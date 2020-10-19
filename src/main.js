import Vue from "vue"
import Vuelidate from "vuelidate"
import App from "@/App"
import router from "@/router"
import store from "@/store"

import messagePlugin from "@/plugins/message.plugin"
import fetchPlugin from "@/plugins/fetch.plugin"

import customFetch from "@/utils/customFetch"
import Loader from "@/components/common/Loader.vue"
import LoaderPage from "@/components/common/LoaderPage.vue"

import DateFilter from "@/filters/date.filter.js"
import UppercaseFilter from "@/filters/uppercase.filter.js"
import localizeFilter from "@/filters/localize.filter.js"

import tooltipDirective from "@/directives/tooltip.directive.js"
import visibilityDirective from "@/directives/visibility.directive.js"

import "materialize-css/dist/js/materialize.min"
import "@/styles/main.scss"

customFetch({ url: "http://localhost:3000" })
Vue.use(fetchPlugin, { url: "http://localhost:3000" })
Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter("date", DateFilter)
Vue.filter("upper", UppercaseFilter)
Vue.filter("localize",localizeFilter)

Vue.directive("tooltip", tooltipDirective)
Vue.directive("visible",visibilityDirective)

Vue.component("Loader", Loader)
Vue.component("LoaderPage", LoaderPage)
;(async () => {
  await store.dispatch("refreshOnLoad")
  await store.dispatch("getLanguageOnLoad")
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app")
})()
//TODO ADD ANIMATION
//TODO FIX profile refresh
//TODO words message when word isExist
//TODO add list of related quotes to word card
//FIXME fix word related at quote add
//TODO add relative design at profile page
