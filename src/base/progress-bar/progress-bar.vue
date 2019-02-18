<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16
export default {
	data () {
		return {
			barWidth:0,
			btnOffset:0,
			progressWidth:0
		};
	},
	props: {
    percent: {
      type: Number,
      default: 0
    }
  },
	components: {},
	created() {
		this.touch = {};
		
	},
	mounted () {
		console.log('mounted挂载');
		
	},
	computed: {
		progressStyle(){
			return 'width:'+this.barWidth+'px;';
		},
		btnStyle(){
			return 'transform:translateX('+this.btnOffset+'px);';
		}
	},


	methods: {
		progressTouchStart(e) {
			this.touch.initiated = true // 触摸开始
			this.touch.startX=e.pageX;
			var query = wx.createSelectorQuery();
				query.select('.progress').boundingClientRect(function(res){
					// console.log(res);
					console.log(res.width);
					this.touch.left=res.width;
				}.bind(this)).exec();
      // this.touch.startX = e.touches[0].pageX // 获取此时鼠标 x 坐标
			// this.touch.left = this.$refs.progress.clientWidth // 获得此时进度条长度
			// var query = wx.createSelectorQuery();
			query.select('.progress-bar').boundingClientRect(function(res){
				// console.log('查询到了');
				this.progressWidth=res.width;
			}.bind(this)).exec();
			// console.log(this.progressWidth);
    },
		progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
			}
			var deltaX = e.pageX - this.touch.startX // 获得差值
      // var offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
			// this._offset(offsetWidth)
			
			var offsetWidth = Math.min(this.progressWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
			this.barWidth=offsetWidth;
			this.btnOffset=offsetWidth;
			this.$emit('percentMoveChange',this.barWidth/(this.progressWidth - progressBtnWidth));
			// var query = wx.createSelectorQuery();
				// query.select('.progress-bar').boundingClientRect(function(res){
				// 	// console.log(res);
				// 	var offsetWidth = Math.min(res.width - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
				// 	this.barWidth=offsetWidth;
				// 	this.btnOffset=offsetWidth;
				// }.bind(this)).exec();
      // const deltaX = e.touches[0].pageX - this.touch.startX // 获得差值
      // const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      // this._offset(offsetWidth)
		},
		progressTouchEnd(e) {
			this.touch.initiated = false;
			var percent=this.barWidth/(this.progressWidth - progressBtnWidth);
			this.$emit('percentChange',percent);
    },
	},
	watch:{
		 percent(newPercent) {
			//  console.log(newPercent);
      // 当没有拖动时 newPercent 才更新
      if (newPercent >= 0 && !this.touch.initiated) {
				var query = wx.createSelectorQuery();
				query.select('.progress-bar').boundingClientRect(function(res){
					// console.log(res);
					const barWidth = res.width - progressBtnWidth;
					const offsetWidth = newPercent * barWidth;
					this.barWidth=offsetWidth;
					this.btnOffset=offsetWidth;
				}.bind(this)).exec();
        // const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 进度条宽度
        // const offsetWidth = newPercent * barWidth
        // this.$refs.progress.style.width = `${offsetWidth}px`
        // this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)` // 小球偏移
      }
    }
	}
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0, 0, 0, 0.3)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme
</style>
