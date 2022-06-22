<template>
  <view class="login-container">
    <!-- 图标 -->
    <uni-icons type="contact" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button class="btn-login" type="primary" open-type="getUserInfo" @getuserinfo="getUserinfo">一键登录</button>
    <!-- 文本 -->
    <text class="btn-text">登录后享受更多权益</text>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserinfo','updateToken']),
      getUserinfo(e) {
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权')
        this.updateUserinfo(e.detail.userInfo)
        
        // 定义一个方法来获取token
        this.getToken(e.detail)
        // 登录后后退到购物车页面
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
         uni.switchTab({
           url:this.redirectInfo.from,
           complete: () => {
             this.redirectInfo = null
           }
         })
        }
      },
      async getToken(info) {
        // 获取code
        const [err,succ] = await uni.login().catch(err => err)
        console.log(succ.code)
        console.log(info)
        if ( err || succ.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        // 定义发起请求的参数
        const query = {
          code: succ.code,
          encryptedData: info.encryptedData,
          rawData: info.rawData,
          iv: info.iv,
          signature: info.signature,
        }
        
       const res = await uni.$http.post('/api/public/v1/users/wxlogin', query)
       if (res.statusCode !== 200) return uni.$showMsg()
       this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
       uni.$showMsg('登录成功')
      }
    }
  }
</script>

<style lang="scss">
  .login-container{
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding: 0 10px;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;
    
    &::after{
      content: ' ';
      display: block;
      width: 100%;
      height: 50px;
      background-color: #f5f5f5;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      transform: translateY(50%);
     
    }

  .btn-login{
    width: 90%;
    border-radius: 100px;
    background-color: #c00000;
    margin: 15px 0;
    }
    
  .btn-text{
    color: gray;
    font-size: 12px;
  }
  }

</style>