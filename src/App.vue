<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo.png" width="32px" height="32px">
      <span class="icon-user" @click="toAdmin"></span>
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
  },
  methods: {
    toAdmin(){
      this.$router.push({
        path:'/admin'
      })
    }
  }
}
</script>

<style lang="less">
  @import './assets/css/index.less';
  @import './assets/css/variable.less';
  .header{
    position: relative;
    width: 100%;
    height: 32px;
    text-align: center;
    .icon-user{
      position: absolute;
      top: 0;
      right: 0;
      font-size: @font-size-large;
      padding: 7px 10px;
    }
  }
</style>
