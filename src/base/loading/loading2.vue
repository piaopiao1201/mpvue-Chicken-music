<template>
<div>
    <div class='loading'>
		<img src="./loading.gif" class='loadImg'>
		<div class='loadMsg' v-html="loadingMsg"></div>
		<div>{{test}}</div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
        test:'123'
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