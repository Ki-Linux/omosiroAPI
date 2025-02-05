export const state = () => ({
    prefecture: '',
    middleArea: [],
    spotInfo: [],
  });

export const mutations = {
  setSelectedPrefecture(state, prefecture) {
    state.prefecture = prefecture
  },
  setSelectedMiddleArea(state, middleArea) {
    state.middleArea = middleArea
  },
  setSelectedSpotInfo(state, spotInfo) {
    state.spotInfo = spotInfo
  }
}

export const actions = {
  // Mutations を commit することで状態を更新できる
  setSelectedPrefecture({ commit }, prefecture) {
    commit('setSelectedPrefecture', prefecture);
  },
  setSelectedMiddleArea({ commit }, middleArea) {
    commit('setSelectedMiddleArea', middleArea);
  },
  setSelectedSpotInfo({ commit }, spotInfo) {
    commit('setSelectedSpotInfo', spotInfo);
  },
}