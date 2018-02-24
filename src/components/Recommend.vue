<template>
  <div class="recommond" ref="recommond">
    <scroll :data="recList" ref="recommendContainer" class="recommend-container">
        <div>
                <slider @load-image="loadImage" :sliderData="sliderData" ></slider>
                <h3 class="song_title">热门歌曲推荐</h3>
                <ul class="rec-list">
                    <li class="rec-item" v-for="(item,index) in recList" :key="index">
                        <div class="left-item">
                                <a class="img_container" href="javascript:void(0);">
                                    <img v-lazy="item.cover" alt="">
                                </a>
                        </div>
                        <div class="right-item">
                            <p>{{item.title}}</p>
                            <p>{{item.listen_num|initNum}}</p>
                        </div>
                        <i class="arrow-right"></i>
                    </li>
                </ul>
                <div class="loading-container" v-show="!recList.length">
                    <loading></loading>
                </div>
        </div>
    </scroll>
  </div>
</template>
<script>
    import Slider from '../base/slider'
    import {ERR_OK} from '../api/config'
    import {getRecommend,getRecList} from '../api/recommend'
    import Scroll from '../base/scroll'
    import Loading from '../base/loading/index'
    import {playListMixin} from '../assets/js/mixin'
    export default {
        name:'Recommend',
        mixins:[playListMixin],
        data(){
            return {
                sliderData:[],
                recList:[]
            }
        },
        components:{
            Slider,
            Loading,
            Scroll
        },
        created(){
            this._jsonpRecommend();
            this._jsonpRecList();
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length>0?'48px':'';
                this.$refs.recommond.style.bottom=bottom;
                this.$refs.recommendContainer.refresh();
            },
            _jsonpRecommend(){
                getRecommend().then(res=>{
                    if(res.body.code===ERR_OK){
                        this.sliderData=res.body.data.slider;
                    }
                },err=>{
                    console.log(err);
                })
            },
            _jsonpRecList(){
                getRecList().then(res=>{
                    if(res.body.code===ERR_OK){
                        this.recList=res.body.recomPlaylist.data.v_hot; 
                        console.log(this.recList)
                    }
                },err=>{
                    console.log(err);
                })
            },
            loadImage(){
                this.$refs.recommendContainer.refresh();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    @import '../assets/css/func.less';
    .recommond{
        position: fixed;
        width: 100%;
        bottom: 0;
        top: 64px;
    }
    .recommend-container{
        height: 100%;
        overflow: hidden;
    }
    .song_title{
        text-align: center;
        font-size: 14px;
        color: @active-color;
        margin: 4px 0;
    }
    .loading-container{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        z-index: 999;
        text-align: center;
        background: rgba(0,0,0,.35);
    }
    .rec-list{
        box-sizing: border-box;
        width: 100%;
        padding: 0 12px;
        .rec-item{
            position: relative;
            width: 100%;
            height: 100px;
            margin-bottom: 8px;
            display: flex;
            justify-content: center;
            align-content: center;
            .left-item{
                position: relative;
                width: 100px;
                height: 100px;
                .img_container{
                    display: block;
                    width: 100%;
                    height: 100%;
                    img{
                        display: block;
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .right-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                p{
                    box-sizing: border-box;
                    flex: 1;
                    text-align: left;
                    padding:12px 14px 0 8px;
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
</style>

