<template>
	<div class="player" v-show="playList.length">
		<div class="normal-player" v-show="fullScreen">
		<div class="background">
			<img :src="currentSong.imgurl||' '" width="100%" height="100%">
		</div>
		<div class="top">
			<div class="back" @click="goBack">
				<i class="icon-back"></i>
			</div>
			<h1 class="title" v-html="currentSong.name"></h1>
			<h2 class="subtitle" v-html="currentSong.singer"></h2>
		</div>
		<div class="middle" @touchstart="middleTouchStart" @touchmove="middleTouchMove" @touchend="middleTouchEnd">
			<div class="middle-l" :style="middleLStyle">
				<div class="cd-wrapper" ref='cdWrapper'>
					<div class="cd">
						<img :src="normalImgUrl" alt="" class="image" :animation="animationRotate" :style="transformR">
					</div>
				</div>
			</div>
			<scroll-view class="middle-r" ref="lyricList" :scroll-y="true" :scroll-into-view="lyricScrollId" :scroll-with-animation="true" :style="lyricListStyle">
				<div class="lyric-wrapper">
					<div v-if="currentLyric">
						<p ref="lyricLine" v-for="(line, index) in currentLyric.lines" :key="index" :class="{'current': currentLineNum === index}" class="text" :id="'lyricLine'+index">{{line.txt}}</p>
					</div>
        </div>
			</scroll-view>
		</div>
		<div class="bottom">
			<div class="dot-wrapper">
        <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
        <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
      </div>
			<div class="progress-wrapper">
            <span class="time time-l" v-html="formatC"></span>
            <div class="progress-bar-wrapper">
              <progressBar :percent="percent" @percentChange="onProgressBarChange" @percentMoveChange="onProgressMoveChange"></progressBar>
            </div>
            <span class="time time-r" v-html="formatD"></span>
          </div>
			<div class="operators">
				<div class="icon i-left">
					<i :class="iconMode" @click="changeMode"></i>
				</div>
				<div class="icon i-left">
					<i class="icon-prev" @click="prev"></i>
				</div>
				<div class="icon i-center">
					<i @click="togglePlay" :class="isPlay"></i>
				</div>
				<div class="icon i-right">
					<i class="icon-next" @click="next"></i>
				</div>
				<div class="icon i-right">
					<i class="icon" @click="toggleFavorite" :class="getFavoriteIcon"></i>
				</div>
			</div>
		</div>
	</div>
	<!-- <audio style="display:none" width="0" height="0" ref='audio' @canplay="changeState" :src="audioSrc"  id="myAudio"></audio> -->
	<!-- 为兼容v-show无奈之举 -->
	<div class="mini-player-wrapper" v-show="!fullScreen">
	<div class="mini-player"  @click="open">
		<div class="icon">
			<img :src="currentSong.imgurl" width="40" height="40" style="width:40px;height:40px">
		</div>
		<div class="text">
			<h2 class="name" v-html="currentSong.name"></h2>
			<p class="desc" v-html="currentSong.singer"></p>
		</div>
		<div class="control">
			<progress-circle :radius="radius" :percent="percent">
        <i :class="miniIcon" @click.stop="togglePlay" class="icon-mini"></i>
      </progress-circle>
		</div>
		<div class="control" @click.stop="showPlayList">
			<i class="icon-playlist"></i>
		</div>
	</div>
	</div>
		<Playlist ref="playlist"></Playlist>
	</div>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {getSongUrl} from 'api/songUrl'
