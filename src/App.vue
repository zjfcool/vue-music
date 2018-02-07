<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo.png" width="32px" height="32px">
    </div>
    <nav-list></nav-list>
    <transition 
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutRight"
      mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import NavList from '@/components/NavList'
export default {
  name: 'App',
  components:{
    NavList
  }
}
</script>

<style lang="less">
  @import './assets/css/index.less';
  @import './assets/css/variable.less';
  .header{
    width: 100%;
    height: 32px;
    text-align: center;
  }
</style>
