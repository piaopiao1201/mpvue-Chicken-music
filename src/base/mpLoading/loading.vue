<template>
    <div class='loading'>
		  <img src="./loading.gif" class='loadImg'>
		  <p class='loadMsg' v-html="loadingMsg"></p>
	  </div>

</template>

<script>
export default {
  data () {
    return {
        
    };
  },
    props:{
        loadingMsg:{
            type:'String',
            default:'正在加载中'
        }
    },
  components: {},

  computed: {},

  mounted(){
      console.log(1)
  },
    created () {
      console.log('组件已加载');  
    },
  methods: {}
  // .loading
	// 	text-align:center;
	// 	padding-top:5px;
	// 	img
	// 		width:50rpx
	// 		height:50rpx
	// 	.loadMsg
	// 		padding-top:3rpx
	// 		font-size:$font-size-medium
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable'
.loading
	text-align center
	padding-top:5px
	margin-bottom:20rpx
	img
		width:50rpx
		height:50rpx
	.loadMsg
		padding-top:3rpx
		font-size:$font-size-medium
</style>