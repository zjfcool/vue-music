import {commonParams,cb} from './config'
import Vue from 'vue'

export function getSingerList(){
   return  Vue.http.jsonp("https://c.y.qq.com/v8/fcg-bin/v8.fcg",{
        params:Object.assign({},commonParams,{
            channel:"singer",
            page:"list",
            key:"all_all_all",
            pagesize:100,
            pagenum:1,
            loginUin:0,
            hostUin:0,
            format:'jsonp',
            platform:'yqq',
            needNewCode:0
        }),
        jsonp:cb
    })
}
export function getSingerDetailList(id){
    return  Vue.http.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",{
        params:Object.assign({},commonParams,{
            begin:0,
            num:30,
            loginUin:0,
            hostUin:0,
            format:'jsonp',
            platform:'yqq',
            needNewCode:0,
            singermid:id,
            songstatus:1,
            order:'listen'
        }),
        jsonp:cb
    })
}