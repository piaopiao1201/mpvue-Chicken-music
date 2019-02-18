<template>
	<scroll-view class="suggest" ref="suggest" :scroll-y="true" @scrolltolower="searchMore">
    <ul class="suggest-list">
      <!-- 在这里解决异步问题 result.concat(Lresult) -->
      <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="item.type === TYPE_SINGER?'icon-mine':'icon-music'"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.type === TYPE_SINGER?item.singername:(item.name+'-'+item.singer)"></p>
        </div>
      </li>
      <!-- <loading v-show="hasMore"></loading> -->
    </ul>
		<div class="loadingWrap">
			<div v-show="hasMore">
				<mpLoading :loadingMsg="loadingMsg"></mpLoading>
			</div>	
		</div>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll-view>
</template>

<script>
import {search} from 'api/search';
import { ERR_OK } from 'api/config';
import {getSinger,getSong} from 'common/js/song';
import mpLoading from '@/base/mpLoading/loading'
import {mapMutations,mapActions} from 'vuex';
import Singer from 'common/js/singer'
const TYPE_SINGER = 'singer';
const PERPAGE = 20;
export default {
	data() {
    return {
      page: 1,
      result: [],
      Lresult: [], // 避免因异步造成的数组为空清空
      pullup: true, // 需要上拉刷新
      hasMore: true, // 可以加载更多
			beforeScroll: true,
			TYPE_SINGER:'singer'
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },

	components: {
		mpLoading
	},

	computed: {},


	methods: {
		...mapMutations({
			setSinger:'SET_SINGER'
		}),
		...mapActions({
			insertSong:'insertSong'
		}),
		search(){
			this.hasMore=true;
			this.page=1;
			search(this.query,this.page,this.showSinger,PERPAGE).then(res=>{
				if(res.code==ERR_OK){
					let ret=[];
					if(res.data.zhida&&res.data.zhida.singerid){
						ret.push({...res.data.zhida,...{type:TYPE_SINGER}})
					}
					if(res.data.song){
						res.data.song.list.forEach(item => {
							// item.singer=getSinger(item.singer);
							ret.push(getSong(item));
							// ret.push(getSong(item));
							
						});
						// ret=ret.concat(res.data.song.list);
						this.checkMore(res.data.song);
					}
					this.result=ret;
					console.log(this.result);
				}
			})
		},
		checkMore(song){
			if(!song.list.length||song.curpage*PERPAGE+song.curnum>=song.totalnum){
				this.hasMore=false;
			}
		},
		getDisplayName(item){
			if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
				return item.name+'-'+getSinger(item.singer);
        // return `${item.name}-${item.singer}`
      }
		},
		searchMore(){
			if(!this.hasMore){
				return;
			}
			this.page++;
			search(this.query,this.page,this.showSinger,PERPAGE).then(res=>{
				if(res.code==ERR_OK){
					let ret=[];
					// if(res.data.zhida&&res.data.zhida.singerid){
					// 	ret.push({...res.data.zhida,...{type:TYPE_SINGER}})
					// }
					if(res.data.song){
						res.data.song.list.forEach(item => {
							// item.singer=getSinger(item.singer);
							ret.push(getSong(item));
							// ret.push(getSong(item));
							
						});
						// ret=ret.concat(res.data.song.list);
						this.checkMore(res.data.song);
					}
					this.result=this.result.concat(ret);
					console.log(this.result);
				}
			})
		},
		selectItem(item){
			if(item.type==TYPE_SINGER){
				// console.log(item);
				this.setSinger(new Singer(item.singermid,item.singername));
				this.$emit('selectSinger');
			}else{
				this.insertSong(item);
			}
			this.$emit('select');
		},
		// handleTouchStart(){
		// 	console.log(2);
		// }
	},
	watch: {
    query() {
      this.search();
    },
    // Lresult(newValue) {
    //   let newV = newValue[newValue.length - 1]
    //   if (newV) {
    //     this.result.push(newV)
    //   }
    // }
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^='icon-']
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>