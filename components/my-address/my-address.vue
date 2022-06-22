<template>
  <view>
    <!-- 这是收获地址盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
     <button type="primary" class="benAddressChoose" size="mini" @click="chooseAddress">选择收获地址+</button>  
    </view>
    
    <!-- 这是收获信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <!-- 收获人姓名 -->
        <view class="row1-left">收货人：{{address.userName}}</view>
        <!-- <view class="row1-left">收货人：{{aaa}}</view> -->
        <!-- 收获人电话 -->
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="forward" size="16"></uni-icons>
        </view>
        
      </view>
      <view class="row2">
        <view class="row2-left">收获地址：</view>
        <view class="row2-right">{{addressStr}}</view>
      </view>
      
    </view>
    
    
    <!-- 收获地址的边框 -->
    <view class="address-border"></view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  
  export default {
    name:"my-address",
    data() {
      return {
        // address: {}
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // this.address = succ
          this.updateAddress(succ)
        }
        // 用户取消了授权的处理事件
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' ||  err.errMsg === 'chooseAddress:fail authorize no response')) {
          // 通过调用这个方法，让用户重新授权
          this.reAuth()
        }
      },
      // 让用户重新授权
      async reAuth() {
        const [ err2, confirmResult ] = await uni.showModal({
          content: '检测到您没有打开地址权限，是否设置打开？',
          confirmText:'确认',
          cancelText: '取消'
        })
        if (err2) return;
        
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权')
        if (confirmResult.confirm) return uni.openSetting({
          success: (settingResult) => {
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消授权')
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功，请选择收获地址')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addressStr'])
    }
  }
</script>

<style lang="scss">
.address-border{
  width: 100%;
  height: 2px;
  background-color: #c00000;
}

.address-choose-box{
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 收货信息样式
.address-info-box{
  font-size: 12px;
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  justify-content: center;
  
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      justify-content: space-between;
    }
  }
  
  .row2{
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    .row2-left{
      white-space: nowrap;
    }
  }
}
</style>