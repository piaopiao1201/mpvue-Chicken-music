<template>
	<div class="song-list">
		<ul>
			<li class='item' v-for="(item,index) in songs" @click="selectItem(item,index)" :class="{bottomMargin:playList.length>0}" :key="index">
				<div class="rank" v-show="rank">
          <span :class="index<=2?'icon icon'+index:'text'">{{index>2?index + 1:''}}</span>
        </div>
				<div class="content">
					<h2 class="name">{{item.name}}</h2>
					<!-- <p class="desc">{{item.singer+'·'+item.album}}</p> -->
					<p class="desc">{{item.singer+'·'+item.album}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type='text/ecmascript-6'>
	import {mapGetters} from 'vuex'
	export default {
		props:{
			songs:{
				type:Array,
				default:[]
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			...mapGetters([
				'playList'
			]),
			// getDesc(sa){
			// 	console.log(sa);
			// 	return 'sas';
			// }
		},
		methods:{
			// getDesc(song){
			// 	console.log(song.singer+'·'+song.album);
			// 	return song.singer+'·'+song.album
			// },
			selectItem(item,index){
				console.log(item);
				this.$emit('select',item,index);
			},
			getRankCls(index) {
				if (index <= 2) {
					return `icon icon${index}`
				} else {
					return `text`
				}
			},
			getRankText(index) {
				if (index >= 2) {
					console.log(index+1);
					return index + 1
				}
    	}
		}
	}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.song-list
	padding: 8px 26px 6px 26px
	.item
		display:flex
		align-items:center
		box-sizing:border-box
		height:55px
		font-size:$font-size-medium
		.rank
			flex 0 0 25px
			width 25px
			margin-right 30px
			text-align center
			.icon
				display inline-block
				width 25px
				height 24px
				background-size 25px 24px
				&.icon0
					bg-image('first')
				&.icon1
					bg-image('second')
				&.icon2
					bg-image('third')
			.text
				color $color-theme
				font-size $font-size-large
		.content
			flex:1
			line-height:20px
			overflow:hidden
			.name
				no-wrap()
				color:$color-text
			.desc
				no-wrap()
				margin-top:4px
				color:$color-text-d
		&.bottomMargin:last-child
			margin-bottom:60px
</style>