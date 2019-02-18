<template>
	<div class="search">
		<div class="search-box-wrapper">
			<searchBox ref="searchBox" @query="handleQuery"></searchBox>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query" @touchstart="handleTouchStart">
			<div class="searchListFixed">
				<scroll-view ref="shortcut" class="shortcut" :scroll-y="true" style="height:100%">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" v-for="(item, index) in hotKey" :key="index" class="item">{{item.k}}</li>
            </ul>
          </div>
					<div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="deleteAll">
                <i class="icon-clear"></i>
              </span>
            </h1>
						<search-list @select="addQuery" @delete="deleteOne" :searches="searchHistory"></search-list>
							<!-- <scroll-view :scroll-y="true" style="height:100%">
								<search-list @select="addQuery" @delete="deleteOne" :searches="searchHistory"></search-list>
							</scroll-view> -->
					</div>
            
          </scroll-view>
      </div>
			</div>
		<!-- </div> -->
		<div ref="searchResult" class="search-result" v-show="query" @touchstart="handleTouchStart">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query" @selectSinger="handleSelectSinger"></suggest>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
import searchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import suggest from '@/components/suggest/suggest'
import {mapActions,mapGetters} from 'vuex'
import SearchList from 'base/search-list/search-list'
export default {
	data(){
		return {
			hotKey:[],
			query:''
		}
	},
	mounted () {
		getHotKey().then(res=>{
			if(res.code==ERR_OK){
				// console.log(res);
				// console.log(res.data);
				this.hotKey=res.data.hotkey.slice(0,10);
			}
			
		})
	},
	computed: {
		...mapGetters([
				"searchHistory"
			]),
	},
	methods: {
		...mapActions({
			saveSearchHistory:'saveSearchHistory',
			deleteSearchHistory:'deleteSearchHistory',
			clearSearchHistory:'clearSearchHistory'
		}),
		addQuery(query){
			this.$refs.searchBox.setQuery(query);
		},
		handleQuery(newQuery){
			this.query=newQuery;
		},
		handleSelectSinger(){
			this.$emit('selectSinger');
		},
		handleTouchStart(){
			console.log('touch');
			this.$refs.searchBox.blur();
		},
		saveSearch(){
			this.saveSearchHistory(this.query);
		},
		deleteOne(query){
			this.deleteSearchHistory(query);
		},
		deleteAll(){
			var that=this;
			wx.showModal({
				title: '提示',
				content: '是否清空所有搜索历史',
				confirmText:'清空',
				success(res) {
					if (res.confirm) {
						that.clearSearchHistory();
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
			
		}
	},
	components: {
		searchBox,
		suggest,
		SearchList
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search
  touch-action none
	.search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position fixed
    top 178px
    bottom 0
    width 100%
		.searchListFixed
			position fixed
			top:170px
			bottom 0
			width:100%
		.shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 20px 20px
        .title
          margin-bottom 20px
          font-size $font-size-medium
          color $color-text-l
        .item
          display inline-block
          padding 5px 10px
          margin 0 20px 10px 0
          border-radius 6px
          background $color-highlight-background
          font-size $font-size-medium
          color $color-text-d
      .search-history
        position relative
        margin 0 20px
        .title
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
				
  .search-result
    position fixed
    width 100%
    top 178px
    bottom 0
</style>