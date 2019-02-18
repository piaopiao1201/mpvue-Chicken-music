<template>
    <div class="playlist" v-if="showFlag" @click="hidden">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll-view ref="listContent" class="list-content" :scroll-y="true" :scroll-into-view="listScrollId">
          <ul>
            <li :key="index" class="item" v-for="(item, index) in loadList" @click="selectItem(item, index)" :id="'subItem'+index">
							<i class="current" :class="item.id==currentSong.id?'icon-play':''"></i>
							<span class="text">{{item.name}}</span>
							<span class="like">
                <i class="icon" :class="classFavoriteArr[index]" @click.stop="toggleFavorite(index)"></i>
              </span>
							<span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll-view>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hidden">
          <span>关闭</span>
        </div>
      </div>
      <!-- <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="confirmClear"></confirm> -->
      <addSong ref="addSong"></addSong>
    </div>
</template>

<script>
import { playMode } from 'common/js/config'
// import Scroll from 'base/scroll/scroll'
// import Confirm from 'base/confirm/confirm'
import addSong from '@/components/add-song/add-song'
import { mapMutations, mapActions,mapGetters} from 'vuex'
import { playerMixin } from 'common/js/mixin'
export default {
	mixins: [playerMixin],
	data () {
		return {
			showFlag:false,
			listScrollId:'',
			classFavoriteArr:[]
		};
	},

	components: {
		addSong
	},

	computed: {
		// ...mapGetters([
		// 	'sequenceList','currentSong','playMode','currentIndex','favoriteList'
		// ]),
		// ...mapGetters([
		// 	'sequenceList',
		// 	'currentSong',
		// 	'playList',
		// 	'playMode',
		// 	'favoriteList',
		// 	'currentIndex'
		// ]),
		loadList(){
			return this.sequenceList;
		},
		modeText(){
			switch(this.playMode){
				case playMode.sequence:
					return '顺序播放';
				case playMode.loop:
					return '单曲循环';
				case playMode.random:
					return '随机播放';
			}
		},
		// getFavoriteIcon() {
    //   if (this.isFavoriteSong(this.sequenceList)) {
    //     return 'icon-favorite'
    //   }
    //   return 'icon-not-favorite'
		// },

		// iconMode(){
		// 	switch(this.playMode){
		// 		case playMode.sequence:
		// 			return 'icon-sequence';
		// 			break;
		// 		case playMode.loop:
		// 			return 'icon-loop';
		// 			break;
		// 		case playMode.random:
		// 			return 'icon-random';
		// 			break;
		// 	}
		// },
	},

	mounted(){
		console.log(this.sequenceList);
	},

	methods: {
		...mapMutations({
			setFullScreen:'SET_FULL_SCREEN',
			setPlaying:'SET_PLAYING_STATE',
			setCurrentIndex:'SET_CURRENT_INDEX',
			setPlayMode:'SET_PLAY_MODE'
		}),
		...mapActions([
			'deleteSong','deleteSongList','savePlayHistory','deleteFavoriteList','saveFavoriteList'
		]),
		// changeMode(){
		// 	var mode=(this.playMode+1)%3;
		// 	// console.log(mode)
		// 	this.setPlayMode(mode);
		// },
		show(){
			this.showFlag=true;
			this.listScrollId='subItem'+this.currentIndex;
			// console.log(this.listScrollId);
		},
		hidden(){
			this.showFlag=false;
		},
		addSong(){
			this.$refs.addSong.show();
		},
		selectItem(item,index){
			this.setCurrentIndex(index);
		},
		scrollToEl(curSong,oldSong){
			if(!this.showFlag||curSong.id==oldSong.id){
				return;
			}
			this.listScrollId='subItem'+this.currentIndex;
		},
		deleteOne(song){
			this.deleteSong(song);
			if(!this.sequenceList.length){
				this.showFlag=false;
			}
		},
		showConfirm(){
			var that=this;
			wx.showModal({
				title: '提示',
				content: '是否清空播放列表',
				confirmText:'清空',
				success(res) {
					if (res.confirm) {
						that.showFlag=false;
						that.deleteSongList();
						
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},
		toggleFavorite(index) {
      if (this.isFavoriteSong(this.sequenceList[index])) {
        this.deleteFavoriteList(this.sequenceList[index])
      } else {
        this.saveFavoriteList(this.sequenceList[index])
			}
			this.updateClassArr(this.sequenceList);
		},
		// 判断是否是最喜欢的歌曲
    isFavoriteSong(song) {
      let index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1
		},
		// getFavoriteIcon(index){
		// 	if (this.isFavoriteSong(this.sequenceList[index])) {
    //     return 'icon-favorite'
    //   }
    //   return 'icon-not-favorite'
		// },
		updateClassArr(newList){
			newList.forEach((item,index)=>{
				if (this.isFavoriteSong(item)) {
					this.classFavoriteArr[index]='icon-favorite';
      	}else{
					this.classFavoriteArr[index]='icon-not-favorite';
				}
			})
		}
	},
	watch:{
		currentSong(newSong,oldSong){
			console.log(this.sequenceList);
			// this.scrollToEl(newSong,oldSong);
		},
		sequenceList(newList){
			this.updateClassArr(newList);
		}
	},
	
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.playlist
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 200
  background-color $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition opacity 0.3s
    .list-wrapper
      transition all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity 0
    .list-wrapper
      transform translate3d(0, 100%, 0)
  &.list-fade-enter, .list-wrapper
    position absolute
    left 0
    bottom 0
    width 100%
    background-color $color-highlight-background
    .list-header
      position relative
      padding 20px 30px 10px 20px
      .title
        display flex
        align-items center
        .icon
          margin-right 10px
          font-size 30px
          color $color-theme-d
        .text
          flex 1
          font-size $font-size-medium
          color $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size $font-size-medium
            color $color-text-d
    .list-content
      max-height 250px
      overflow hidden
      .item
        display flex
        align-items center
        height 40px
        padding 0 30px 0 20px
        overflow hidden
        &.list-enter-active, &.list-leave-active
          transition all 0.1s
        &.list-enter, &.list-leave-to
          height 0
        .current
          flex 0 0 20px
          width 20px
          font-size $font-size-small
          color $color-theme-d
        .text
          flex 1
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
        .like
          // extend-click()
          margin-right 15px
          font-size 24px
          color $color-theme
          .icon-favorite
            color $color-sub-theme
        .delete
          extend-click()
          font-size $font-size-small
          color $color-theme
    .list-operate
      width 140px
      margin 20px auto 30px auto
      .add
        display flex
        align-items center
        padding 8px 16px
        border 1px solid $color-text-l
        border-radius 100px
        color $color-text-l
        .icon-add
          margin-right 5px
          font-size $font-size-small-s
        .text
          font-size $font-size-small
    .list-close
      text-align center
      line-height 50px
      background $color-background
      font-size $font-size-medium-x
      color $color-text-l
</style>