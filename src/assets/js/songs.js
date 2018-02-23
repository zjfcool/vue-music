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
}
export function createSong(musicData){
    return new Songs({
        id:musicData.songid,
        mid:musicData.songmid,
        songname:musicData.songname,
        singer:filterSinger(musicData.singer),
        imgurl:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        album:musicData.albumname,
        duration:musicData.interval,
        // audio src
        url:`http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`,
        
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