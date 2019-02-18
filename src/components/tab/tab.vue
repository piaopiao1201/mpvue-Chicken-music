<template>
	<div class="tab">
    <div :class="index==currentIndex?'tab-item router-link-active':'tab-item'" v-for="(item,index) in tabList" :key="index">
      <span class="tab-link" :data-current="index" @tap="handleTap">{{item}}</span>
    </div>
    <!-- <slider></slider> -->
    <!-- <test></test> -->
		<!-- <a class='tab-item' to='/recommend'>
			<span class="tab-link">推荐</span>
		<a>
    <router-link tag='div' class='tab-item' to='/recommend'>
			<span class="tab-link">推荐</span>
		</router-link>
		<router-link tag='div' class='tab-item' to='/singer'>
			<span class="tab-link">歌手</span>
		</router-link>
		<router-link tag='div' class='tab-item' to='/rank'>
			<span class="tab-link">排行</span>
		</router-link>
		<router-link tag='div' class='tab-item' to='/search'>
			<span class="tab-link">搜索</span>
		</router-link> -->
	</div>
</template>

<script>
// import slider from '@/base/slider/slider';
import test from '@/base/test/test';
  export default{
    data(){
      return {
        
      }
	  },
    mounted (){
      console.log(this.tabList);
    },
    props: {
      tabList:{
        type:Array,
        default:null
			},
			currentIndex:{
				type:Number,
				default:0
			}
    },
    methods: {
      handleTap(e){
        this.currentIndex=e.mp.target.dataset.current;
        this.$emit('tapChange',this.currentIndex);
      }
    },
    components: {
      // slider:slider,
      test:test
		},
		watch: {
			// faIndex(newIndex){
			// 	console.log('值改变了');
			// 	this.currentIndex=newIndex;
			// }
		}
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/variable"
.tab
  display:flex
  height:44px
  line-height:44px
  font-size:$font-size-medium
  >.tab-item
    flex:1
    text-align:center
    .tab-link
      color:$color-text-l
      padding-bottom:5px
      cursor:pointer
    &.router-link-active
      .tab-link
        color:$color-theme
        border-bottom:1px solid $color-theme
</style>
