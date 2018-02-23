import * as types from './mutationTypes'

const mutations = {
    [types.SINGER_LIST](state,val){
        state.singer=val;
    },
    [types.SET_PLAYING](state,bool){
        state.playing=bool
    },
    [types.SET_FULLSCREEN](state,bool){
        state.fullScreen=bool;
    },
    [types.SET_PLAYLIST](state,arrData){
        state.playlist=arrData;
    },
    [types.SET_SEQUENCELIST](state,arrData){
        state.sequenceList=arrData;
    },
    [types.SET_MODE](state,mode){
        state.mode=mode;
    },
    [types.SET_CURRENTINDEX](state,index){
        state.currentIndex=index;
    },
    [types.SET_RANKING](state,arrData){
        state.ranking=arrData;
    }
}

export default mutations