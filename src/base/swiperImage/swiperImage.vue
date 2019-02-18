<template>
    <swiper class="swiper" :indicator-dots="true" :autoplay="true">
        <block v-for="(item, index) in dataList" :index="index" :key="index">
        <swiper-item>
             <a :href="item.linkUrl">
                <image :src="item.picUrl" class="slide-image" mode="widthFix"/>
        	 </a>
         </swiper-item>
      </block>
  </swiper>
</template>

<script>
export default {
  data () {
    return {
    };
  },
props:{
    dataList:{
        type:Array,
        default:null
    }
},
  components: {},
//   mounted () {
//      console.log('swiperImage加载');   
//   },
  computed: {},


  methods: {}
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-image
    width:100%
</style>