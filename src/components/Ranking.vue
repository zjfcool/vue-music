<template>
  <div class="rank" ref="rank">
        <scroll class="rank-wrapper" :data="rankData" ref="ranklist">
            <ul class="rank-list">
                <li @click="detailRanking(rankItem.id)" v-for="rankItem in rankData" :key="rankItem.id" class="rank-item">
                    <div class="left_item">
                        <a href="javascript:void(0);">
                            <img v-lazy="rankItem.picUrl" alt="">
                            <span>
                                <i></i>
                                {{rankItem.listenCount|initNum}}
                            </span>
                        </a>
                    </div>
                    <div class="right_item">
                        <div>
                            <h3>{{rankItem.topTitle}}</h3>
                            <p v-for="(songList,index) in rankItem.songList" :key="index">
                                <span>{{index+1}}</span>
                                <span class="music-name">{{songList.songname}}</span>
                                <span class="singer-name">{{songList.singername}}</span>
                            </p>
                        </div>
                        <i class="arrow-right"></i>
                    </div>
                </li>
            </ul>
        </scroll>
        <router-view>
        </router-view>
  </div>
</template>
<script>
    import {ERR_OK} from '../api/config'
    import {getRanking,getChildRanking} from '../api/ranking'
    import Scroll from '../base/scroll'
    import {playListMixin} from '../assets/js/mixin'
    import { playMode } from '../assets/js/config';
    export default{
        mixins: [playListMixin],
        data(){
            return {
                rankData:[]
            }
        },
        components:{
            Scroll
        },
        created(){
            this._jsonpRanking();
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length>0?'48px':'';
                this.$refs.rank.style.bottom = bottom;
                this.$refs.ranklist.refresh();
            },
          _jsonpRanking(){
              getRanking().then(res=>{
                  if(res.body.code===ERR_OK){
                      this.rankData=res.body.data.topList;
                  }
              },err=>{
                  console.log(err)
              })
          },
          detailRanking(id){
              this.$router.push({
                  path:'/ranking/details'
              })
              getChildRanking(id).then(res=>{
                  console.log(res.body)
              },err=>{
                  console.log(err);
              })
          }  
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/func.less';
    @rank-item-bgcolor:#ddd;
    @rank-item-color:#000;
    @rank-item-h:100px;
    .rank{
        position: fixed;
        width: 100%;
        top: 64px;
        bottom: 0;
    }
    .rank-wrapper{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .rank-list{
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 24px 18px;
            .rank-item{
                position: relative;
                width: 100%;
                height: @rank-item-h;
                margin-bottom: 12px;
                background: @rank-item-bgcolor;
                color: @rank-item-color;
                display: flex;
                justify-content: center;
                align-content: center;
                .left_item{
                    width: @rank-item-h;
                    height: @rank-item-h;
                    a{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        position: relative;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        span{
                            position: absolute;
                            display: inline-block;
                            left: 5px;
                            bottom: 7px;
                            line-height: 12px;
                            color: #fff;
                            opacity: .6;
                            font-size: 9px;
                            z-index: 10;
                        }
                    }
                }
                .right_item{
                    height: 100px;
                    box-sizing: border-box;
                    overflow: hidden;
                    flex: 1;
                    &>div{
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        padding: 0 12px;
                        overflow: hidden;
                        h3{
                            height: 24px;
                            line-height: 24px;
                            text-align: left;
                            font-size: 16px;
                            margin: 4px 0;
                            width: 100%;
                            overflow: hidden;
                        }
                        p{
                            width: 100%;
                            height: 21px;
                            font-size: 14px;
                            color: rgba(0,0,0,.5);
                            .textOverflow;
                            span{
                                display: block;
                                float: left;
                                text-align: left;
                                padding-right: 8px;
                            }
                            .music-name{
                                width: 30%;
                                color: @rank-item-color;
                                .textOverflow;
                            }
                            .singer-name{
                                width: 33%;
                                .textOverflow;
                            } 
                        }
                    }
                    .arrow-right{
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        margin-top: -4px;
                        .arrowRignt;
                    }
                }
            }
        }
    }
</style>

