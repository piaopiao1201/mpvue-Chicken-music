<template>
	<div class='singer-detail'>
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title">{{singerTitle}}</h1>
		<div class="bg-image" :style="bgstyle" ref='bgImage'>
			<div class="filter"></div>
		</div>
		<!-- <div>
			<img :src="bgImage" alt="">
		</div> -->
		<div class="play-wrapper" ref='playWrapper'>
			<div ref="playBtn" class="play" @click="random">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
		</div>
		<div class="list">
			<scroll-view :scroll-y="true" style="height: 100%;" @scrolltolower="loadMore" :data-page="pageIndex">
				<songList :songs="songs" @select="onSelect" :rank="rank"></songList>
				<div v-show="loading" class="loadingWrap" :class="{bottomMargin:playList.length>0}" :style="loadStyle">
					<mpLoading></mpLoading>
				</div>
			</scroll-view>
		</div>
		
		<!-- <div class="bg-layer" ref='bgLayer'> -->
		<!-- <div class="fixed-bg"> -->
			<!-- <scroll class='list' ref='list' :probeType="probeType" :listenScroll="listenScroll" @scroll='onScroll'>
				<song-list :songs="songs" ref='songList' @select="onSelect"></song-list>
				<div class="loading-container" v-show='!songs.length'>
					<loading></loading>
				</div>
			</scroll> -->
		<!-- </div> -->
		<!-- </div> -->
	</div>
</template>

<script>
import songList from '@/base/song-list/song-list';
import mpLoading from 'base/mpLoading/loading'
import {mapActions,mapGetters} from 'vuex';
export default {
	data () {
		return {
			loading:true,
			isTransform:false
			// singerTitle:'啊飒飒'
		};
	},
	props:{
			songs:{
				type:Array,
				default:[]
			},
			bgImage:{
				type:String,
				default:''
			},
			singerTitle:{
				type:String,
				default:''
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
	components: {
		songList:songList,
		mpLoading
	},

	computed: {
		bgstyle(){
				return 'background-image:url('+this.bgImage+')';
			},
		...mapGetters([
				'playList'
		]),
		loadStyle(){
			return this.isTransform?'transform:translateY(0px)':'';
		}
	},

	// mounted: {},

	methods: {
		...mapActions({
			selectPlay:'selectPlay',
			randomPlay:'randomPlay'
		}),
		onSelect(item,index){
			this.selectPlay({
				list:this.songs,
				index:index
			})
		},
		random(){
			this.randomPlay(this.songs);
		},
		back(){
			// console.log(1);
			this.$emit('back');
		},
		setLoading(flag){
			this.loading=flag;
		},
		setTransform(flag){
			this.isTransform=flag;
		},
		getLoading(){
			return this.loading;
		},
		loadMore(){
			this.$emit('loadMore');
		}
	}
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.singer-detail
	//position:fixed;
	position:relative;
	width:100%;
	height:100%;
	top:0;
	z-index:100;
	background:$color-background;
	.back
		position absolute
		top:0
		left: 6px
		z-index:50
		.icon-back
			display:block
			padding: 10px
			font-size: $font-size-large-x
			color: $color-theme
	.title
		position:absolute
		top:0
		left:10%
		width:80%
		z-index:40
		no-wrap()
		text-align:center
		line-height:40px
		font-size:$font-size-large
		color:$color-text
	.bg-image
		position:relative
		width:100%
		height:0
		padding-top:60%
		background-origin:padding-box
		background-repeat:no-repeat
		background-size:cover
		transform-origin:top
		.filter
			position:absolute
			top:0
			height:100%
			width:100%
			background:rgba(7,17,27,0.4)
	.play-wrapper
		position:absolute
		top:330rpx
		width:100%
		.play
			box-sizing:border-box
			width:135px
			padding:7px 0
			margin:0 auto
			text-align:center
			border:1px solid $color-theme
			color:$color-theme
			border-radius:100px
			font-size:0
			.icon-play
				display:inline-block
				vertical-align:middle
				margin-right:6px
				font-size:$font-size-medium-x
			.text
				display:inline-block
				vertical-align: middle
				font-size: $font-size-small
	.bg-layer
		position:fixed;
		height:100%;
		background:$color-background;
		top:0;
		width:100%;
		overflow:hidden
	.list
		position fixed;
		top:232px
		overflow hidden
		width 100%
		bottom 0
		.loadingWrap
			&.bottomMargin:last-child
				transform translateY(-70px)
				margin-bottom:70px
		// .list
		// 	position:absolute
		// 	top:0
		// 	width: 100%
		// 	background: $color-background
		// 	.loading-container
		// 		position: absolute
		// 		width: 100%
		// 		top: 50%
		// 		transform: translateY(-50%)
		// .fixed-bg
			// 	position:fixed
			// 	background:$color-background
			// 	top:35px
			// 	width:100%
			// 	height:100%
			// 	overflow:hidden
</style>