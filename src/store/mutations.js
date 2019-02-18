import * as types from './mutations-types'
const mutations={
	[types.SET_SINGER](state,singer){
		state.singer=singer;
	},
	[types.SET_PLAYING_STATE](state,flag){
		state.playing=flag;
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag;
	},
	[types.SET_PLAYLIST](state,list){
		state.playList=list;
	},
	[types.SET_SEQUENCE_LIST](state,list){
		state.sequenceList=list;
	},
	[types.SET_PLAY_MODE](state,playMode){
		state.playMode=playMode;
	},
	[types.SET_CURRENT_INDEX](state,currentIndex){
		state.currentIndex=currentIndex;
	},
	[types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, toplist) {
    state.toplist = toplist
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, playHistory) {
    state.playHistory = playHistory
  },
  [types.SET_FAVORITE_LIST](state, favoriteList) {
    state.favoriteList = favoriteList
  }
}

export default mutations