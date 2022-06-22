import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleabc from '@/store/abc.js'
import moduleUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_abc': moduleabc,
    'm_user': moduleUser
  }
})

export default store