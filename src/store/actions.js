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
    }
}

export default actions