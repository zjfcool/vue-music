<template>
  <div class="player" v-show="playlist.length>0">
      <transition 
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div class="full-screen" v-show="fullScreen">
            <div class="header">
                <span class="back" @click="backMini">></span>
                <h1 class="title">{{currentSong.songname}}</h1>
                <h2 class="subtitle">{{currentSong.singer}}</h2>
            </div>
            <div class="full-bg">
                <img width="100%" height="100%" :src="currentSong.imgurl" alt="">
            </div>
            <div class="middle" @click="toggleShowMiddle">
                <transition 
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
                    <div class="middle-l" v-if="isShowCD">
                        <div class="cd-wrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.imgurl" alt="">
                            </div>
                        </div>
                    </div>
                </transition>
                <transition 
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
                    <div class="middle-r" v-if="!isShowCD">
                        歌词界面
                    </div>
                </transition>
                
            </div>
            <div class="play-wrapper">
                <div class="progress">
                    <span>{{currentTime|initTimer}}</span>
                    <progress-bar @percentChange="percentChange" :percent="percent"></progress-bar>
                    <span>{{currentSong.duration|initTimer}}</span>
                </div>               
                <div class="play-btn-group">
                    <span @click="toggleMode" :class="playmode" class="mode">

                    </span>
                    <div class="">
                        <span @click="prev" class="icon-backward2"></span>
                        <span @click="isPlay" :class="playBtn"></span>
                        <span @click="next" class="icon-forward3"></span>
                    </div>
                    <span class="icon-heart"></span>
                </div>
            </div>
        </div>
      </transition>
      <transition 
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown">
            <div class="mini-screen" v-show="!fullScreen" @click="backFullScreen">
                <div class="mini-img">
                    <img :src="currentSong.imgurl" alt="">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.songname"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="mini-btns">
                    <!-- <span @click.prevent.stop="prev" class="icon-backward2"></span> -->
                    <progress-circle :edge="edge" :percent="percent">
                        <span @click.prevent.stop="isPlay" :class="playBtn"></span>
                    </progress-circle>
                    <!-- <span @click.prevent.stop="next" class="icon-forward3"></span> -->
                </div>
                <span class="icon-menu3"></span>
            </div>
      </transition>
      <audio ref="audio" :src="currentSong.url"
        @play="isReadyPlay" 
        @timeupdate="updateTime"
        @ended="end"></audio>
  </div>
