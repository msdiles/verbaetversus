import router from "../router"

export default {
  state: {},
  mutations: {},
  actions: {
    async resetLink({ commit }, email) {
      try {
        const response = await _fetch("/auth/reset/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        })
        if (response.status > 204) throw new Error("Something go wrong")
        const { isUserExist } = await response.json()
        return isUserExist
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async checkLink({ commit }, data) {
      try {
        const response = await _fetch("/auth/reset/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status === 500) throw new Error("Something go wrong")
        if (response.status > 204) return false
        return true
      } catch (e) {
        commit("setError", e)
        router.push("/")
        throw e
      }
    },
    async changePassword({ commit }, data) {
      try {
        const response = await _fetch("/auth/reset/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 204) throw new Error("Something go wrong")
        return true
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
  },
  getters: {},
}
