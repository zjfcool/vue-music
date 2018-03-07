const getters ={
    getSinger(state){
        return state.singer;
    },
    getPlaying(state){
        return state.playing;
    },
    getFullScreen(state){
        return state.fullScreen;
    },
    getPlaylist(state){
        return state.playlist;
    },
    getSequenceList(state){
        return state.sequenceList;
    },
    getMode(state){
        return state.mode;
    },
    getCurrentIndex(state){
        return state.currentIndex;
    },
    getCurrentSong(state){
        return state.playlist[state.currentIndex]
    },
    getRanking(state){
        return state.ranking;
    },
    getSearchHistory(state){
        return state.searchHistory;
    },
    getPlayHistory(state){
        return state.playHistory;
    },
    getFavoriteList(state){
        return state.favoriteList;
    }
}

export default getters