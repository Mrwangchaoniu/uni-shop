<template>
  <view class="goods-container-box" v-if="goodsinfo.goods_name">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsinfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    
    <!--  商品的详细信息-->
    <view class="goods-detail-box">
      <!-- 商品的价钱 -->
      <view class="goods-price">￥{{ goodsinfo.goods_price }}</view>
      <!-- 商品的详细信息的标题 -->
      <view class="goods-title-box"> 
      <!-- 左侧商品名称 -->
        <view class="goods-title">{{ goodsinfo.goods_name }}</view>
        <!-- 右侧图标区域 -->
        <view class="goods-right">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-yf">快递：免运费--{{cart.length}}---{{abc.length}}</view>
      
    </view>
    
    <!-- 富文本页面结构, 将数据中的html字符串渲染为小程序的页面结构 -->
    <rich-text :nodes="goodsinfo.goods_introduce"></rich-text>
    
    <!-- 导航栏 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapState('m_cart',[]),
      ...mapState('m_abc', ['abc']),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      // total(newVal) {
      //   const findResults = this.options.find(x => x.text === '购物车')
      //   findResults.info = newVal
      // }
      total: {
        handler(newVal) {
          const findResults = this.options.find(x => x.text === '购物车')
          findResults.info = newVal
        },
        immediate: true
      }
    },
    data() {
      return {
        // 商品详情的对象
        goodsinfo: {},
         options: [{
        			icon: 'shop',
        			text: '店铺',
        			infoBackgroundColor:'#007aff',
        			infoColor:"red"
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 0
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsinfo(goods_id)
    },
    methods: {
      ...mapMutations('m_cart',['addtoCart']),
      async getGoodsinfo(goods_id) {
        const { data : res } = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        if (res.meta.status !== 200) return uni.showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/,'jpg')
        this.goodsinfo = res.message
      },
      preview(i) {
        // 展示图片放大效果
        uni.previewImage({
          current: i,
          urls: this.goodsinfo.pics.map(x => x.pics_big)
        })
      },
      // 点击导航栏的处理函数
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 点击加入购物车，和立即购买的按钮的事件
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goodsinfo.goods_id,
            goods_name: this.goodsinfo.goods_name,
            goods_price: this.goodsinfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsinfo.goods_small_logo,
            goods_state: true
          }
          this.addtoCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods-container-box{
    background-color: white;
  }
  
swiper{
  height: 750rpx;
  image{
    width: 100%;
    height: 100%;
  }
}

// 商品详情信息
.goods-detail-box{
  // height: 50px;
  padding: 10px;
  padding-right: 0px;
  .goods-price{
    font-size: 18px;
    color: #c00000;
    margin: 10px 0;
  }
  .goods-title-box{
    display: flex;
    justify-content: space-between;
    .goods-title{
      margin-right: 10px;
      font-size: 13px;
    }
    .goods-right{
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 1px solid #efefef;
      font-size: 12px;
      color: gray;
    }
  }
  .goods-yf{
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}

.goods-nav{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
