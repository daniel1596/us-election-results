import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nationwideVoteShares: {},
    statewideVoteShares: {}
  },
  mutations: {
    setVoteShares(state, electionData) {
      const { nationwide_vote_shares, statewide_vote_shares } = electionData
      state.nationwideVoteShares = nationwide_vote_shares
      state.statewideVoteShares = statewide_vote_shares
    }
  },
  actions: {
    setVoteShares({ commit }, electionData) {
      commit('setVoteShares', electionData)
    }
  },
  modules: {
  }
})