import {ERR_OK} from 'api/config'
// import { clearInterval } from 'timers';
import {playMode} from 'common/js/config'
import progressBar from '@/base/progress-bar/progress-bar'
import {getRandomIndex} from 'common/js/song'
import Lyric from 'lyric-parser';
import Playlist from '@/components/playlist/playlist';
import progressCircle from 'base/progress-circle/progress-circle';
export default {
	data () {
		return {
			radius:32,
			lyricScrollId:'',
			playSong:this.currentSong,
			canplay:false,
			audioSrc:'',
			animationRotate:'',
			rotateTimer:null,
			rotateDeg:0,
			normalImgUrl:'',
			currentTime:0,
			duration:0,
			indexHistory:[],
			isMoving:false,
			currentLyric:null,
			currentLineNum:0,
			currentShow:'cd',
			//歌词页偏移
			lyricOffsetLeft:0,
			transitionTime:0,
			middleLOpacity:1
			// i:1
		};
	},
	created() {
		// this.audioCtx= wx.createAudioContext('myAudio');
		 this.innerAudioContext = wx.createInnerAudioContext();
		 this.innerAudioContext.autoplay=true;
		 this.innerAudioContext.src='';
		 this.innerAudioContext.onTimeUpdate(this.updateTime);
		 this.innerAudioContext.onCanplay(this.canPlay);
		 this.innerAudioContext.onEnded(this.onEnded);
		 this.animation=wx.createAnimation({
			 duration: 50,
			 timingFunction:'linear',
		 })
		 this.animation.rotate(0).step();
		 this.animationRotate=this.animation.export();
		 //cd lyric 左右滑动
		 this.touch={}
		 this.innerWidth=wx.getSystemInfoSync().windowWidth;
		//  var innerWidth=wx.getSystemInfoSync().windowWidth;
	},
	components: {
		progressBar:progressBar,
		Playlist:Playlist,
		progressCircle:progressCircle
	},

	computed: {
		...mapGetters([
				'playList','fullScreen','currentSong','playing','currentIndex','playMode','favoriteList'
			]),
		isPlay(){
			return this.playing?'icon-pause':'icon-play';
		},
		miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
		transformR(){
			return 'transform:rotate('+this.rotateDeg+'deg);';
		},
		percent(){
			return this.currentTime/this.innerAudioContext.duration;
		},
		iconMode(){
			switch(this.playMode){
				case playMode.sequence:
					return 'icon-sequence';
					break;
				case playMode.loop:
					return 'icon-loop';
					break;
				case playMode.random:
					return 'icon-random';
					break;
			}
		},
		formatC(){
			var cur=this.currentTime;
			// console.log(cur);
			// return cur+'';
			var minute=Math.floor(cur/60)+'';
			var seconds=Math.floor(cur)%60+'';
			while(minute.length<2){
				minute='0'+minute;
			}
			while(seconds.length<2){
				seconds='0'+seconds;
			}
			return minute+':'+seconds;
		},
		formatD(){
			var dur=this.duration;
			var minute=Math.floor(dur/60)+'';
			var seconds=Math.floor(dur)%60+'';
			while(minute.length<2){
				minute='0'+minute;
			}
			while(seconds.length<2){
				seconds='0'+seconds;
			}
			return minute+':'+seconds;
		},
		lyricListStyle(){
			return "transform:translateX("+this.lyricOffsetLeft+"px);transition:all "+this.transitionTime+"s";
		},
		middleLStyle(){
			return 'opacity:'+this.middleLOpacity+'';
		},
		// 获得最喜爱或者正常的 class
    getFavoriteIcon() {
      if (this.isFavoriteSong(this.currentSong)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
	},

	// mounted(){
	// 	// console.log("加载了");
	// 	// var n=0;
	// 	// setInterval(function(){
	// 	// 	n=(n+1)%360;
	// 	// 	this.animation.rotate(n).step();
	// 	// 	this.animationRotate=this.animation.export();
	// 	// }.bind(this),30);
		
	// },

	methods: {
		...mapMutations({
			setFullScreen:'SET_FULL_SCREEN',
			setPlaying:'SET_PLAYING_STATE',
			setCurrentIndex:'SET_CURRENT_INDEX',
			setPlayMode:'SET_PLAY_MODE'
		}),
		...mapActions(['savePlayHistory','deleteFavoriteList','saveFavoriteList']),
		goBack(){
			this.setFullScreen(false);
		},
		open(){
			this.setFullScreen(true);
		},
		togglePlay(){
			this.setPlaying(!this.playing);
			if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
			if(!this.playing){
				this.innerAudioContext.pause();
			}else{
				this.innerAudioContext.play();
			}
		},
		prev(){
			if(this.playList.length==1){
				this.innerAudioContext.seek(0);
			}else{
				// if(this.playMode==playMode.loop){
				// 	this.innerAudioContext.seek(0);
				// 	//不管怎么样直接播放
				// 	this.setPlaying(true);
				// 	this.innerAudioContext.play();
				// 	return;
				// }
				if(this.playMode==playMode.random){
					if(this.indexHistory.length<=1){
						this.next();
					}else{
						this.indexHistory.pop();
						console.log(this.indexHistory);
						// this.setCurrentIndex(this.indexHistory[this.indexHistory.length-1]);
						this.setCurrentIndex(this.indexHistory.pop());
						// this.indexHistory.pop();
					}
					return;
				}
				let index=this.currentIndex-1;
				if(index<0){
					index=this.playList.length-1;
				}
				this.setCurrentIndex(index);
			}
		},
		next(){
			if(this.playList.length==1){
				this.innerAudioContext.seek(0);
				if (this.currentLyric) {
						// 跳到歌词第一个
						this.currentLyric.seek(0)
      		}
			}else{
				// if(this.playMode==playMode.loop){
				// 	this.innerAudioContext.seek(0);
				// 	//不管怎么样直接播放
				// 	this.setPlaying(true);
				// 	this.innerAudioContext.play();
				// 	return;
				// }
				if(this.playMode==playMode.random){
					var newIndex=getRandomIndex(this.currentIndex,this.playList.length);
					//console.log(newIndex);
					this.setCurrentIndex(newIndex);
					return;
				}
				let index=this.currentIndex+1;
				if(index>=this.playList.length){
					index=0;
				}
				this.setCurrentIndex(index);
			}
		},
		changeMode(){
			var mode=(this.playMode+1)%3;
			// console.log(mode)
			this.setPlayMode(mode);
		},
		onEnded(){
			if(this.playMode==playMode.loop){
					this.innerAudioContext.seek(0);
					if (this.currentLyric) {
						// 跳到歌词第一个
						this.currentLyric.seek(0)
      		}
					//不管怎么样直接播放
					this.setPlaying(true);
					this.innerAudioContext.play();
					return;
			}
			if(this.playList.length==1){
				this.currentTime=0;
				this.innerAudioContext.stop();
				this.setPlaying(false);
			}
			this.next();
		},
		updateTime() {
			if(!this.isMoving){
				this.currentTime = this.innerAudioContext.currentTime;	
			}	
		},
		canPlay(){
			clearInterval(this.getDurtimer);
			this.getDurtimer=setInterval(function(){
				if(this.innerAudioContext.duration!=0){
					this.duration=this.innerAudioContext.duration;
					clearInterval(this.getDurtimer);
				}
			}.bind(this),50)
		},
		format(e){
			return 'sa';
		},
		onProgressBarChange(percent){
			this.innerAudioContext.seek(percent*this.duration);
			if (this.currentLyric) {
        // 鼠标点击 Progressbar 歌词跳到指定位置
        this.currentLyric.seek(this.currentTime * 1000)
      }
			if(!this.playing){
				this.togglePlay();
			}
			this.isMoving=false;
		},
		onProgressMoveChange(percent){
			this.isMoving=true;
			this.currentTime=percent*this.duration;
		},
		getLyric(){
			this.currentSong.getLyric().then(res=>{
				this.currentLyric=new Lyric(res,this.handleLyric);
				if (this.playing) {
          this.currentLyric.play()
        }
				console.log(this.currentLyric);
			})
		},
		// 歌词改变的回调函数
    handleLyric({ lineNum, txt }) {
			// console.log(lineNum);
      this.currentLineNum = lineNum;
      // 歌词滚动
      if (lineNum >4) {
        // 当滚动歌词超过5行时，歌词头部移动到当前歌词的上面5个，来保证当前播放的歌词在中央
        // let lineEl = this.$refs.lyricLine[lineNum - 5]
				// this.$refs.lyricList.scrollToElement(lineEl, 1000)
				this.lyricScrollId='lyricLine'+(lineNum-4);
      } else {
        // 当歌词行数小于 5 行，每次调动回到当前位置
				// this.$refs.lyricList.scrollTo(0, 0, 1000)
				this.lyricScrollId='lyricLine0';
      }
      // 显示当前正在播放的歌词
      this.playingLyric = txt
    },
		middleTouchStart(e){
			// console.log(e);
			this.touch.initiated = true;
			this.touch.startX=e.clientX;
			this.touch.startY=e.clientY;
			this.touch.percent=0;
		},
		middleTouchMove(e){
			// console.log(e);
			if(!this.touch.initiated){
				return;
			}
			var deltaX=e.clientX-this.touch.startX;
			var deltaY=e.clientY-this.touch.startY;
			if(Math.abs(deltaY)+20>Math.abs(deltaX)){
				console.log('上下');
				return;
			}
			// console.log('deltaX:'+deltaX);
			var innerWidth=this.innerWidth;
			// console.log(innerWidth);
			const left = this.currentShow === 'cd' ? 0 : -innerWidth;
			var offsetWidth=Math.max(-innerWidth,left+deltaX);
			console.log('offsetWidth'+(left+deltaX));
			offsetWidth=Math.min(0,offsetWidth);
			console.log(offsetWidth);
			this.touch.percent = Math.abs(offsetWidth / innerWidth);
			this.transitionTime=0;
			this.middleLOpacity=1-this.touch.percent;
			this.lyricOffsetLeft=offsetWidth;
		},
		middleTouchEnd(e){
			// console.log(e);
			var innerWidth=this.innerWidth;
			var offsetwidth=0;
      var opacity=1;
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetwidth = -innerWidth;
          this.currentShow = 'lyric';
          opacity = 0
        } else {
          offsetwidth = 0;
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9&&this.touch.percent>0) {
          offsetwidth = 0;
          opacity = 1;
          this.currentShow = 'cd';
        } else {
          offsetwidth = -innerWidth;
          opacity = 0;
        }
			}
			this.lyricOffsetLeft=offsetwidth;
			this.transitionTime=0.3;
			this.middleLOpacity=opacity;
			this.touch.initiated=false;
		},
		showPlayList(){
			this.$refs.playlist.show();
		},
		toggleFavorite() {
      if (this.isFavoriteSong(this.currentSong)) {
        this.deleteFavoriteList(this.currentSong)
      } else {
        this.saveFavoriteList(this.currentSong)
      }
		},
		// 判断是否是最喜欢的歌曲
    isFavoriteSong(song) {
      let index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1
    },
	},
	watch:{
		currentSong(currentSong,oldSong){
			console.log(currentSong);
			if(this.playList.length==0){
				this.innerAudioContext.stop();
				return;
			}
			if(!currentSong.id||currentSong.id==oldSong.id){
				return;
			}
			if (this.currentLyric) {
        // 避免产生多个定时器
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLyric = null
        this.currentLineNum = 0
      }
				this.indexHistory.push(this.currentIndex);
				// console.log(this.indexHistory);
				this.getLyric();
				// this.oldIndex=this.currentIndex;
				// this.animationRotate='';
				// this.rotateDeg=0;
				var reg=/300x300/;
				this.normalImgUrl=currentSong.imgurl.replace(reg,'500x500')||'';
				// console.log(currentSong);
				// console.log(this.currentSong);
				// console.log(reg.test(currentSong.imgurl));
				// console.log(currentSong.imgurl);
				getSongUrl(currentSong.mid).then((res)=>{
					if(res.code===ERR_OK){
						let data=res.data.items[0];
						let url="http://dl.stream.qqmusic.qq.com/"+data.filename+"?vkey="+data.vkey+'&guid=3571791149&uin=0&fromtag=66';
						// this.$refs.audio.src=url;
						// this.audioSrc=url;
						this.innerAudioContext.src=url;
						console.log(this.innerAudioContext.duration);
						this.setPlaying(true);
						this.savePlayHistory(this.currentSong);
						// this.audioCtx.load();
						// this.audioCtx.play();
						// console.log(this.audioSrc);
						
						clearInterval(this.rotateTimer);
						
						// this.animation.rotate(0).step();
		 				// this.animationRotate=this.animation.export();
						var n=0;
						this.rotateTimer=setInterval(function(){
							if(this.playing){
								this.animation.rotate(n).step();
								this.animationRotate=this.animation.export();
								n=n+0.25;
								// console.log(n);
							}
								// n=(n+1)%360;
							}.bind(this),50);
					}
			})
		}
	}
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
// @import "~common/stylus/animation"	
.player
	.normal-player
		position:fixed
		left:0
		right:0
		top:0
		bottom:0
		z-index:150
		background:$color-background
		.background
			position:absolute
			left:0
			top:0
			width:100%
			height:100%
			z-index:-1
			opacity:0.6
			filter: blur(20px)
		.top
			position:relative
			margin-bottom: 25px
			.back
				position:absolute
				top:0
				left:6px
				z-index:50
				.icon-back
					display:block
					padding:9px
					font-size:$font-size-large-x
					color:$color-theme
					transform:rotate(-90deg)
			.title
				width:70%
				margin:0 auto
				line-height:40px
				text-align:center
				no-wrap()
				font-size:$font-size-large
				color:$color-text
			.subtitle
				line-height:20px
				text-align:center
				font-size:$font-size-medium
				color:$color-text
		.middle
			position:fixed
			width:100%
			top:80px
			bottom:170px
			white-space:nowrap
			font-size:0
			.middle-l
				display:inline-block
				vertical-align:center
				position:relative
				width:100%
				height:0
				padding-top:80%
				.cd-wrapper
					position:absolute
					left:10%
					top:0
					width:80%
					height:100%
					.cd
						width:100%
						height:100%
						box-sizing:border-box
						border: 10px solid rgba(255, 255, 255, 0.1)
						border-radius: 50%
						.image
							position:absolute
							left:0
							top:0
							width:100%
							height:100%
							border-radius:50%
							animation rotate 8s linear infinite
				.playing-lyric-wrapper
					width 80%
					margin 30px auto 0 auto
					overflow hidden
					text-align center
					.playing-lyric
						height 20px
						line-height 20px
						font-size $font-size-medium
						color $color-text-l
			.middle-r
				display inline-block
				vertical-align top
				width 100%
				height 100%
				overflow hidden
				.lyric-wrapper
					width 80%
					margin 0 auto
					overflow hidden
					text-align center
					.text
						line-height 32px
						color $color-text-l
						font-size $font-size-medium
						&.current
							color $color-text
		.bottom
			position:absolute
			bottom:50px
			width:100%
			.dot-wrapper
				text-align:center
				font-size:0
				.dot
					display:inline-block
					vertical-align:middle
					margin:0 4px
					width:8px
					height:8px
					border-radius:50%
					background:$color-text-l
					&.active
						width:20px
						border-radius:5px
						background:$color-text-ll
			.progress-wrapper
				display:flex
				align-items:center
				width:80%
				margin:0 auto
				padding:10px 0
				.time
					color:$color-text
					font-size:$font-size-small
					flex:0 0 30px
					line-height:30px
					width:30px
					&.time-l
						text-align:left
						transform:translateX(-5px)
					&.time-r
						text-align:right
				.progress-bar-wrapper
					flex:1
			.operators
				display:flex
				align-items:center
				.icon
					flex:1
					color:$color-theme
					&.disable
						color:$color-theme-d
					i
						font-size:30px
				.i-left
					text-align: right
				.i-center
					padding:0 20px
					text-align:center
				.i-right
					text-align:left
				.icon-favorite
					color:$color-sub-theme
		&.normal-enter-active, &.normal-leave-active
			transition: all 0.4s
			.top, .bottom
				transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
		&.normal-enter, &.normal-leave-to
			opacity: 0
			.top
				transform: translate3d(0, -100px, 0)
			.bottom
				transform: translate3d(0, 100px, 0)
	.mini-player
		display:flex
		align-items: center
		position: fixed
		left: 0
		bottom: 0
		z-index: 180
		width: 100%
		height: 60px
		background: $color-highlight-background
		&.mini-enter-active, &.mini-leave-active
			transition: all 0.4s
		&.mini-enter, &.mini-leave-to
			opacity: 0
		.icon
			flex: 0 0 40px
			width: 40px
			padding: 0 10px 0 20px
			img
				border-radius: 50%
				&.play
					animation: rotate 10s linear infinite
				&.pause
					animation-play-state: paused
		.text
			display: flex
			flex-direction: column
			justify-content: center
			flex: 1
			line-height: 20px
			overflow: hidden
			.name
				margin-bottom: 2px
				no-wrap()
				font-size: $font-size-medium
				color: $color-text
			.desc
				no-wrap()
				font-size: $font-size-small
				color: $color-text-d
		.control
			flex: 0 0 30px
			width: 30px
			padding: 0 10px
			.icon-play-mini, .icon-pause-mini, .icon-playlist
				font-size: 30px
				color: $color-theme-d
			.icon-mini
				font-size: 37px
				position: absolute
				left: 0
				top: 1px
</style>