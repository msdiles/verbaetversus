export default {
  state: {},
  mutations: {},
  actions: {
    async addWord({ rootState, dispatch, commit }, data) {
      try {
        const token = rootState.auth.accessToken
        if (token) {
          const response = await _fetch("/words/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
            body: JSON.stringify(data),
          })
          if (response.status === 200) return true
          if (response.status === 401) {
            const res = await dispatch("refreshTokens", {
              action: "addWord",
              actionData: data,
            })
            if (res) return true
          }
          if (response.status === 409) return false
          throw new Error()
        }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async searchWords({ commit }, data) {
      try {
        const response = await _fetch("/words/search" + data, {
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
    async findWord({ commit }, data) {
      try {
        const response = await _fetch("/words/find?word=" + data, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status > 200) throw new Error()
        const res = await response.json()
        return res
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async updateWord({ rootState, dispatch, commit }, data) {
      try {
        const token = rootState.auth.accessToken
        if (token) {
          const response = await _fetch("/words/update", {
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
              action: "updateWord",
              actionData: data,
            })
            if (res) return res
          }
          if (response.status > 200) throw new Error()
          throw new Error()
        }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async deleteWord({ rootState, dispatch, commit }, data) {
      try {
        const token = rootState.auth.accessToken
        if (token) {
          const response = await _fetch("/words/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
            body: JSON.stringify(data),
          })
          if (response.status === 200) return true
          if (response.status === 401) {
            const res = await dispatch("refreshTokens", {
              action: "deleteWord",
              actionData: data,
            })
            if (res) return res
          }
          if (response.status > 200) throw new Error()
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
