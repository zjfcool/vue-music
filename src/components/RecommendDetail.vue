<template>
  <transition 
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
      <music-list :data="recommendDetail" :bgImage="bgImage" :title="title"></music-list>
  </transition>
</template>
<script>
    import MusicList from './MusicList'
    import {getRecDetail} from '../api/recommend'
    import {mapGetters} from 'vuex'
    import {ERR_OK} from '../api/config'
    import {createSong} from '../assets/js/songs.js'
    export default{
        components: {
            MusicList
        },
        computed: {
            bgImage(){
                return this.detailRec.cover;
            },
            title(){
                return this.detailRec.title;
            },
            ...mapGetters({
                detailRec:'getRecommend'
            })
        },
        created(){
            this._jsonpRecDetail()
        },
        data(){
            return {
                recommendDetail:[]
            }
        },
        methods: {
             _jsonpRecDetail(){
                if(!this.detailRec.content_id){
                    this.$router.push({
                        path:'/recommend'
                    })
                    return;
                }
                getRecDetail(this.detailRec.content_id).then(res=>{
                    if(res.body.code===ERR_OK){
                        let songlist = res.body.cdlist[0].songlist;
                        let len=songlist.length;
                        let songs=[];
                        
                        for(let i=0;i<len;i++){
                            songs.push(createSong(songlist[i]))
                        }
                        this.recommendDetail=songs;
                    }
                },err=>{
                    console.log(err)
                })
            },
        }
    }
</script>
<style lang="less" scoped>

</style>

