<template>
	<div>
		<musicList :singerTitle="singerName" :bgImage="bgImageUrl" :songs="songList"></musicList>
		<!-- <div class="bb"></div> -->
		<!-- <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="" class="bImg"> -->
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerListDetail} from 'api/singer'
import {getSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import musicList from '@/components/music-list/music-list'
	export default {
		data(){
			return {
				songList:[]
			}
		},
		computed:{
			...mapGetters([
				"singer"
			]),
			singerName(){
				return this.singer.name;
			},
			bgImageUrl(){
				return this.singer.avatar;
			}
		},
		//mounted相当于created在Page页中
		mounted(){
			//console.log(this.singer.id);
			getSingerListDetail(this.singer.id).then((res)=>{
				if(res.code===ERR_OK){
					this.songList=[];
					res.data.list.forEach((key,index)=>{
						this.songList.push(getSong(key.musicData));
					})
					console.log(this.songList);
				}
			});
		},
		components:{
			musicList:musicList
		}
	}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.bb
	width 200px
	height 200px
	background:url("https://y.gtimg.cn/music/photo_new/T001R300x300M000003Nz2So3XXYek.jpg?max_age=2592000");
	background-size cover
	z-index 100
.bImg
	width 300px
	height 400px
</style>