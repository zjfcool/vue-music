<template>
  <!-- <div class="detail-ranking">
    
  </div> -->
  <transition 
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight">
        <music-list :isRank="isRank" :data="detailRanking" :title="title" :bgImage="bgImage"></music-list>
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
                return !this.imgurl?"":this.imgurl.trim();
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
                detailRanking:[],
                imgurl:'',
                isRank:true
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
        watch:{
            detailRanking(newVal){
                this.imgurl=newVal[0].imgurl
            }
        },
        mounted(){
        }
    }
</script>
<style scoped lang="less" >
    
</style>

