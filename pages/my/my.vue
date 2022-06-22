<template>
  <view>
    <!-- 这是未登录组件 -->
    <my-login v-if="!token"></my-login>
    <!-- 这是登录后信息组件 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  import { mapState } from 'vuex'
  
  export default {
    mixins: [badge],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    }

    }
</script>

<style lang="scss">

</style>
