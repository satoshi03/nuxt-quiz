export const strict = false

export const state = () => ({
  test: null,
})

export const mutations = {
  setTest (state, payload) {
    state.test = payload
  }
}

export const actions = {
  setTest ({ commit }, payload) {
    commit('setTest', payload)
  }
}

export const getters = {
  getTest (state) {
    return state.test
  }
}
