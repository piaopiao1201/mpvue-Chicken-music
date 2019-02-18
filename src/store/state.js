import {playMode} from 'common/js/config'
import { loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playList:[],
	sequenceList:[],
	playMode:playMode.sequence,
	currentIndex: -1,
	disc:{},
	// 歌单详情列表
	toplist: {},
	searchHistory: loadSearch(),// 搜索历史数组
  playHistory: loadPlay(), // 最近播放歌曲历史
  favoriteList: loadFavorite()
}

export default state