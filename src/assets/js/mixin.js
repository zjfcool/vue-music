import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from "./config";
import * as types from "../../store/mutationTypes";
import { shuffle } from "./util";
import SearchBox from '../../base/searchBox'
import Suggest from '@/components/Suggest'
import SearchList from '../../base/searchlist'

export const playListMixin = {
    computed: {
        ...mapGetters([
            'getPlaylist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.getPlaylist)
    },
    activated() {
        this.handlePlaylist(this.getPlaylist)
    },
    watch: {
        getPlaylist(newPlaylist) {
            this.handlePlaylist(newPlaylist)
        }
    },
    methods: {
        handlePlaylist(playlist) {
            throw Error('commponent must have handlePlaylist method');
        }
    }
}
export const playerMixin = {
    computed: {
        playmode() {
            return this.getMode === playMode.loop ?
                "loop" :
                this.getMode === playMode.random ? "random" : "seq";
        },
        playlist() {
            return this.getPlaylist;
          },
        currentSong() {
            return !this.getCurrentSong ? {} : this.getCurrentSong;
          },
        ...mapGetters([
            "getMode",
            "getSequenceList",
            "getCurrentSong",
            "getPlaying",
            "getPlaylist",
            'getFavoriteList'
        ])
    },
    methods:{
        isFavorite(song){
            let index=this.getFavoriteList.findIndex((item)=>{
                return item.id===song.id;
            })
            return index>-1;
        },
        toggleHeart(song){
            if(this.isFavorite(song)){
                this.deleteFavorite(song)
            }else{
                this.saveFavorite(song);
            }
        },
        toggleCls(song){
            if(this.isFavorite(song)){
                return 'active'
            }else{
                return ''
            }
        },
        toggleMode() {
            const mode = (this.getMode + 1) % 3;
            this.setMode(mode);
            let list = null;
            if (mode === playMode.random) {
              list = shuffle(this.getSequenceList);
            } else {
              list = this.getSequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlayList(list);
          },
          resetCurrentIndex(list) {
            let index = list.findIndex(item => {
              return item.id === this.currentSong.id;
            });
            this.setCurrentIndex(index);
          },
          ...mapMutations({
            setCurrentIndex: types.SET_CURRENTINDEX,
            setMode: types.SET_MODE,
            setPlayList: types.SET_PLAYLIST,
            setPlaying: types.SET_PLAYING,
          }),
          ...mapActions([
              'deleteFavorite',
              'saveFavorite'
          ])
    }
}
export const searchMixin = {
    data(){
        return{
            searchQuery:'',
        }
    },
    computed:{
        ...mapGetters({
            searchHistory:'getSearchHistory'
        })  
    },
    components: {
        SearchBox,
        Suggest,
        SearchList,
    },
    methods:{
        query(data){
            this.searchQuery=data;
        },
        selectSearchList(query){
            this.saveSearch(query);
        },
        beforeScroll(){
            this.$refs.searchBox.inputBlur();
        },
        selectItem(item){
            this.$refs.searchBox.setQuery(item);
        },
        deleteItem(item){
            this.deleteSearch(item);
        },
        clearHistory(){
            this.$refs.confirm.show();
        },
        ...mapActions({
            saveSearch:'saveSearchHis',
            deleteSearch:'deleteSearchHis',
            clearSearch:'clearSearchHis'
        })
    }
}
