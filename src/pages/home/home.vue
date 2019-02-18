<template>
  <div class="container">
      <MHeader @selectMine="handleSelectMine"></MHeader>
      <!-- <div @tap="handleClick" data-current="0">飒飒</div>
      <div @click="handleClick" data-current="1">飒飒2</div> -->
      <tab :tabList="tablist" @tapChange="handleTapChange" :currentIndex="tabIndex"></tab>
      <div v-show="tabIndex==0">
        <recommend @selectDisc="handleSelectDisc"></recommend>
      </div>
      <singer v-if="tabIndex==1" @selectSinger="handleSelectSinger"></singer>
			<rank v-if="tabIndex==2" @selectRank="handleSelectRank"></rank>
			<search v-if="tabIndex==3" @selectSinger="handleSelectSinger"></search>
			<singerDetail v-if="sdFlag" @back="sdBack"></singerDetail>
			<player></player>
			<disc v-if="discFlag" @back="discBack"></disc>
			<topList v-if="rankFlag" @back="rankBack"></topList>
			<userCenter v-if="userFlag" @back="userBack"></userCenter>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import tab from '@/components/tab/tab'
import recommend from '@/components/recommend/recommend'
import singer from '@/components/singer/singer'
import singerDetail from '@/components/singer-detail/singer-detail'
import player from '@/components/player/player'
import disc from '@/components/disc/disc'
import rank from '@/components/rank/rank'
import topList from '@/components/top-list/top-list'
import search from '@/components/search/search'
import userCenter from '@/components/user-center/user-center'
export default {
  data () {
    return {
      tablist:['推荐','歌手','排行','搜索'],
			tabIndex:0,
			sdFlag:false,
			discFlag:false,
			rankFlag:false,
			userFlag:false
    };
  },
  
  // onLoad(option){
	// 	console.log(arguments);
	// 	var that=this;
	// 	this.sdFlag=true;
	// 	setTimeout(function(){
	// 		that.sdFlag=true;
	// 	},2000)
  // },
  computed: {},
  // mounted(){
	// 	console.log(wx.getStorageSync('user'));
	// 	var that=this;
	// 	// this.sdFlag=true;
	// 	setTimeout(function(){
	// 		that.sdFlag=true;
	// 	},1000)
		
  // },
  methods: {
    handleTapChange(currentIndex){
			this.tabIndex=currentIndex;
			console.log(this.tabIndex);
		},
		handleSelectSinger(){
			this.sdFlag=true;
		},
		sdBack(){
			this.sdFlag=false;
		},
		handleSelectDisc(){
			this.discFlag=true;
		},
		discBack(){
			this.discFlag=false;
		},
		handleSelectRank(){
			
			this.rankFlag=true;
			console.log(this.rankFlag);
		},
		rankBack(){
			this.rankFlag=false;
		},
		handleSelectMine(){
			this.userFlag=true;
		},
		userBack(){
			this.userFlag=false;
		}
  },
 
  components: {
    MHeader:MHeader,
    tab:tab,
    recommend:recommend,
		singer:singer,
		singerDetail:singerDetail,
		player:player,
		disc:disc,
		rank:rank,
		topList:topList,
		search:search,
		userCenter:userCenter
  }
}

</script>
<style lang="stylus">

</style>