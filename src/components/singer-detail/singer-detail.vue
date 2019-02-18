<template>
	<div class="fixed" :animation="animationLsi" @transitionend="handleAnimation" :data-state="enterState">
		<musicList ref="musicList" :singerTitle="singerName" :bgImage="bgImageUrl" :songs="songList" @back="back" @loadMore="handleLoadMore"></musicList>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerListDetail} from 'api/singer'
import {getSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import musicList from '@/components/music-list/music-list'
export default {
	data () {
		return {
			animationLsi:"",
			songList:[],
			enterState:true,
			enterFlag:false,
			pageIndex:1
		}
	},
	computed:{
			...mapGetters([
				"singer","playList"
			]),
			singerName(){
				return this.singer.name;
			},
			bgImageUrl(){
				return this.singer.avatar;
			}
		},
	created(){
		this.windowWidth=wx.getSystemInfoSync().windowWidth;
		console.log(this.animationLsi);
		// this.animation = wx.createAnimation({
    //    duration: 150,
		// 	 timingFunction:'linear',
		// 	//  delay:200
		// });
		// this.animation.translateX(this.windowWidth).step();
		// this.animationLsi=this.animation.export();
	},
	mounted(){
		// console.log(this.enterFlag);
		// this.enterFlag=true;
		// console.log(this.enterFlag);
		var animation = wx.createAnimation({
       duration: 150,
			 timingFunction:'linear',
			//  delay:200
     });
		 this.animation=animation;
		 animation.translateX(this.windowWidth).step();
		 console.log(this.windowWidth);
		 this.animationLsi=animation.export();
		 
		 setTimeout(function(){
				animation.translateX(0).step();
		 		this.animationLsi=animation.export();
		 }.bind(this),50)
		 this.$refs.musicList.setLoading(true);
		 if(this.playList.length>0){
			 this.$refs.musicList.setTransform(true);
		 }
		 console.log(this.$refs.musicList.getLoading());
			getSingerListDetail(this.singer.id,this.pageIndex).then((res)=>{
				if(res.code===ERR_OK){
					this.songList=[];
					res.data.list.forEach((key,index)=>{
						this.songList.push(getSong(key.musicData));
					})
					if(this.playList.length>0){
			 			this.$refs.musicList.setTransform(false);
		 			}
					console.log(this.songList);
				}
			});
	},

	methods: {
		back(){
		// 	var animation = wx.createAnimation({
    //    duration: 150,
		// 	 timingFunction:'linear',
		// 	//  delay:200
    //  });
			this.animation.translateX(this.windowWidth).step();
		 	this.animationLsi=this.animation.export();
			
		},
		handleAnimation(e){
			
				console.log(e);
				if(e.currentTarget.dataset.state){
					this.enterState=false;
				}else{
					this.animationLsi='';
					this.$emit('back');
				}
			
		},
		handleLoadMore(){
			if(this.pageIndex<3){
				this.$refs.musicList.setLoading(true);
				getSingerListDetail(this.singer.id,++this.pageIndex).then((res)=>{
				if(res.code===ERR_OK){
					var tempArr=[];
					res.data.list.forEach((key,index)=>{
						tempArr.push(getSong(key.musicData));
						// this.songList.push(getSong(key.musicData));
					})
					this.songList=this.songList.concat(tempArr);
					if(this.pageIndex>=3){
						this.$refs.musicList.setLoading(false);
					}	
					console.log(this.songList);
				}
			});
			}
			
		}
	},
	components:{
			musicList:musicList
	},
	// onReady() {
	// 	console.log('as');
  //   this.animationLsi='';
  // },
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
// .slide-enter-active,.slide-leave-active
// 	transition: all .3s;
// .slide-enter,.slide-leave-to
// 	transform:translateX(100%)

.fixed
	position fixed
	width 100%
	height 100%
	top:0
	background:$color-background;
	z-index 10
	// transform translateX(12px)
	// transition 1s
</style>