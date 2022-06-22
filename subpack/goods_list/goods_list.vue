<template>
  <view class="abc">
    <view class="goods-container">
      <view v-for="(goods, i) in goodsList" :key="i" @click="goGoodsDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数的对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        // 商品数据列表
        goodsList: [],
        // 条数
        total: 0,
        // 定义节流阀
        isLoading: false
      };
    },
  
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        // 打开节流阀
        this.isLoading = true
        const {data : res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // console.log(res)
        cb && cb()
         this.isLoading = false
         // 关闭节流阀
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      goGoodsDetail(goods) {
        uni.navigateTo({
          url: '/subpack/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    onReachBottom() {
      // 判断页面数据是否加载完毕
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      if (this.isLoading) {
        return
      }
      this.queryObj.pagenum ++
        this.getGoodsList()
    },
    // 监听下拉刷新的事件
    onPullDownRefresh() {
      // 重置数据
      this.queryObj.pagenum = 0
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      // 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
      uni.$showMsg('数据刷新成功')
    }
  }
</script>

<style lang="scss">
 

</style>
