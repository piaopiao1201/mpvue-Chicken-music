<template>
<div class="scroll-wrap">
	<div class="list-fixed-title" v-show='fixedTitleShow' ref='fixedTitle' :style="fixTopStyle">{{fixedTitle}}</div>
	<scroll-view :scroll-y="true" style="" @scroll="onScroll" class="listview" :scroll-top="scrollTop">
		
		
		<ul>
			<li v-for="(group,index1) in data" class='list-group' ref="groupItem" :key="index1" :class="{bottomMargin:playList.length>0}">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="(item,index) in group.arr" class='list-group-item' @click="selectItem(item)" :key="index">
						<!-- <img v-lazy="item.avatar" class='avatar'> -->
						<img :src="item.avatar" alt="" class='avatar'>
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortTouchStart" @touchmove.stop.prevent="onShortTouchMove" @touchend="onShortTouchEnd">
			<ul>
				<li v-for="(item,index) in shortCutlist" class='item' :data-index="index" :class="{current:anchorIndex==index}" :key="index">
					{{item}}
				</li>
			</ul>
		</div>
		
  </scroll-view>
	</div>
</template>

<script>
import {styles} from '@/common/js/dom.js'
// import { setTimeout } from 'timers';
import {mapGetters} from 'vuex'
var FIX_TITLE_HEIGHT=0;
export default {
	data () {
		return {
			//指示锚点的序号
			anchorIndex:0,
			scrollY:-1,
			diff:0,
			fixedTop:0,
			fixedTitleShow:true,
			scrollTop:0,
			tapFlag:false
		};
	},
	props:{
		data:{
			type:Array,
			default:null
		}
	},
	created () {
		// console.log(1);
		this.listGroupHeight=[];
		this.touch={};
	},
	components: {},

	computed: {
		...mapGetters([
			'playList'
		]),
		shortCutlist(){
			let arr=[];
			this.data.forEach((key,index)=>{
				arr.push(key.title.substr(0,1));
			})
			return arr;
		},
		fixedTitle(){
			// if(this.scrollY>0){
			// 	return '';
			// }
			return this.data[this.anchorIndex]?this.data[this.anchorIndex].title:'';
		},
		fixTopStyle(){
			return styles({
          top:this.fixedTop+'px'
			})
			
		}
	},

	methods: {
		onScroll(e){
			if(this.tapFlag){
				this.tapFlag=false;
				return;
			}
			var scrollTop=e.mp.detail.scrollTop;
			for(var i=0;i<this.listGroupHeight.length-1;i++){
				if(scrollTop>=this.listGroupHeight[i]&&scrollTop<this.listGroupHeight[i+1]){
					this.anchorIndex=i;
					this.diff=this.listGroupHeight[i+1]-scrollTop;
					break;
				}
			}
			// this.$emit('scroll',pos);
		},
		_calculateHeight(){
			let height=0;
			var query = wx.createSelectorQuery();
			var that=this;
			this.listGroupHeight.push(height);
			query.selectAll('.list-group').fields({
				// dataset: true,
      	size: true
			},function(res){
				for(var i=0;i<res.length;i++){
					height+=res[i].height;
					that.listGroupHeight.push(height);
				}
				console.log(that.listGroupHeight);
			}).exec()
			// let group=this.$refs.groupItem;
			// this.listGroupHeight.push(height);
			// for(var i=0;i<group.length;i++){
			// 	height+=group[i].clientHeight;
			// 	this.listGroupHeight.push(height);
			// }
			//console.log(this.listGroupHeight);
		},
		handleFixedTitle(){
			var that=this;
			var query = wx.createSelectorQuery();
			// query.select('.list-fixed-title').boundingClientRect(function(res){
			// 		console.log(res)
			// })
			query.select('.list-fixed-title').boundingClientRect(function(res){
						// console.log(res);
						FIX_TITLE_HEIGHT=res.height;
					}).exec();
			// query.select('.singer').boundingClientRect(function(res){
			// 	that.fixedTop=res.top;
			// 	// console.log(res);
			// }).exec()
		},
		onShortTouchStart(e){
			this.tapFlag=true;
			let target=e.target;
			console.log(target);
			//console.log(e);
			// let anchorIndex=domData(target,'index');
			this.anchorIndex=Number(target.dataset.index);
			// this.currentIndex=this.anchorIndex;
			this.touch.y1=e.touches[0].pageY;
			this.scrollTop=this.listGroupHeight[this.anchorIndex];
			
			// var query = wx.createSelectorQuery();
			// query.selectAll('.list-group').fields({
			// 	// dataset: true,
      // 	size: true
			// },function(res){
			// 	console.log(res);
			// }).exec();
			// this._scrollTo(this.currentIndex);
		},
		onShortTouchMove(e){
			console.log(e);
			// this.touch.y2=e.touches[0].pageY;
			// let delta=Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT);
			// this.currentIndex=this.anchorIndex+delta;
			// this.currentIndex=Math.min(this.currentIndex,this.$refs.groupItem.length-1);
			// this.currentIndex=Math.max(0,this.currentIndex);
			// this._scrollTo(this.currentIndex);
		},
		selectItem(item){
			this.$emit('select',item);
		}
	},
	watch:{
		data(){
			var that=this;
			setTimeout(function(){
				that._calculateHeight();
				that.handleFixedTitle()
			},50)
		},
		fixedTop(newTop){
			// if(newTop!=0){
			// 	this.fixedTitleShow=true;
			// 	var that=this;
			// 	//console.log('sasa');
			// 	setTimeout(function(){
			// 		var query = wx.createSelectorQuery();	
			// 		query.select('.list-fixed-title').boundingClientRect(function(res){
			// 			console.log(res);
			// 			FIX_TITLE_HEIGHT=res.height;
			// 		}).exec();
			// 		},20)
			// 	}
		},
		diff(newDiff){
			if(newDiff<FIX_TITLE_HEIGHT){
				this.fixedTop=newDiff-FIX_TITLE_HEIGHT;
				// console.log(this.fixedTop);
			}else{
				this.fixedTop=0;
			}
		}
	}
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.scroll-wrap
	position relative
	height:100%
	overflow hidden
	.list-fixed-title
			position:absolute;
			width:100%
			top:0;
			height:30px
			line-height:30px
			padding-left:20px
			font-size: $font-size-small
			color: $color-text-l
			background: $color-highlight-background
			z-index 10
	.listview
		position:relative;
		width:100%
		height:100%
		overflow:hidden
		background:$color-background
		.list-group
			padding-bottom:30px
			&.bottomMargin:last-child
				margin-bottom:50px
			.list-group-title
				height:30px
				line-height:30px
				padding-left:20px
				font-size: $font-size-small
				color: $color-text-l
				background: $color-highlight-background
			.list-group-item
				display: flex
				align-items: center
				padding: 20px 0 0 30px
				.avatar
					width: 50px
					height: 50px
					border-radius: 50%
				.name
					margin-left:20px
					color:$color-text-l
					font-size:$font-size-medium
		.list-shortcut
			position:fixed;
			z-index:30
			right:0
			top:52%
			transform:translateY(-50%)
			width:20px
			padding:20px 0
			border-radius:10px
			text-align:center
			background:$color-background-d
			font-family:
			Helvetica
			.item
				padding:4px
				line-height:1
				color:$color-text-l
				font-size:$font-size-small
				&.current
					color:$color-theme
		
</style>