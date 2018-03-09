import {playMode} from '../assets/js/config'
import {loadSearchHistory,loadPlayHistory,loadFavoriteSong} from '../assets/js/catch'
const state = {
    singer:{},
    ranking:{},
    detailRec:{},
    playing:false,
    fullScreen:false,
    playlist:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    searchHistory:loadSearchHistory(),
    playHistory:loadPlayHistory(),
    favoriteList:loadFavoriteSong()
}


export default state