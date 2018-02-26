import * as types from './mutationTypes'
import {playMode} from '../assets/js/config'
import {shuffle} from '../assets/js/util'
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
    }
}

export default actions