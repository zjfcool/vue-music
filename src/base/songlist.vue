<template>
  <div>
      <ul class="songlist">
          <li class="songitem" v-for="(item,index) in songs" :key="index" @click="selectSong(item,index)">
              <div class="sequence" v-show="isRank">
                  <span :class="rankTop(index)">{{index+1}}</span>
              </div>
              <div class="songdetail">
                <h2>{{item.songname}}</h2>
                <p>{{item.singer}}</p>
              </div>
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
            },
            isRank:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            selectSong(item,index){
                this.$emit('select',item,index);
            },
            rankTop(index){
                if(index<3){
                    return `icon-${index}`
                }
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
            justify-content: center;
            align-content: center;
            .sequence{
                width: 60px;
                text-align: center;
                line-height: 60px;
                .icon-0{
                    color: #FCEAA1;
                }
                .icon-1{
                    color: #E1E1E1;
                }
                .icon-2{
                    color: #EDBA00;
                }
            }
            .songdetail{
                flex: 1;
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
    }
</style>
