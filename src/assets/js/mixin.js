import {mapGetters} from 'vuex'
export const playListMixin={
    computed: {
        ...mapGetters([
            'getPlaylist'
        ])
    },
    mounted () {
        this.handlePlaylist(this.getPlaylist)  
    },
    activated(){
        this.handlePlaylist(this.getPlaylist) 
    },
    watch:{
        getPlaylist(newPlaylist){
            this.handlePlaylist(newPlaylist) 
        }
    },
    methods:{
        handlePlaylist(playlist){
            throw Error('commponent must have handlePlaylist method');
        }
    }
}