<template>
	<div class='loading'>
		<img src="./loading.gif" class='loadImg'>
		<div class='loadMsg' v-html="loadingMsg">sd</div>
		<div>{{test}}</div>
	</div>
</template>

<script type='text/ecmascript-6'>
	export default {
		data () {
			return {
				test:"第三大"		
			}
		},
		props:{
			loadingMsg:{
				type:String,
				default:'正在载入...'
			}
		}
	}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable'
	.loading
		text-align:center;
		padding-top:5px;
		img
			width:50rpx
			height:50rpx
		.loadMsg
			padding-top:3px;
			font-size:$font-size-medium
</style>