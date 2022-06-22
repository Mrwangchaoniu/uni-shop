<template>
  <view class="settle-container">
    <!-- 全选 -->
    <view class="radio-box">
      <label class="radio" @click="radioClickHandler">
        <radio color="#c00000" :checked="isCheck" /><text>全选</text>
      </label>
    </view>
    <!-- 合计 -->
    <view class="total-box">
      合计:<text>￥:{{checkedSettle}}</text>
    </view>
    <!-- 结算 -->
    <view class="settle-btn" @click="settleClick">
      <text>结算({{checkedCount}})</text>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  
  export default {
    name:"my-settle",
    data() {
      return {
        num: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedSettle']),
      ...mapState('m_cart',['cart']),
      ...mapState('m_user', ['address','token']),
      ...mapGetters('m_user', ['addressStr']),
      isCheck() {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState',]),
      ...mapMutations('m_user',['updateRediredtInfo']),
      radioClickHandler() {
        this.updateAllGoodsState(!this.isCheck)
      },
      settleClick() {
        // 判断购物车商品有没有勾选
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
        // 判断用户是否选择了收获地址
        if (!this.address.errMsg) return uni.$showMsg('请选择收获地址')
        // console.log(this.address)
        // 判断用户是否登录
        if (!this.token) {
          this.gomy()
        } 
        // 发起支付功能
        this.payOrder()
      },
       async payOrder() {
        // 1.创建订单
        // 1.1将订单信息发送到服务器
        const orderInfo = {
          // order_price: this.checkedSettle,
          order_price: 0.01,
          consignee_addr: this.addressStr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number:x.goods_count,
            goods_price:x.goods_price
          }))
        }
        // 1.2获取到订单编号
        const {data : res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
        const orderNumber = res.message.order_number
        
        // 订单预支付
        const { data: res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
        console.log(res2)
        console.log(orderNumber)
        // "message": {
        //     "pay": {
        //       "timeStamp": "1564730510",
        //       "nonceStr": "SReWbt3nEmpJo3tr",
        //       "package": "prepay_id=wx02152148991420a3b39a90811023326800",
        //       "signType": "MD5",
        //       "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
        //     },
        //     "order_number": "HMDD20190802000000000422"
        //   },
        const payInfo = {
                "timeStamp": "1564730510",
                "nonceStr": "SReWbt3nEmpJo3tr",
                "package": "prepay_id=wx02152148991420a3b39a90811023326800",
                "signType": "MD5",
                "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
        }
         
        // 微信支付
        const [err, succ] = await uni.requestPayment(payInfo)
        // if (err) return uni.$showMsg('订单未支付')
        const { data: res3} = uni.$http.post('/api/public/v1/my/orders/chkOrder', {order_number : orderNumber})
        // console.log(res3)
        // if (res3.meta.status !== 200) return uni.$showMsg('订单未支付')
        uni.showToast({
          title: '支付完成',
          icon: 'success'
        })
         
      },
      gomy() {
         this.num = 3
        this.showAlert(this.num)
        this.timer = setInterval(() => {
          this.num --
          
          if (this.num <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRediredtInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
           
            return
          }
          this.showAlert(this.num)
        },1000)
      },
      // 延时提示框n
      showAlert(n) {
        uni.showToast({
          icon: 'none',
          title: '请先登录' + n + '秒后跳转到登录页面',
          mask: true,
          // 1.5秒后自动消失
          duration: 1500
        })
      }
    }
  }
</script>

<style lang="scss">
.settle-container{
  height: 50px;
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  
  .radio-box{
    display: flex;
    align-items: center;
  }
  
  .total-box{
    text{
      color: #c00000;
      font-weight: bold;
    }
  }
  
  .settle-btn{
    background-color: #c00000;
    height: 50px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
</style>