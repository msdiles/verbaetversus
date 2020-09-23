import store from "../store"


export default {
  computed: {
    error() {
      return store.state.error
    },
  },
  watch: {
    error(error) {
      this  .$error(error.message || "ASDASDASDASDA")
    },
  },
}
