<template>
  <!-- <div class="detail-ranking">
    
  </div> -->
  <transition 
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight">
        <music-list :data="detailRanking" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {createSong} from '../assets/js/songs'
    import {getChildRanking} from '../api/ranking'
    import MusicList from './MusicList'
    export default{
        computed: {
            title(){
                return this.getRanking.topTitle
            },
            bgImage(){
                return !this.getRanking.picUrl?"":this.getRanking.picUrl.trim();
            },
            ...mapGetters(['getRanking'])
        },
        components: {
            MusicList
        },
        created(){
            this._getDetailRanking();
        },
        data(){
            return{
                detailRanking:[]
            }
        },
        methods:{
            _getDetailRanking(){
                if(!this.getRanking.id){
                    this.$router.push('/ranking');
                    return;
                }
                getChildRanking(this.getRanking.id).then(res=>{
                  let songList = res.body.songlist;
                  let len = songList.length;
                  let songs=[];
                  for(let i=0;i<len;i++){
                      songs.push(createSong(songList[i].data))
                  }
                  this.detailRanking=songs;
              },err=>{
                  console.log(err);
              })
            }
        },
        mounted(){
            
            
        }
    }
</script>
<style scoped lang="less" >
    .detail-ranking{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
    }
</style>

