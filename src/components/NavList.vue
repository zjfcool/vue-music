<template>
  <div class="nav-list">
      <router-link :to="{path:'/recommend'}" tag="div">推荐</router-link>
      <router-link :to="{path:'/singer'}" tag="div">歌手</router-link>
      <router-link :to="{path:'/ranking'}" tag="div">排行</router-link>
      <router-link :to="{path:'/search'}" tag="div">搜索</router-link>
  </div>
</template>
<script>
    export default{

    }
</script>
<style scoped lang="less">
    @import '../assets/css/variable.less';
    .nav-list{
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        div{
            flex: 1;
            text-align: center;
            height: 32px;
            line-height: 32px;
            &.router-link-active{
                color: @active-color;
            }
        }
    }
</style>

