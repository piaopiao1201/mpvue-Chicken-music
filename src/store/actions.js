import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  savePlay,
  saveFavorite,
  deleteFavorite
} from 'common/js/cache'
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export const selectPlay=function({commit,state},{list,index}){
	commit(types.SET_PLAYLIST,list);
	commit(types.SET_CURRENT_INDEX,index);
	commit(types.SET_SEQUENCE_LIST,list);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
}

export const randomPlay=function({ commit, state },list){
	var index=Math.floor(Math.random()*list.length);
	commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYING_STATE,true);
}

// 插入歌曲
export const insertSong = function({ commit, state }, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前的歌曲
  let currentSong = playList[currentIndex]
  // 在当前索引+1位置插入
  currentIndex++
  // 查找将要插入的歌曲在歌曲列表中的位置
  let fpIndex = findIndex(playList, song)
  // 插入要添加的歌曲
  playList.splice(currentIndex, 0, song)
  // 判断当前歌曲列表中是否含有将要插入的歌曲
  if (fpIndex > -1) {
    // 如果要插入的歌曲在当前播放歌曲之后
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 删除歌单中的歌曲
export const deleteSong = function({ commit, state }, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)

  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  // 当删除的歌曲在播放歌曲之前，或是正在播放的歌曲是在当前播放歌单的最后一首
  if (pIndex < currentIndex || currentIndex === playList.length) {
    currentIndex--
  }
	// console.log(currentIndex);
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  // 歌单全部删除 停止放歌,当列表还有歌曲时可以播放
  const playingState = playList.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

//清空播放列表
export const deleteSongList = function({ commit, state }, song) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

// 保存搜索历史
export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}


// 删除 searchHistory 数组中某个值
export const deleteSearchHistory = function({ commit }, query) {
	console.log('delete');
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清空 searchHistory
export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 保存最近播放
export const savePlayHistory = function({ commit, state }, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
//保存我喜欢列表
export const saveFavoriteList = function({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}
//删除我喜欢列表
export const deleteFavoriteList = function({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}