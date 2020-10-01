import store from "@/store"
const accessLevels = ["unAuth", "user", "moderator", "admin", "superadmin"]

export default function(level) {
  return {
    data: () => ({
      isAllowed: false,
      isAllowedLoading: false,
    }),
    computed: {
      _loading() {
        return store.state.auth.loading
      },
    },
    watch: {
      _loading() {
        if (!this._loading && store.state.auth.user) {
          this.isAllowedLoading = false
          this.isAllowed =
            store.state.auth.user.role.includes(level) ||
            accessLevels.indexOf(
              store.state.auth.user.role[store.state.auth.user.role.length - 1]
            ) >= accessLevels.indexOf(level)

        }
      },
    },
    mounted() {
      if (this._loading) this.isAllowedLoading = true
      if (!this._loading && store.state.auth.user) {
        this.isAllowed =
          store.state.auth.user.role.includes(level) ||
          accessLevels.indexOf(
            store.state.auth.user.role[store.state.auth.user.role.length - 1]
          ) >= accessLevels.indexOf(level)
      }
    },
  }
}
