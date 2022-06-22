<template>
  <view class="search-container">
    <view class="search-box">
      <uni-search-bar @input="input" radius="100" cancelButton="none" clearButton="always" placeholder="请输入搜索内容"></uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="sugg-box" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
        <!-- 标题 -->
        <view class="goods-name">{{item.goods_name}}</view>
        <!-- 图标 -->
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史区域 -->
    <view class="history-container" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clear"></uni-icons>
      </view>
      <!-- 历史列表 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" type="default" @click="gotoGoodList(item)"></uni-tag>
        
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        // 关键字搜索出来的数据
        searchResults: [],
        // 历史列表数据
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchResults()
        },500)
      },
      async getSearchResults() {
        if (!this.kw) {
          this.searchResults = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        
        // 添加历史记录
        this.setHistory()
      },
    // 前往商品详情页
    gotoDetail(item) {
      console.log(item.goods_id)
      uni.navigateTo({
        url:'/subpack/goods_detail/goods_detail?goods_id=' + item.goods_id
      })
    },
    setHistory() {
      // this.historyList.push(this.kw)
      const set = new Set(this.historyList)
      set.delete(this.kw)
      set.add(this.kw)
      this.historyList = Array.from(set)
      
      // 将历史记录永久存储在本地
      uni.setStorageSync('kw', JSON.stringify(this.historyList))
    },
    // 清空历史记录
    clear() {
      this.historyList = []
      uni.setStorageSync('kw', '[]')
    },
    // 点击历史记录，跳转到商品列表页面
    gotoGoodList(kw) {
      uni.navigateTo({
        url: '/subpack/goods_list/goods_list?query=' + kw
      })
    }
    },
    computed:{ 
      histories() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}

// 搜索建义样式
.sugg-box{
  // width: 100%;
  padding: 0 5px;
  .sugg-item{
    // height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid #dfdfdf;
    font-size: 12px;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 14px;
    }
  }
}

// 搜索历史样式
.history-container{
  .history-title{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    padding: 0 10px;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: 5px;
    
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
      
    }
  }
}

</style>
