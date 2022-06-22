<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 这是收获地址的组件 -->
    <my-address></my-address>
    
    <!-- 购物车的标题 -->
    <view class="cart-title">
      <!-- 标题的图标 -->
      <uni-icons type="shop-filled" size="18" class="cart-title-icon"></uni-icons>
      <!-- 标题的文本 -->
      <text>购物车</text>
    </view>

    <!-- 商品列表的数据结构 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true"
            @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 商品节选组件 -->
    <my-settle></my-settle>
  </view>

  <view class="cart-blank" v-else>
    <image src="../../static/glgs.jpg" class="blank-img"></image>
    <text class="blank-text">啥也没有！！！</text>
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    mixins: [badge],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    onLoad() {
      console.log(this.cart)
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsNum', 'removeGoodsById']),
      radioChangeHandler(e) {
        // console.log(e)
        this.updateGoodsState(e)
      },
      numChangeHandler(e) {
        // console.log(e)
        this.updateGoodsNum(e)
      },
      swiperItemClickHandler(e) {
        // console.log(e.goods_id)
        this.removeGoodsById(e.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    background-color: white;
    padding-bottom: 50px;
  }

  .cart-title {
    display: flex;
    padding: 10px 5px;
    border: 1px solid #efefef;

    .cart-title-icon {
      margin-right: 10px;
    }

    text {
      font-size: 14px;
    }
  
  }
  
  // 这是空白购物车展示的页面
  .cart-blank{
    display: flex;
    flex-direction: column;
    // padding-top: 150px;
    // justify-content: center;
    align-items: center;
    .blank-img{
      width: 100%;
      height: 200px;
    }
    .blank-text{
      font-size: 16px;
      font-weight: bold;
      color: #c00000;
    }
  }
</style>
