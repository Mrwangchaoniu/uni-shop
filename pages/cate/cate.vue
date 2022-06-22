<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <!-- 滑动区域的容器 -->
    <view class="scroll-view-container">
      <!-- 左侧项目容器 -->
     <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChange(i)">{{item.cat_name}}</view>
        </block>
       
     </scroll-view>
      <!-- 右侧项目容器 -->
     <scroll-view class="right-scroll-view" scroll-y="true" :scroll-top="scrollTop" :style="{height: wh + 'px'}">
      <view class="right-lv2-container" v-for="(item2, i2) in cateLeve2" :key="i2">
        <!-- 二级分类的标题 -->
        <view class="lv2-title">/ {{item2.cat_name}} /</view>
        <!-- 三级分类的列表 -->
        <view class="cate-lv3-list" >
          <!-- 三级分类的item项 -->
          <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="goGoodsList(item3)">
            <image :src="urlChange(item3.cat_icon)"></image>
            <text>{{item3.cat_name}}</text>
          </view>
          
        </view>
      </view>
     </scroll-view>
      
    </view>
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  
  export default {
    mixins: [badge],
    data() {
      return {
        wh: 0,
        // 分类列表数据
        cateList: [],
        // 显示当前项的索引
        active: 0,
        // 二级分类的数据
        cateLeve2: [],
        // 定义滚动条的位置
        scrollTop: 0
      };
    },
    onLoad() {
      // 获取设备到高度，设备的信息
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      // 获取分类列表数据
      this.getCateList()
    },
    methods: {
      // 获取分类列表方法
      async getCateList() {
        const {data : res} = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLeve2 = res.message[0].children
        
      },
      // 点击修改active
      activeChange(i) {
        this.active = i
        this.cateLeve2 = this.cateList[i].children  
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 修改url地址
      urlChange(url) {
        return url.replace('dev','web')
      },
      // 点击三级菜单的每一项，去往对应的页面
      goGoodsList(item) {
        uni.navigateTo({
          url: '/subpack/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 前往搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpack/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container{
    display: flex;
    
    // 左侧滚动样式
    .left-scroll-view{
      width: 120px;
      
      .left-scroll-view-item{
        height: 60px;
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        
        &.active{
          background-color: white;
          position: relative;
          &::before{
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
    
    
    .lv2-title{
      text-align: center;
      font-weight: bold;
      padding: 15px 0;
      font-size: 12px;
    }
    
    .cate-lv3-list{
      display: flex;
      flex-wrap: wrap;
   
      .cate-lv3-item{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
         margin-bottom: 20px;
        
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12px;
        }
      }
    }
    .right-scroll-view{
      background-color: white;
    }
   
  }

</style>
