export default {
  state: {},
  mutations: {},
  actions: {
    async addQuote({ rootState, dispatch, commit }, data) {
      try {
        const token = rootState.auth.accessToken
        if (token) {
          const response = await _fetch("/quotes/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
            body: JSON.stringify(data),
          })
          if (response.status === 200) return await response.json()
          if (response.status === 401) {
            const res = await dispatch("refreshTokens", {
              action: "addQuote",
              actionData: data,
            })
            if (res) return res
          }
          throw new Error()
        }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async searchQuotes({ commit }, data) {
      try {
        const response = await _fetch("/quotes/search?quote=" + data, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status > 200) throw new Error()
        const res = await response.json()
        if (res.success === false) return true
        return res
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async findQuote({ commit }, data) {
      try {
        const response = await _fetch("/quotes/find?quote=" + data, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status > 200) throw new Error()
        const res = await response.json()
        if (res.success === false) return true
        return res
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async updateQuote({ rootState, dispatch, commit }, data) {
     try {
      const token = rootState.auth.accessToken
      if (token) {
        const response = await _fetch("/quotes/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify(data),
        })
        if (response.status === 200) return await response.json()
        if (response.status === 401) {
          const res = await dispatch("refreshTokens", {
            action: "updateQuote",
            actionData: data,
          })
          if (res) return res
        }
        throw new Error()
      }
     } catch (e) {
      commit("setError", e)
      throw e
     }
    },
    async deleteQuote({ rootState, dispatch, commit}, data) {
      try {
        const token = rootState.auth.accessToken
        if (token) {
          const response = await _fetch("/quotes/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
            body: JSON.stringify(data),
          })
          if (response.status === 200) return await response.json()
          if (response.status === 401) {
            const res = await dispatch("refreshTokens", {
              action: "deleteQuote",
              actionData: data,
            })
            if (res) return res
          }
          throw new Error()
        }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
  },
  getters: {},
}
