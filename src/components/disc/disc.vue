<template>
	<div class="fixed" :animation="animationLsi" @transitionend="handleAnimation" :data-state="enterState">
		<musicList :singerTitle="discTitle" :bgImage="bgImage" :songs="songList" @back="back"></musicList>
	</div>
</template>

<script>
import {getSongList} from 'api/recommend'
import {getSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import musicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
export default {
	data () {
		return {
			animationLsi:"",
			songList:[],
			enterState:true,
			enterFlag:false
		}
	},
	computed:{
			...mapGetters([
				"disc"
			]),
			discTitle() {
      	return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			// singerName(){
			// 	return this.singer.name;
			// },
			// bgImageUrl(){
			// 	return this.singer.avatar;
			// }
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
     
			getSongList(this.disc.dissid).then((res)=>{
				if(res.code===ERR_OK){
					this.songList=[];
					
					res.cdlist[0].songlist.forEach((key,index)=>{
						this.songList.push(getSong(key));
					})
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