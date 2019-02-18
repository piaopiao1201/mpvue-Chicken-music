<template>
  <div class="progress-circle" :style="circleStyle">
		<canvas :style="canvasStyle" canvas-id="circleBg"></canvas>
		<canvas :style="canvasStyle" canvas-id="circleBar" class="canvasBar"></canvas>
		<slot></slot> 
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    radius: {
      type: Number,
      default: 32
    },
    percent: {
      type: Number,
      default: 0
    },
		cWidth:{
			type:Number,
			default:32
		},
		cHeight:{
			type:Number,
			default:32
		}
  },
  data() {
    return {
			dashArray: Math.PI * this.radius, // 周长,
			innerWidth:0
    }
  },
  computed: {
    // dashOffset() {
    //   return (1 - this.percent) * this.dashArray
		// },
		canvasStyle(){
			return "width:"+this.innerWidth+"px;height:"+this.innerWidth+"px;"
		},
		circleStyle(){
			var dashOffset=(1 - this.percent) * this.dashArray;
			var url="data:image/svg+xml,%3Csvg width='"+this.radius+"' height='"+this.radius+"' viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E %3Ccircle r='50' cx='50' cy='50' fill='transparent' stroke-width='8' stroke='rgba(255, 205, 49, 0.5)' style='transform: scale(0.9);transform-origin: center;'/%3E %3Ccircle class='progress-bar' r='50' cx='50' cy='50' fill='transparent' stroke-dasharray='"+this.dashArray+"' stroke-dashoffset='"+dashOffset+"' stroke-width='8' stroke='%23ffcd32' style='transform: scale(0.9) rotate(-90deg);transform-origin: center;'/%3E %3C/svg%3E";
			var bgUrl='url("'+url+'") no-repeat;';
			var style='background:'+bgUrl;
			var style="position:relative";
			var style="";
			return style;
		},
		svgUrl(){
			var dashOffset=(1 - this.percent) * this.dashArray;
			var url="data:image/svg+xml,%3Csvg width='"+this.radius+"' height='"+this.radius+"' viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E %3Ccircle r='50' cx='50' cy='50' fill='transparent' stroke-width='8' stroke='rgba(255, 205, 49, 0.5)' style='transform: scale(0.9);transform-origin: center;'/%3E %3Ccircle class='progress-bar' r='50' cx='50' cy='50' fill='transparent' stroke-dasharray='"+this.dashArray+"' stroke-dashoffset='"+dashOffset+"' stroke-width='8' stroke='%23ffcd32' style='transform: scale(0.9) rotate(-90deg);transform-origin: center;'/%3E %3C/svg%3E";
			return url;
		}
	},
	methods:{
		drawProgressbg (){
			var ctx=wx.createCanvasContext("circleBg");
			ctx.setLineWidth(2);
			ctx.setStrokeStyle("rgba(255, 205, 49, 0.5)");
			ctx.setLineCap("round");
			
			ctx.beginPath();
			ctx.arc(this.innerWidth/2,this.innerWidth/2,this.innerWidth/2*0.9,0,2*Math.PI);
			
			ctx.stroke();
			ctx.draw();
		},
		drawProgressBar (percent){
			var ctx=wx.createCanvasContext("circleBar");
			ctx.draw();
			ctx.setLineWidth(2);
			ctx.setStrokeStyle("#ffcd32");
			ctx.setLineCap("round");
			ctx.beginPath();
			ctx.arc(this.innerWidth/2,this.innerWidth/2,this.innerWidth/2*0.9,-Math.PI/2,-Math.PI/2+percent*2*Math.PI);
			ctx.stroke();
			ctx.draw();
		},
		flushRate(){
			return new Promise((resolve,reject)=>{
				wx.getSystemInfo({
					success: function(res) {
						resolve(res.windowWidth);
					}
				})
			})
		}
	},
	mounted () {
		this.flushRate().then(res=>{
			this.innerWidth=(32/320)*res;
			this.drawProgressbg();
			
		})
	},
	watch:{
		percent(percent){
			this.drawProgressBar(percent);
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.progress-circle
	position relative
	canvas.canvasBar
		position absolute
		top:0
</style>
