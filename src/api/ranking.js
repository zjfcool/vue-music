import Vue from 'vue'
import {commonParams, cb} from './config'
export default function(){
    return Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',{
        params:Object.assign({},commonParams,{
            uin:0,
            format:'jsonp',
            _:1517878864117
        }),
        jsonp:cb
    })
}