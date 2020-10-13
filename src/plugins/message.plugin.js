export default {
  install(Vue, options) {
    ;(Vue.prototype.$messageGreen = (message) => {
      M.toast({ html: message, classes: "green accent-3" })
    }),
      (Vue.prototype.$messageOrange = (message) => {
        M.toast({ html: message, classes: "orange accent-3" })
      }),
      (Vue.prototype.$messageRed = (message) => {
        M.toast({ html: message, classes: "red darken-4" })
      })
    Vue.prototype.$error = (message) => {
      M.toast({ html: `Error: ${message}`, classes: "red darken-4" })
    }
  },
}
