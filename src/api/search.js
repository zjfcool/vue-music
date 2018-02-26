import Vue from 'vue'
import {commonParams, cb} from './config'
export function getHotKey(){
    const url ="https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
    return Vue.http.jsonp(url,{
        params: Object.assign({},commonParams,{
            uin:0,
            platform:'h5',
            needNewCode:1,
            _:1519610790143
        }),
        jsonp:cb
    })
}


export function search(query,page,zhida,perpage){
    const url="https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";
    return Vue.http.jsonp(url,{
        params:Object.assign({},commonParams,{
            w: query,
            p: page,
            perpage,
            n: perpage,
            catZhida: zhida ? 1 : 0,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            remoteplace: 'txt.mqq.all',
            uin: 0,
            needNewCode: 1,
            platform: 'h5',
            format:'jsonp',
            _:1519613241299
        }),
        jsonp:cb
    })
}