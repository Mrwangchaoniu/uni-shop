export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 定义加入购物车的方法
    addtoCart(state,goods) {
      const findResults = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResults) {
        state.cart.push(goods)
      } else {
        findResults.goods_count ++
      }
      // console.log(state.cart)
      this.commit('m_cart/saveTostorage')
    },
    // 将cart数组永久存储到本地
    saveTostorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 将购物车的最新状态存储在购物车中
    updateGoodsState(state,goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        // 将最新的状态持久化存储
        this.commit('m_cart/saveTostorage')
      }
    },
    // 更新购物车商品的数量
    updateGoodsNum(state,goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id) 
      if (findResult) {
        findResult.goods_count = goods.goods_count
        // console.log(findResult)
        // console.log(state.cart)
        // 将最新的状态持久化存储
        this.commit('m_cart/saveTostorage')
      }
    },
    // 根据id删除对应购物车商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 将最新的状态持久化存储
      this.commit('m_cart/saveTostorage')
    },
    // 修改购物车的选中状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      // 将最新的状态持久化存储
      this.commit('m_cart/saveTostorage')
    }
  }, 
  getters: {
    // 购物车中的总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((total, item)=> total += item.goods_count ,0)
    },
    // 勾选商品的总数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state === true).reduce((total, item) => total += item.goods_count,0)
    },
    // 定义结算价格
    checkedSettle(state) {
      return state.cart.filter(x => x.goods_state === true).reduce((total, item) => total += item.goods_count * item.goods_price , 0).toFixed(2)
    }
    
  }
  
  
}