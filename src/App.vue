<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo.png" width="32px" height="32px">
    </div>
    <nav-list></nav-list>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import NavList from '@/components/NavList'
import Player from '@/components/player'
export default {
  name: 'App',
  components:{
    NavList,
    Player
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
