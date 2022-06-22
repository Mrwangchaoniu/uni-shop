<template>
  <view class="my-search-container" :style="{'background-color': bgColor}" @click="searchHandler">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <!-- 图标 -->
      <uni-icons type="search" size="17" ></uni-icons>
      <!-- 文本 -->
      <text class="search-text">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      bgColor: {
        type: String,
        default: '#c00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      searchHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #c00000;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  .my-search-box{
    height: 36px;
    width: 100%;
    background-color: #FFFFFF;
    // border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-text{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>