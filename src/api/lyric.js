import {commonParams} from './config'
import Vue from 'vue'
export function getLyric(songmid){
    return Vue.http.get('/api/lyric',{
        params:Object.assign({},commonParams,{
            songmid,
            needNewCode:0,
            platform:'yqq',
            format:'json',
            loginUin:0,
            hostUin:0,
            pcachetime:1520494850815
        })
    })
}