</template>
<script>
    import {mapGetters,mapMutations} from 'vuex'
    import * as types from '../store/mutationTypes'
    import ProgressBar from '../base/progressBar'
    import {playMode} from '../assets/js/config'
    import {shuffle} from '../assets/js/util'
    import ProgressCircle from '../base/progressCircle'
    
    export default{
        components: {
          ProgressBar,
          ProgressCircle  
        },
        computed: {
            fullScreen(){
                return this.getFullScreen;
            },
            playlist(){
                return this.getPlaylist;
            },
            currentSong(){
                console.log(this.getCurrentSong)
                return !this.getCurrentSong?{}:this.getCurrentSong;
            },
            cdCls(){
                return this.getPlaying?'play':'play pause';
            },
            playBtn(){
                return this.getPlaying?'icon-pause2':'icon-play3';
            },
            percent(){
                return this.currentTime/this.currentSong.duration;
            },
            playmode(){
                return this.getMode===playMode.loop?'loop':this.getMode===playMode.random?'random':'seq';
            },
            ...mapGetters([
                'getPlaylist',
                'getFullScreen',
                'getCurrentSong',
                "getPlaying",
                "getCurrentIndex",
                "getMode",
                "getSequenceList"
            ])
        },
        data(){
            return{
                currentTime:0,
                isReady:false,
                edge:32,
                isShowCD:true
            }
        },
        methods:{
            
            backMini(){
                this.setFullScreen(false);
            },
            backFullScreen(){
                this.setFullScreen(true);
            },
            isPlay(){
                if (!this.isReady) {
                    return
                }
                this.setPlaying(!this.getPlaying);
            },
            updateTime(e){
                this.currentTime = e.target.currentTime;
            },
            isReadyPlay(){
                console.log('ready play')
                this.isReady=true
            },
            prev(){
                if(!this.isReady){
                    return ;
                }
                if(this.playlist.length===1){
                    this.loop();
                    return;
                }else{
                    let index = this.getCurrentIndex-1;
                    if(index===-1){
                        index=this.playlist.length-1;
                    }
                    this.setCurrentIndex(index);
                    if(!this.getPlaying){
                        this.isPlay()
                    }
                    console.log(this.isReady)
                }
                this.isReady=false;

            },
            next(){
                if(!this.isReady){
                    return ;
                }
                if(this.playlist.length===1){
                    this.loop();
                    return;
                }else{
                    let index=this.getCurrentIndex+1;
                    if(index>this.playlist.length-1){
                        index=0;
                    }
                    this.setCurrentIndex(index)
                    if(!this.getPlaying){
                        this.isPlay()
                    }
                }
                this.isReady=false;
            },
            loop(){
                this.$refs.audio.currentTime=0;
                this.$refs.audio.play();
                this.setPlaying(true);  
            },
            end(){
                if(this.getMode===playMode.loop){
                    this.loop();
                }else{
                    this.next()
                }
            },
            percentChange(percent){
                this.currentTime=this.currentSong.duration*percent;
                this.$refs.audio.currentTime=this.currentTime;
            },
            toggleMode(){
                const mode = (this.getMode+1)%3;
                this.setMode(mode);
                let list = null;
                if(mode===playMode.random){
                    list=shuffle(this.getSequenceList);
                }else{
                    list = this.getSequenceList;
                }
                console.log(this.getSequenceList)
                this.resetCurrentIndex(list);
                this.setPlayList(list);
            },
            resetCurrentIndex(list){
                let index = list.findIndex(item=>{
                    return item.id===this.currentSong.id;
                });
                this.setCurrentIndex(index);
            },
            toggleShowMiddle(){
                this.isShowCD=!this.isShowCD
            },
            ...mapMutations({
                setFullScreen:types.SET_FULLSCREEN,
                setPlaying:types.SET_PLAYING,
                setCurrentIndex:types.SET_CURRENTINDEX,
                setMode: types.SET_MODE,
                setPlayList:types.SET_PLAYLIST
            })
        },
        watch:{
            currentSong(newSong,oldSong){
                if(!newSong.id){
                    return;
                }
                if(newSong.id===oldSong.id){
                    return;
                }
                clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    this.$refs.audio.play();
                },10)
                console.log(newSong.id)
            },
            getPlaying(newVal){
                console.log(newVal,'hh')
                const audio = this.$refs.audio;
                this.$nextTick(()=>{
                    newVal?audio.play():audio.pause();
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    @import '../assets/css/func.less';
    @play-btn-group-height:48px;
    @progress-height:32px;
    @play-wrapper-height:@play-btn-group-height+@progress-height;
    .player{
        .full-screen{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            background:@bg-color;
            color: @active-color;
            z-index: 9999;
            .header{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                height: 64px;
                .back{
                    display: block;
                    width: 32px;
                    line-height: 32px;
                    text-align: center;
                    transform: rotate(90deg);
                    font-size: @font-size-medium-x;
                    color: @active-color;
                }
                .title{
                    flex: 1;
                    margin-left: -32px;
                    text-align: center;
                    color: @active-color;
                    line-height: 32px;
                }
                .subtitle{
                    width: 100%;
                    line-height: 32px;
                    text-align: center;
                }
            }
            .full-bg{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.6;
                filter: blur(20px);
            }
            .play-wrapper{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: @play-wrapper-height;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .progress{
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: @progress-height;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &>span{
                        width: @progress-height;
                        line-height: @progress-height;
                        text-align: center;
                    }
                    &>div{
                        flex: 1;
                    }
                }
                .play-btn-group{
                    position: absolute;
                    width: 100%;
                    height: @play-btn-group-height;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    color: @active-color;
                    box-sizing: border-box;
                    span{
                        display: inline-block;
                        line-height: @play-btn-group-height;
                        font-size: @font-size-large-x;
                        text-align: center;
                    }
                    .mode{
                        width: @play-btn-group-height;
                        text-align: center;
                    }
                    
                    .seq{
                        background: url(../assets/images/seq.png) no-repeat center;   
                    }
                    .random{
                        background: url(../assets/images/random.png) no-repeat center;   
                    }
                    .loop{
                        background: url(../assets/images/loop.png) no-repeat center;   
                    }
                    .seq,.random,.loop{
                        background-size: 32px 32px;
                    }
                    &>div{
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        span{
                            flex: 1;
                        }
                    }
                    .icon-heart{
                        width: @play-btn-group-height;
                    }
                }
            }
            
        }
        .middle{
            position: fixed;
            top: 64px;
            bottom: @play-wrapper-height;
            width: 100%;
            overflow: hidden;
            .middle-l{
                display: inline-block;
                width: 100%;
                height: 0;
                padding-top: 80%;
                vertical-align: top;
                position: absolute;
                top: 0;
                left: 0;
                .cd-wrapper{
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    .cd{
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        border: 10px solid rgba(255,255,255,.1);
                        border-radius: 50%;
                        &.play{
                            animation: rotate 20s linear infinite;
                        }
                        @keyframes rotate {
                            from{
                                transform: rotate(0deg);
                            }
                            to{
                                transform: rotate(360deg);
                            }
                        }
                        &.pause{
                            animation-play-state: paused;
                        }
                        img{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .middle-r{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: inline-block;
                overflow: hidden;
                vertical-align: top;
            }
        }
        .mini-screen{
            position: fixed;
            left: 0;
            bottom: 0;
            background: @bg-color;
            z-index:99999;
            height: @play-btn-group-height;
            width: 100%;
            display: flex;
            justify-content: center;
            align-content: center;
            .mini-img{
                width: @play-btn-group-height;
                height: 100%;
                img{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .text{
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                h2,p{
                    flex: 1;
                    padding-left: 12px;
                    font-size: @font-size-medium;
                    color: #ddd;
                    width: 100%;
                    .textOverflow;
                }
                h2{
                    padding-top: 4px;
                }
            }
            .mini-btns{
                flex: 1;
                text-align: right;
                line-height: @play-btn-group-height;
                span{
                    position: absolute;
                    top: 16px;
                    right: 0;
                    display: inline-block;
                    width: 32px;
                    text-align: center;
                }
                
            }
            .icon-menu3{
                width: @play-btn-group-height;
                height: 100%;
                text-align: center;
                color: @active-color;
                line-height: @play-btn-group-height;
            }
        }
    }
</style>

