export default {
  install(Vue,options) {
    Vue.prototype.$message = (message) => {
      M.toast({ html: message })
    }
    Vue.prototype.$error = (message) => {
      M.toast({ html: `Error: ${message}` })
    }
  },
}
