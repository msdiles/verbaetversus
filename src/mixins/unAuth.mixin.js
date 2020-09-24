export default {
  computed: {
    isLogged() {
      return this.$store.state.auth.isUserLoggedIn
    },
    isLoading() {
      return this.$store.state.auth.loading
    },
  },
  watch: {
    isLogged() {
      if (this.isLogged) {
        this.$router.push("/")
      }
    },
  },
}
