<template>
    <div class="singer-detail" ref="singerDetail">
        <div class="singer-header">
            <div class="back" @click="back">
                <span class="icon-arrow-left2"></span>
            </div>
            <div class="title">
                {{title}}
            </div>
        </div>
        <div class="bg-header" :style="bgStyle" ref="header">
            <div class="play" @click="randomPlayList" ref="play">
                <span class="icon-play3"></span>
                <span>随机播放全部歌曲</span>
            </div>
            <div class="filter" ref="filter">
            </div>
        </div>
        <div class="layer" ref="layer"></div>
        <scroll 
            class="scroll"
            @scroll="scroll"
            :probeType="probeType" 
            :data="data" 
            :listenScroll="listenScroll"
            ref="scroll">
            <song-list :isRank="isRank" :songs="data" @select="selectSong"></song-list>
            <div v-show="!data.length" class="loading-container">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>
<script>
    import Scroll from '../base/scroll'
    import SongList from '../base/songlist'
    import dom from '../assets/js/dom'
    import Loading from '../base/loading/index'
    import {mapActions} from 'vuex'
    import {playListMixin} from '../assets/js/mixin'
    const RESET_HEIGHT=30;
    const transform=dom.compBrowser('transform');
    const backdrop=dom.compBrowser('backdrop');
    export default{
        mixins:[playListMixin],
        created(){
            this.probeType=3;
            this.listenScroll=true;
        },
        components: {
            Scroll,
            SongList,
            Loading
        },
        computed: {
            bgStyle(){
                return `background:url(${this.bgImage}) no-repeat top;background-size:100%;`
            },
        },
        props:{
            data:{
                type:Array,
                default:[]
            },
            title:{
                type:String,
                default:''
            },
            bgImage:{
                type:String,
                default:''
            },
            isRank:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                scrollY:0
            }
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist>0?'48px':'';
                this.$refs.scroll.$el.style.bottom=bottom;
                this.$refs.scroll.refresh();
            },
            back(){
                this.$router.back();
            },
            scroll(pos){
                this.scrollY=pos.y;
            },
            selectSong(item,index){
                this.selectPlay({
                    list:this.data,
                    index
                })
            },
            randomPlayList(){
                this.randomPlay({
                    list:this.data
                })
            },
            ...mapActions([
                'selectPlay',
                'randomPlay'
            ])
        },
        watch:{
            scrollY(newY){
                let translateY=Math.max(this.maxTranslateY,newY);
                let zIndex=0;
                let scale=1;
                let blur =0;
                
                let percent = Math.abs(newY/this.imgH);
                if(newY>0){
                    scale=percent+1
                    zIndex=1;
                }else{
                    blur=Math.min(20,percent*20);
                }
                this.$refs.layer.style[transform]=`translateY(${translateY}px)`;
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
                
                if(newY<this.maxTranslateY){
                    zIndex=1;
                    this.$refs.header.style.paddingTop=0;
                    this.$refs.header.style.height=RESET_HEIGHT+'px';
                    this.$refs.play.style.display="none";
                }else{
                    this.$refs.header.style.paddingTop='70%';
                    this.$refs.header.style.height=0;
                    this.$refs.play.style.display="";
                }
                this.$refs.header.style[transform] = `scale(${scale})`
                this.$refs.header.style.zIndex=zIndex;
            }
        },
        mounted(){
            this.imgH = this.$refs.header.clientHeight;
            this.totalH = this.$refs.singerDetail.clientHeight;
            this.$refs.layer.style.top=this.$refs.scroll.$el.style.top=this.imgH+'px';
            this.$refs.scroll.$el.style.height=this.totalH-this.imgH+'px';
            // 向上滑动最大距离
            this.maxTranslateY=-this.imgH+RESET_HEIGHT;
            
            
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    @import '../assets/css/func.less';
    .singer-detail{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        background: @bg-color;
        z-index: 9999;
        .singer-header{
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-content: center;
            width: 100%;
            .back{
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                z-index: 3;
                color: @active-color;
            }
            .title{
                flex: 1;
                margin-left:-30px; 
                line-height: 30px;
                text-align: center;
                z-index: 2;
                .textOverflow;
                color: @active-color;
            }
            
        }
        .bg-header{
            position: absolute;
            top: 0;
            width: 100%;
            height: 0;
            padding-top:70%;
            transform-origin:top;
            background-size:100% auto;
            .play{
                position: absolute;
                bottom: 24px;
                width: 200px;
                border: 1px @active-color solid;
                text-align: center;
                height: 32px;
                line-height: 32px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9;
                border-radius: 12px;
                color: @active-color;
            }
            .filter{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,.25)
            } 
            // z-index:1;
        }
        .layer{
            position: relative;
            width: 100%;
            height: 100%;
            background: @bg-color;

        }
        .scroll{
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            padding: 8px 0;
            .loading-container{
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translate3d(0,-50%,0);

            }
        }
    }
</style>

