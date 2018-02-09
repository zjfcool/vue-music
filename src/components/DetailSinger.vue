<template>
    <transition 
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight">
        <music-list :data="musicList" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>
<script>
    import MusicList from './MusicList'
    import {getSingerDetailList} from '../api/singer'
    import {createSong} from '../assets/js/songs'
    import {mapGetters} from 'vuex'
    export default{
        created(){
            this._getDetail()
        },
        components: {
            MusicList
        },
        data(){
            return {
                musicList:[]
            }
        },
        computed:{
            title(){
                return !this.getSinger.name?"":this.getSinger.name.trim();
            },
            bgImage(){
                return !this.getSinger.imgURL?"":this.getSinger.imgURL.trim();
            },
            ...mapGetters([
                'getSinger'
            ])
        },
        methods:{
            _getDetail(){
                if(!this.getSinger.id){
                    this.$router.push({
                        path:'/singer'
                    })
                    return;
                }
                getSingerDetailList(this.getSinger.id).then(res=>{
                    this.musicList=this._normalizeDetail(res.body.data.list);
                },err=>{
                    console.log(err);
                })
            },
            _normalizeDetail(list){
                let re=[];
                for(let i=0;i<list.length;i++){
                    let {musicData}=list[i];
                    re.push(createSong(musicData))
                }
                return re;
            }
        }
    }
</script>
<style scoped lang="less">
    // @import '../assets/css/variable.less';
</style>

