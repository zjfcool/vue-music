import * as types from './mutationTypes'
import {playMode} from '../assets/js/config'
import {shuffle} from '../assets/js/util'
import { saveSearchHistory,
        deleteSearchHistory,
        clearSearchHistory,
        savePlayHistory,
        deleteFavoriteSong,
        saveFavoriteSong } from '../assets/js/catch';
function findIndex(list,song){
    return list.findIndex(item=>{
        return item.id === song.id;
    })
}
const actions={
    selectPlay({commit,state},{list,index}){
        commit(types.SET_SEQUENCELIST,list);
        if(state.mode===playMode.random){
            let randomList = shuffle(list)
            commit(types.SET_PLAYLIST,randomList);
            index=findIndex(randomList,list[index]);
        }else{
            commit(types.SET_PLAYLIST,list);
        }
        commit(types.SET_CURRENTINDEX,index);
        commit(types.SET_PLAYING,true);
        commit(types.SET_FULLSCREEN,true)
    },
    randomPlay({commit},{list}){
        commit(types.SET_SEQUENCELIST,list);
        commit(types.SET_MODE,playMode.random);
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList);
        commit(types.SET_CURRENTINDEX,0);
        commit(types.SET_PLAYING,true);
        commit(types.SET_FULLSCREEN,true)
    },
    insertSong({commit,state},song){
        let playList=state.playlist.slice();
        let sequenceList = state.sequenceList.slice();
        let currentIndex=state.currentIndex;
        let fpIndex=findIndex(playList,song);
        let currentSong = playList[currentIndex];
        // 插入歌曲索引+1
        currentIndex++;
        playList.splice(currentIndex,0,song);
        if(fpIndex>-1){
            if(currentIndex>=fpIndex){
                playList.splice(fpIndex,1);
                currentIndex--;
            }else{
                playList.splice(fpIndex+1,1);
            }
        }
        let currentSIndex=findIndex(sequenceList,currentSong);
        let fsIndex=findIndex(sequenceList,song);
        sequenceList.splice(currentSIndex,0,song);
        if(fsIndex>-1){
            if(currentSIndex>=fsIndex){
                sequenceList.splice(fsIndex,1);
            }else{
                sequenceList.splice(fsIndex+1,1);
            }
        }
        commit(types.SET_SEQUENCELIST,sequenceList);
        commit(types.SET_PLAYLIST,playList);
        commit(types.SET_CURRENTINDEX,currentIndex);
        commit(types.SET_PLAYING,true);
        commit(types.SET_FULLSCREEN,true)
    },
    saveSearchHis({commit},query){
        commit(types.SET_SEARCH_HISTORY,saveSearchHistory(query))
    },
    deleteSearchHis({commit},query){
        commit(types.SET_SEARCH_HISTORY,deleteSearchHistory(query))
    },
    clearSearchHis({commit}){
        commit(types.SET_SEARCH_HISTORY,clearSearchHistory());
    },
    deleteSong({commit,state},song){
        let playlist = state.playlist.slice();
        let sequenceList = state.sequenceList.slice();
        let currentIndex = state.currentIndex;
        let pIndex = findIndex(playlist,song);
        playlist.splice(pIndex,1);
        let sIndex=findIndex(sequenceList,song);
        sequenceList.splice(sIndex,1);
        if(pIndex<currentIndex||currentIndex===playlist.length){
            currentIndex--
        }
        commit(types.SET_CURRENTINDEX,currentIndex);
        commit(types.SET_PLAYLIST,playlist);
        commit(types.SET_SEQUENCELIST,sequenceList);
        // 判断播放列表为0时
        if(!playlist.length){
            commit(types.SET_PLAYING,false);
        }else{
            commit(types.SET_PLAYING,true);
        }
    },
    deleteSongList({commit}){
        commit(types.SET_CURRENTINDEX,-1);
        commit(types.SET_PLAYLIST,[]);
        commit(types.SET_SEQUENCELIST,[]);
        commit(types.SET_PLAYING,false);
    },
    savePlayHis({commit},song){
        commit(types.SET_PLAY_HISTORY,savePlayHistory(song))
    },
    saveFavorite({commit,state},song){
        commit(types.SET_FAVORITE_LIST,saveFavoriteSong(song));
    },
    deleteFavorite({commit,state},song){
        commit(types.SET_FAVORITE_LIST,deleteFavoriteSong(song))
    }
}

export default actions