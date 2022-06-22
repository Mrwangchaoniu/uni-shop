<template>
  <view>
    <!-- 这是头像部分 -->
    <view class="title-box">
      <view class="head-box">
        <image :src="userinfo.avatarUrl"></image>
      </view>
      <!-- 文本 -->
      <text class="head-text">{{userinfo.nickName}}</text>
      
    </view>
    
    <!-- 这是面板去 -->
    <view class="panel">
      <view class="panel-box">
        <view class="panel-item">
          <text>8</text>
          <text>收藏的店铺</text>
          
        </view>
        <view class="panel-item">
          <text>14</text>
          <text>收藏的商品</text>
          
        </view>
        <view class="panel-item">
          <text>18</text>
          <text>关注的商品</text>
          
        </view>
        <view class="panel-item">
          <text>84</text>
          <text>足迹</text>
          
        </view>
        
      </view>
      
    </view>
  
    <!-- 第二个面板 -->
    <view class="panel">
      <view class="panel-title">
        我的订单
      </view>
      <view class="panel-box">
        <view class="panel-item">
          <image class="icon" src="../../static/icon/home.png" mode=""></image>
          <text>待付款</text>
        </view>
        <view class="panel-item">
          <image class="icon" src="../../static/icon/img.png" mode=""></image>
          <text>待收货</text>
        </view>
        <view class="panel-item">
          <image class="icon" src="../../static/icon/my.png" mode=""></image>
          <text>退款/退货</text>
        </view>
        <view class="panel-item">
          <image class="icon" src="../../static/icon/search.png" mode=""></image>
          <text>全部订单</text>
        </view>
        
      </view>
      
    </view>
  
    <!-- 第三个面板 -->
    <view class="panel">
      <view class="panel-item-list">
        <text>收获地址</text>
        <uni-icons type="forward" size="15"></uni-icons>
      </view>
      <view class="panel-item-list">
        <text>联系客服</text>
        <uni-icons type="forward" size="15"></uni-icons>
      </view>
      <view class="panel-item-list" @click="logout">
        <text>退出登录</text>
        <uni-icons type="forward" size="15"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['userinfo', 'token'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserinfo', 'updateToken']),
      async logout() {
        const [err,succ] = await uni.showModal({
          title: '提示',
          content: '确认退出？'
        }).catch(err => err)
        if (succ && succ.confirm) {
          // 清空用户的信息，token
          this.updateAddress({})
          this.updateToken('')
          this.updateUserinfo({})
        }
      }
    }
  }
</script>

<style lang="scss">
.title-box{
  height: 400rpx;
  width: 100%;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  .head-box{
    width: 90px;
    height: 90px;
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0px 1px 6px black;
    
    image{
     width: 90px;
     height: 90px;
    border-radius: 50%;
    }
  }
  .head-text{
    font-size: 16px;
    color: white;
    font-weight: bold;
    margin-top: 10px;
  }
}
.panel{
  padding: 0 10px;
  position: relative;
  top: -10px;
  margin-bottom: 10px;
  
  .panel-title{
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #efefef;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  
  .panel-box{
    width: 100%;
    border-radius: 5px;
    background-color: white;
    // padding: 0 5px;
    display: flex;
    justify-content: space-around;
  }
  .panel-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    justify-content: space-around;
    
    text{
      font-size: 12px;
    }
    .icon{
      width: 35px;
      height: 35px;
    }
  }
}

.panel-item-list{
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0 10px;
  line-height: 45px;
  font-size: 15px;
}
</style>