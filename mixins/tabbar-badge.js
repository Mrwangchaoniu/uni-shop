import { mapGetters } from 'vuex'

export default {
    computed: {
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total() {
        this.setBadge()
      }
    },
    // 当页面一显示就会触发
    onShow() {
      this.setBadge()
    },
    methods: {
      setBadge() {
        // 为当前页面的tabbar页面设置数字图标
        uni.setTabBarBadge({
          index: 2,
          // text的值必须是字符串，不是一个数字
          text: this.total + ''
        })
      }
    }
}