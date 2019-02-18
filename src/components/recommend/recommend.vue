<template>
  <div class='recommend'>
      <scroll-view ref='scroll' :scroll-y="true" style="height: 100%;" @scrolltolower="loadMore" :data-page="pageIndex">
        <!-- <div> -->
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <!-- <slider>
              <div v-for="(items,index) in recommends" :key="index">
                <a :href="items.linkUrl">
                  <img :src="items.picUrl" @load="loadImage" class='needsclick'>
                  
                </a>
              </div>
            </slider> -->
            <!-- <swiper class="swiper" indicator-dots="true" autoplay="false">
              <block v-for="(item, index) in recommends" :index="index" :key="index">
                <swiper-item>
                  <a :href="item.linkUrl">
                    <image :src="item.picUrl" class="slide-image" mode="widthFix"/>
                  </a>
                </swiper-item>
              </block>
            </swiper> -->
						<swiperImage :dataList="recommends"></swiperImage>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li @click="selectItem(item)" v-for="(item,index) in discList" class='item' :key="index">
                <div class="icon">
                  <!-- <img v-lazy="item.imgurl" width='60' height='60'> -->
									<img :src="item.imgurl" width='60px' height='60px' class="discListImage">
                </div>
                <div class="text">
                  <h2 class='name' v-text="item.creator.name"></h2>
                  <p class='desc' v-text='item.dissname'></p>
                </div>
              </li>
            </ul>
          </div>
					<div class="loadingWrap" :class="{bottomMargin:playList.length>0}">
						<div v-show="loading">
							<mpLoading :loadingMsg="loadingMsg"></mpLoading>
						</div>	
					</div>
        <!-- </div> -->
      </scroll-view>
			
  </div>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import test from '@/base/test/test'
import swiperImage from '@/base/swiperImage/swiperImage'
import mpLoading from '@/base/mpLoading/loading'
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
// import { setTimeout } from 'timers';
import {mapMutations,mapGetters} from 'vuex';
export default {
  data(){
			return {
				recommends: [],
				discList: [],
				pageIndex:1,
				loading:true,
				loadingMsg:'加载中',
				time:0,
				loadFlag:true
			}
	},
  created() {
		console.log(1);
      this._getRecommend();
      // axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg').then(res=>{
      //   console.log(res);
			// })
			var that=this;
			setTimeout(()=>{
				that._getDiscList();
			},500)
	},
	computed: {
		...mapGetters([
				'playList'
		]),
	},
  // mounted(){
  //   console.log(this.$refs.sliderWrapper);
  // },
  components: {
    scroll:scroll,
		test:test,
		swiperImage:swiperImage,
		mpLoading:mpLoading
  },
  methods: {
			...mapMutations({
					setDisc:'SET_DISC',
					// setPlaying:'SET_PLAYING_STATE',
					// setCurrentIndex:'SET_CURRENT_INDEX',
					// setPlayMode:'SET_PLAY_MODE'
			}),
			_getRecommend() {
				getRecommend().then((res) => {
          //console.log(res);
					if (res.code === ERR_OK) {
						for(let i=0; i<res.data.slider.length; i++){
							this.recommends.push(res.data.slider[i]);
						}
          }
          //console.log(this.recommends);
				})
			},
			_getDiscList() {
				// const url='api/getDiscList';
				getDiscList(1).then((res) => {
					for(let i=0; i<res.data.list.length; i++){
							this.discList.push(res.data.list[i]);
						}
					this.loading=false;
					console.log(res);
				},(err)=>{
					console.log(err);
				})

			},
			loadImage(){
				if(!this.checkLoad){
					this.$refs.scroll.refresh();
					this.checkLoad=true;
				}
			},
			loadMore(e){
				if(this.loadFlag){
					this.loadFlag=false;
					console.log(e);
					var that=this;
					this.loading=true;
						setTimeout(function(){
							getDiscList(++that.pageIndex).then((res) => {
								for(let i=0; i<res.data.list.length; i++){
										that.discList.push(res.data.list[i]);
									}
								that.loading=false;
								that.loadFlag=true;
							},(err)=>{
								console.log(err);
							})
						},600)
				}
				
			},
			selectItem(item){
				this.setDisc(item);
				this.$emit('selectDisc');
			}
		},
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/variable"
.recommend
  position:fixed
  width: 100%
  top:88px
  bottom:0
	// .recommend-content
	// 	height:100%
	// 	overflow: hidden
		.slider-wrapper
			position:relative
			width:100%
			overflow:hidden
		.recommend-list
			.list-title
				height:65px
				line-height:65px
				text-align:center
				font-size:$font-size-medium
				color:$color-theme
			.item
				display:flex
				box-sizing:box-sizing
				align-item: center
				padding: 0 20px 20px 20px
				.icon
					flex: 0 0 60px;
					width:60px;
					padding-right:20px;
					.discListImage
						width:60px;
						height:60px;
				.text
					display:flex;
					flex-direction:column;
					justify-content:center;
					flex:1;
					line-height:20px;
					font-size:$font-size-medium;
					overflow:hidden;
					.name
						margin-bottom:10px;
						color:$color-text;
					.desc
						color:$color-text-d;
		.loadingWrap
			// width 100%
			// height 110rpx
			&.bottomMargin:last-child
				margin-bottom:70px
		// .loading-container
		// 	position:absolute;
		// 	width:100%;
		// 	top:50%;
		// 	transform:translateY(-50%);
</style>