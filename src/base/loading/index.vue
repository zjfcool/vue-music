<template>
  <div class="loading">
      <img src="./bars.svg" alt="">
      <p>{{loadingMsg}}</p>
  </div>
</template>
<script>
    export default{
        props:{
            loadingMsg:{
                type:String,
                default:"正在加载..."
            }
        }
    }
</script>
<style lang="less" scoped>
    .loading{
        width: 100%;
        text-align: center;
        background: rgba(0,0,0,0.55);
        img{
            width: 32px;
        }
        p{
            text-align: center;
            color: #ddd;
        }
    }
</style>

