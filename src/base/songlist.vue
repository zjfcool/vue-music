<template>
  <div>
      <ul class="songlist">
          <li class="songitem" v-for="(item,index) in songs" :key="index" @click="selectSong(item,index)">
              <h2>{{item.songname}}</h2>
              <p>{{item.singer}}</p>
          </li>
      </ul>
  </div>
</template>
<script>
    export default{
        props:{
            songs:{
                type:Array,
                default:[]
            }
        },
        methods:{
            selectSong(item,index){
                this.$emit('select',item,index);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .songlist{
        width: 100%;
        padding: 8px 0;
        li{
            width: 90%;
            margin:0 auto 8px;
            height: 60px;
            display: flex;
            flex-direction: column;
            h2,p{
                flex: 1;
                font-size: @font-size-small;
                line-height: 30px;
            }
            p{
                color: #868282;
            }
        }
    }
</style>
