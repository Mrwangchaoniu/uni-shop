<template>
  <view class="goods-item">
    <!-- 左侧盒子图片 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick"></radio>
      <image :src="goods.goods_small_logo" class="goods-item-image"></image>
    </view>
    <!-- 右侧盒子图片 -->
    <view class="goods-item-right">
      <!-- 标题 -->
      <view class="goods-item-right-title">{{goods.goods_name}}</view>
      <view class="goods-item-info">
        <view class="goods-item-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" v-if="showNum" @change="numberBoxClick" v-model="goods.goods_count"></uni-number-box>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClick() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numberBoxClick(e) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +e
        })
      }
    }
  }
</script>

<style lang="scss">
 .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .goods-item-left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;
      .goods-item-image{
        width: 100px;
        height: 100px;
        display: block;
        
      }
    }
    .goods-item-right{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .goods-item-info{
        display: flex;
        justify-content: space-between;
      }
      .goods-item-right-title{
        font-size: 13px;
      }
      .goods-item-price{
        font-size: 16px;
        color: red;
      }
    }
  }
</style>