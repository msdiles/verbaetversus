export default {
  state: {},
  mutations: {},
  actions: {
    async addWord({ commit }, data) {
      try {
        const response = await _fetch("/words/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status === 409) return false
        if (response.status === 200) return true
        throw new Error()
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async searchWords({ commit }, data) {
      try {
        const response = await _fetch("/words/search?word=" + data, {
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
        if (res.success === false) return true
        return res
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async updateWord({ commit }, data) {
      try {
        const response = await _fetch("/words/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 200) throw new Error()
        if (response.status === 200) return await response.json()
        throw new Error()
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async deleteWord({ commit }, data) {
      try {
        const response = await _fetch("/words/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.status > 200) throw new Error()
        if (response.status === 200) return true
        throw new Error()
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
  },
  getters: {},
}
