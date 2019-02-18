<template>
<div class="container">
  <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.nickName!=null" class="avatar" background-size="cover">
  <button open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" v-if="userInfo.nickName==null">授权登录</button>
  <p class="welcome">你好 {{userInfo.nickName!=null?userInfo.nickName:''}}</p>

  <a href="/pages/home/main" class="goto" v-if="userInfo.nickName!=null" open-type="redirect">开启小程序之旅</a>
	<p class="sign">coded by <span style="color:#666">不吃鱼的猫先森</span></p>
</div>
</template>

<script>
export default {
  data () {
    return {
      userInfo:{
      },
    };
  },
  created () {
    this.getUserInfo();
    //this.userInfo.nickName="sas";
  },
  components: {},

  computed: {},
	mounted () {
		var userInfo=wx.getStorageSync('user');
		console.log(userInfo);
		if(userInfo!=null){
			this.userInfo=userInfo;
			console.log(this.userInfo);
		}
	},
  methods: {
    bindGetUserInfo(data){
      if(data.mp.detail.rawData){
        // this.userInfo=data.mp.detail.rawData;
        // console.log(this.userInfo);
        this.getUserInfo();
      }
    },
    getUserInfo(){
      var that=this;
      wx.getUserInfo({
        success:function(data){
          that.userInfo=data.userInfo;
          wx.setStorageSync('user', data.userInfo);
        }
      })
    }
  }
}

</script>
<style>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:200rpx 0rpx;
		background:white;
		width: 100%;
		height: 100%;
		position: fixed;
  }
  .welcome{
    margin-bottom: 80rpx;
		color:#000;
  }
  .avatar{
    border-radius: 50%;
    width: 128rpx;
    height: 128rpx;
    margin-bottom: 50rpx;
  }
  .goto{
    border: 1rpx solid green;
    border-radius: 20%;
    padding: 20px 10px;
  }
	.sign{
		position: absolute;
		top: 400px;
		right: 20px;
		color: #222;
	}
</style>