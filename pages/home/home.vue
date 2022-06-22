<template>
  <view>
    <!-- 搜索组件 -->
   <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
   </view>
    <!-- 轮播图组件 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
       <navigator class="swiper-item" :url="'/subpack/goods_detail/goods_detail?goods_id=' + item.goods_id">
           <image :src="item.image_src"></image>
       </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 导航组件 -->
    <view class="nav_box">
     <view v-for="(item, i) in navList" :key="i" class="nav_item" @click="nanClickHandler(item)">
       <image :src="item.image_src" class="image_item"></image>
     </view>
    </view>
    
    <!-- 楼层页面解构 -->
    <view class="floor_box">
      <!-- 循环的item项的每一个 -->
      <view class="floor_item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor_title"></image>
        <!-- 楼层的图片内容 -->
        <view class="floor_img_box">
          <!-- 左侧大图片内容 -->
          <navigator class="left_img_box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧4个小图片内容 -->
          <view class="right_img_box">
            <!-- 右侧的item项 -->
           <navigator v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
             <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
           </navigator>
          </view>
          
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  
  export default {
    mixins: [badge],
    data() {
      return {
        // 轮播图数据解构
        swiperList: [],
        // 导航数据解构
        navList: [],
        // 楼层数据解构
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList(),
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message   
      },
     async getNavList() {
        const { data : res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 楼层请求函数
      async getFloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        
        // 对每一张图片进行挂载url
        res.message.forEach(floor => {
          floor.product_list.forEach(item => {
            
            item.url = '/subpack/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 导航点击的处理函数
      nanClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpack/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper{
    height: 330rpx;
    .swiper-item,
    image{
      width: 100%;
      height: 100%;
    }
  }
// 轮播图区域的样式
  .nav_box{
    display: flex;
    justify-content: space-around;
    height: 140rpx;
    margin: 15px 0px;
    .nav_item{
      width: 128rpx;
      height: 140rpx;
      .image_item{
       width: 100%;
       height: 100%
      }
    }
  }
  
  // 楼层区域的样式
  .floor_box{
    
    .floor_title{
      width: 100%;
      height: 60rpx;
    }
    .floor_img_box{
      display: flex;
      padding-left: 10rpx;
    }
    // 右侧图片样式
    .right_img_box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
</style>
