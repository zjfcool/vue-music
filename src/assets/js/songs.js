import {getLyric} from '@/api/lyric'
import {ERR_OK} from '@/api/config'
import {Base64} from 'js-base64'
export default class Songs{
    constructor({id,mid,songname,singer,imgurl,album,duration,url}){
        this.id=id;
        this.mid = mid;
        this.songname = songname;
        this.singer = singer;
        this.imgurl = imgurl;
        this.album = album;
        this.duration = duration;
        this.url = url;
    }
    getCurrentLyric(){
        if(this.lyric){
            return Promise.resolve(this.lyric);
        }
        return new Promise((resolve,reject)=>{
            getLyric(this.mid).then(res=>{
                if(res.body.retcode===ERR_OK){
                    this.lyric=Base64.decode(res.body.lyric);
                    resolve(this.lyric)
                }else{
                    reject('no lyric');
                }
                
            })
        })
        
    }
}
export function createSong(musicData){
    return new Songs({
        id:musicData.songid?musicData.songid:musicData.id,
        mid:musicData.songmid?musicData.songmid:musicData.mid,
        songname:musicData.songname?musicData.songname:musicData.name,
        singer:filterSinger(musicData.singer),
        imgurl:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid?musicData.albummid:musicData.album.mid}.jpg?max_age=2592000`,
        album:musicData.albumname,
        duration:musicData.interval,
        // audio src
        url:`http://thirdparty.gtimg.com/C100${musicData.songmid?musicData.songmid:musicData.mid}.m4a?fromtag=38`,
        
    })
}
function filterSinger(singer){
    let re=[];
    if(!singer){
        return '';
    }
    singer.forEach(item=>{
        re.push(item.name)
    })
    return re.join('/')
}