<template>
	<div ref='wrapper' class="recommend-content">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props:{
			probeType:{
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data:{
				type: Array,
				default: null
			},
			listenScroll:{
				type: Boolean,
				default: false
			}
		},
		mounted(){
            
			// setTimeout(()=>{
			// 	this._initScroll();
			// },20)
			//console.log(this.probeType);
		},
		methods:{
			_initScroll(){
				if(this.$refs.wrapper){
					this.scroll=new BScroll(this.$refs.wrapper,{
						probeType:this.probeType,
						click:this.click
					})
					if(this.listenScroll){
						var This=this;
						this.scroll.on('scroll',(pos)=>{
							This.$emit('scroll',pos.y);
						})
					}
				}
			},
			enable(){
				this.scroll&&this.scroll.enable()
			},
			disenable(){
				this.scroll&&this.scroll.disenable()
			},
			refresh(){
				this.scroll&&this.scroll.refresh()
			},
			scrollToElement(){
				this.scroll&&this.scroll.scrollToElement.apply(
						this.scroll,arguments
					)
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh();
				},20)
			}
		}
	}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.recommend-content
		height:100%
		overflow: hidden
</style>