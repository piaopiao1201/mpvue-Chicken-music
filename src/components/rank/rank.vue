<template>
  <div class="rank" ref="rank">
    <scroll-view ref='scroll' :scroll-y="true" style="height: 100%;" class="toplist">
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)" :class="{bottomMargin:playList.length>0}">
          <div class="icon">
            <!-- <img width="100" height="100" v-lazy="item.picUrl"> -->
						<img :src="item.picUrl" alt="" width="100" height="100" class="discListImage">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index2) in item.songList" :key="index2">
              <span>{{index2 + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <mpLoading></mpLoading>
      </div>
    </scroll-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import mpLoading from 'base/mpLoading/loading'
// import Scroll from 'base/scroll/scroll'
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
// import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
import {mapGetters} from 'vuex'
export default {
  // mixins: [playListMixin],
  created() {
    // this._getTopList()
  },
  data() {
    return {
      topList: []
    }
	},
	computed: {
		...mapGetters([
			'playList'
		]),
	},
	mounted () {
		getTopList().then(res => {
      if (res.code === ERR_OK) {
        this.topList=res.data.topList;
      }
    })
	},
  components: {
    mpLoading
  },
  methods: {
    // handlePlayList(playList) {
    //   const bottom = playList.length > 0 ? '60px' : ''
    //   this.$refs.rank.style.bottom = bottom
    //   this.$refs.toplist.refresh()
		// },
		...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    selectItem(item) {
			this.setTopList(item);
      this.$emit('selectRank');
			// 加入到 vuex 中 state 的 toplist 中
			console.log(item);
      
    },
    // _getTopList() {
      
    // }
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.rank
  position fixed
  width 100%
  top 88px
  bottom 0
	.toplist
    height 100%
    overflow hidden
    .item
      display flex
      margin 0 20px
      padding-top 20px
      height 100px
      &:last-child
        padding-bottom 20px
			&.bottomMargin:last-child
				margin-bottom:60px
			.icon
        flex 0 0 100px
        width 100px
        height 100px
				.discListImage
					width 100%
					height 100%
			.songlist
				flex 1
				display flex
				flex-direction column
				justify-content center
				padding 0 20px
				height 100px
				overflow hidden
				background $color-highlight-background
				color $color-text-d
				font-size $font-size-small
				.song
					no-wrap()
					line-height 26px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
