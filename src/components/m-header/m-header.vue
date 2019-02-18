<template>
  <div>
      <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
        <div class="mine" @click="selectMine">
          <i class="icon-mine"></i>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},
  methods: {
		selectMine(){
			this.$emit('selectMine');
		}
	}
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  page
    background:#222
  .m-header
    position: relative
    height: 88rpx
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 12rpx
      width: 60rpx
      height: 64rpx
      margin-right: 18rpx
      bg-image("logo")
      background-size: 60rpx 64rpx
    .text
      display: inline-block
      vertical-align: top
      line-height: 88rpx
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 24rpx
        font-size: 40rpx
        color: $color-theme
</style>