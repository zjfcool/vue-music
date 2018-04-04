<template>
  <transition 
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <div class="admin">
        <div class="header">
            <span class="icon-arrow-left2" @click="back"></span>
            <div class="switch-wrapper">
                <switches :switches="switches" @active="active" :activeIndex="activeIndex"></switches>
            </div>
        </div>
        <div class="random-play" @click="playRandom">
            <span class="icon-play3"></span>
            <span>随机播放全部歌曲</span>
        </div>
        <div class="list-wrapper" ref="listWrapper">
            <scroll ref="favoriteList" :data="getFavoriteList" class="list-scroll" v-if="activeIndex===0">
                <div class="list-inner">
                    <song-list :songs="getFavoriteList" @select="selectSong"></song-list>
                </div>
            </scroll>
            <scroll ref="playHistory" :data="playHistory" class="list-scroll" v-if="activeIndex===1">
                <div class="list-inner">
                    <song-list :songs="playHistory" @select="selectSong"></song-list>
                </div>
            </scroll>
        </div>
    </div>
  </transition>
</template>
<script>
    import Switches from '@/base/switches'
    import Scroll from '@/base/scroll'
    import {mapGetters,mapActions} from 'vuex'
    import SongList from '@/base/songlist'
    import {playListMixin} from '@/assets/js/mixin'
    import Songs from '../assets/js/songs'
    export default{
        mixins: [playListMixin],
        data(){
            return {
                switches:[
                    {name:'我喜欢的'},
                    {name:'最近听的'}
                ],
                activeIndex:0
            }
        },
        components:{
            Switches,
            Scroll,
            SongList
        },
        computed:{
            ...mapGetters({
                playHistory: "getPlayHistory",
                getFavoriteList:'getFavoriteList'
            })
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length>0?'60px':'';
                this.$refs.listWrapper.style.bottom=bottom;
               
                this.$refs.favoriteList&&this.$refs.favoriteList.refresh();
                this.$refs.playHistory&&this.$refs.playHistory.refresh();
            },
            back(){
                this.$router.back();
            },
            active(index){
                this.activeIndex=index;
            },
            selectSong(item,index){
                this.insertSong(new Songs(item));
            },
            playRandom(){
                let list = this.activeIndex===0?this.getFavoriteList:this.playHistory;
                for(let i=0;i<list.length;i++){
                    list[i]=new Songs(list[i])
                }
                this.randomPlay({list});
            },
            ...mapActions([
                'insertSong',
                'randomPlay'
            ])
        },
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .admin{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: @bg-color;
        z-index: 9999;
        .header{
            position: relative;
            height: 32px;
            width: 100%;
            .icon-arrow-left2{
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                width: 32px;
                height: 32px;
                color: @active-color;
                text-align: center;
                line-height: 32px;
            }
            .switch-wrapper{
                width: 100%;
                height: 32px;
            }
        }
        .random-play{
            width: 240px;
            height: 32px;
            text-align: center;
            border: 1px solid @active-color;
            border-radius: 15px;
            margin: 4px auto;
            line-height: 32px;
        }
        .list-wrapper{
            position: fixed;
            top: 72px;
            bottom: 0;
            width: 100%;
            .list-scroll{
                height: 100%;
                overflow: hidden;
                .list-inner{
                    width: 100%;
                }
            }

        }
    }
</style>

