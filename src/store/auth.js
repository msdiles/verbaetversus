import router from "../router"

export default {
  state: {
    user: null,
    accessToken: null,
    isUserLoggedIn: false,
    loading: false,
  },
  mutations: {
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken
      localStorage.setItem("session", refreshToken)
    },
    clearTokens(state) {
      state.accessToken = null
      localStorage.removeItem("session")
    },
    setUserInfo(state, user) {
      state.user = user
      state.isUserLoggedIn = true
    },
    clearUserInfo(state) {
      state.user = null
      state.isUserLoggedIn = false
    },
    setLoading(state) {
      state.loading = true
    },
    clearLoading(state) {
      state.loading = false
    },
  },
  actions: {
    async checkEmail({ commit }, data) {
      try {
        const response = await _fetch("/auth/email-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 204) throw new Error("Something go wrong")
        const { isUserExist } = await response.json()
        return isUserExist
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async signUp({ commit }, data) {
      try {
        const response = await _fetch("/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 204) throw new Error("Something go wrong")
        const { success, message } = await response.json()
        if (!success) throw new Error(message)
        return success
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async signIn({ commit }, data) {
      try {
        const response = await _fetch("/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status === 401 || response.status === 422)
          throw new Error("Invalid password or email")
        if (response.status > 204) throw new Error("Something go wrong")
        const { user, accessToken, refreshToken } = await response.json()
        commit("setTokens", { accessToken, refreshToken })
        commit("setUserInfo", user)
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async logOut({ commit }) {
      try {
        const token = localStorage.getItem("session")
        const data = { token }
        await _fetch("/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        commit("clearTokens")
        commit("clearUserInfo")
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async refreshTokens({ dispatch, commit }) {
      try {
        commit("setLoading")
        const token = localStorage.getItem("session")
        const data = { token, fingerprint: "ASDASDADADASDA" }
        const response = await _fetch("/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 204) {
          dispatch("logOut")
          router.push("/")
          M.toast({ html: "Your Session Has Timed Out" })
        } else {
          const { user, refreshToken, accessToken } = await response.json()
          commit("setTokens", { accessToken, refreshToken })
          commit("setUserInfo", user)
        }
      } catch (e) {
        commit("setError", e)
        throw e
      } finally {
        commit("clearLoading")
      }
    },
    async getUserInfo({ commit, dispatch, state }) {
      try {
        commit("setLoading")
        const token = state.accessToken
        if (token) {
          const response = await _fetch("/auth/refresh", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          const data = await response.json()
          if (response.status > 204) {
            dispatch("refreshTokens")
          } else {
            commit("setUserInfo", data.user)
          }
        }
      } catch (e) {
        commit("setError", e)
        throw e
      } finally {
        commit("clearLoading")
      }
    },
    async refreshOnLoad({ commit, dispatch }) {
      try {
        const token = localStorage.getItem("session")
        if (token) {
          dispatch("refreshTokens")
        }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
  },
  getters: {},
}
