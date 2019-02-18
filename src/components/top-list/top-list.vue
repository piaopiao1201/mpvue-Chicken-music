<template>
  <div class="fixed" :animation="animationLsi" @transitionend="handleAnimation" :data-state="enterState">
    <musicList :singerTitle="title" :bgImage="bgImage" :songs="songs" :rank="rank" @back="back"></musicList>
  </div>
</template>

<script tpye="text/ecmascript-6">
import musicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import {getSong} from 'common/js/song'
// import { createSong } from 'common/js/song'
// import { getMusicSource } from 'api/song'

export default {
  data() {
    return {
      songs: [],
			rank: true,
			animationLsi:"",
			enterState:true,
			enterFlag:false
    }
  },
  components: {
    musicList
  },
  computed: {
		...mapGetters([
			'toplist'
		]),
    title() {
			console.log(this.toplist.topTitle);
			return this.toplist.topTitle;
			
    },
    bgImage() {
      if (this.songs.length>0) {
				return this.songs[0].imgurl;
			}
			return '';
    },
    
  },
  created() {
		this.windowWidth=wx.getSystemInfoSync().windowWidth;
		console.log(this.animationLsi);
    // this._getMusicList()
	},
	mounted(){
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
			getMusicList(this.toplist.id).then(res => {
        if (res.code === ERR_OK) {
					this.songs=[];
					res.songlist.forEach((key,index)=>{
						this.songs.push(getSong(key.data));
					})
          // this.songs = this._normalizeSongs(res.songlist)
        }
    	})
	},
  methods: {
    _getMusicList() {
      // if (!this.toplist.id) {
      //   this.$router.push('/rank')
      //   return
      // }
      // getMusicList(this.toplist.id).then(res => {
      //   if (res.code === ERR_OK) {
      //     this.songs = this._normalizeSongs(res.songlist)
      //   }
      // })
		},
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
    _normalizeSongs(list) {
      let ret = []

      list.forEach(item => {
        let musicData = item.data
        if (musicData.songid && musicData.albumid) {
          getMusicSource(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              const songVkey = res.data.items[0].vkey
              ret.push(createSong(musicData, songVkey))
            }
          })
        }
      })

      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
