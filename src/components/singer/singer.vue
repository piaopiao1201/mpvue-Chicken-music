<template>
    <div class="singer">
			<div v-show="singerList.length" class="listWrapper">
        <list-view :data="singerList" @select="handleSelect"></list-view>
			</div>
			<div v-show="!singerList.length">
				<mpLoading></mpLoading>
			</div>
    </div>
</template>

<script>
import listView from '@/base/listView/listView';
import mpLoading from 'base/mpLoading/loading'
import {getSingerlist} from '@/api/singer.js'
import {ERR_OK} from '@/api/config.js'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
			singerList:[]
		}
  },
	mounted () {
		this._getSingerlist();
		
	},
  components: {
		listView:listView,
		mpLoading
	},

  computed: {},
  methods: {
		_getSingerlist(){
			getSingerlist().then((res)=>{
				console.log(res);
				if(res.code===ERR_OK){
					this.singerList=res.data.list;
					this.singerList=this._resolveSingerlist();
				}
			},(err)=>{
				//console.log(err);
			})
		},
		_resolveSingerlist(){
			let hotArr=[{
				title:'热门歌手',
				arr:[]
			}];
			let otherOrderByinitial=[];
			this.singerList.forEach((key,index)=>{
				if(index<10){
					hotArr[0].arr.push({
						name:key.Fsinger_name,
						id:key.Fsinger_mid,
						avatar:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+key.Fsinger_mid+'.jpg?max_age=2592000'
					});
				}else{
					if(this._checkIsInarray(otherOrderByinitial,key,'Findex').isTrue){
						let index=this._checkIsInarray(otherOrderByinitial,key,'Findex').index;
						otherOrderByinitial[index].arr.push({
								name:key.Fsinger_name,
								id:key.Fsinger_mid,
								avatar:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+key.Fsinger_mid+'.jpg?max_age=2592000'
								});
					}else{
						otherOrderByinitial.push({
							title:key.Findex,
							arr:[{
								name:key.Fsinger_name,
								id:key.Fsinger_mid,
								avatar:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+key.Fsinger_mid+'.jpg?max_age=2592000'
								}]
						})
					}
				}
			})
			otherOrderByinitial=otherOrderByinitial.sort((a,b)=>{
				return a.title.charCodeAt(0)-b.title.charCodeAt(0);
			});
			return hotArr.concat(otherOrderByinitial);
		},
		_checkIsInarray(arr,obj,attr){
			for(var i=0;i<arr.length;i++){
				if(arr[i].title==obj[attr]){
					break;
				}
			}
			if(i==arr.length){
				return {
					isTrue:false
				};
			}else{
				return {
					isTrue:true,
					index:i
				};
			}
		},
		onScroll(pos){
			// console.log(pos);
		},
		handleSelect(item){
			console.log(item);
			this.setSinger(item);
			// wx.navigateTo({
      //   url: "/pages/singer-detail/main"
			// });
			this.$emit('selectSinger');
		},
		...mapMutations({
			setSinger:'SET_SINGER'
		})
	}
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.singer
	position:fixed
	width:100%
	top:88px
	bottom:0
	.listWrapper
		width 100%
		height 100%
</style>