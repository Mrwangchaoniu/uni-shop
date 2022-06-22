export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 存储从购物车跳转到登录页的路径
    redirectInfo: {}
  }),
  mutations: {
    // 更新收获地址
    updateAddress(state, address) {
      state.address = address
      // 触发将数据持久存储在本地
      this.commit('m_user/saveaddressToStorage')
    },
    // 将address永久存储在本地
    saveaddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新userinfo的数据
    updateUserinfo(state,userinfo) {
      state.userinfo = userinfo
      // 调用方法，将这个数据永久存储在本地
      this.commit('m_user/saveUserinfoToStorage')
    },
    saveUserinfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    // 定义更新token字符串
    updateToken(state,token) {
      state.token = token
      // 将token永久存储在本地
      this.commit('m_user/sataTokenToStorage')
    },
    // 定义将token永久存储在本地的方法
    sataTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新路径的方法
    updateRediredtInfo(state, newredirectInfo) {
      state.redirectInfo = newredirectInfo  
    }
  },
  getters: {
    // 收获地址
    addressStr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
     
    }
   
  }
}