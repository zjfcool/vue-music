import storage from 'good-storage'
const SEARCH_KEY='__search__';
const SEARCH_MAX_LEN=15;
const PLAY_KEY='__play__';
const PLAY_MAX_LEN=15;
const FAVORITE_KEY='__favorite__';
const FAVORITE_MAX_LEN=15;

function insertArr(arr,val,compare,maxLen){
    const index=arr.findIndex(compare);
    if(index===0){
        return ;
    }
    // 如果原数组中存在并且index大于0
    if(index>0){
        arr.splice(index,1);
    }
    arr.unshift(val)
    if(maxLen&&arr.length>maxLen){
        arr.pop()
    }
}
function deleteFromArr(arr,compare){
    const index=arr.findIndex(compare);
    if(index>-1){
        arr.splice(index,1)
    }
}

// 获取搜索历史
export function loadSearchHistory(){
    return storage.get(SEARCH_KEY,[]);
}
// 保存搜索历史
export function saveSearchHistory(query){
    let searches=storage.get(SEARCH_KEY,[]);
    insertArr(searches,query,(item)=>{
        return item===query
    },SEARCH_MAX_LEN);
    storage.set(SEARCH_KEY,searches);
    return searches;
}
// 删除搜索历史
export function deleteSearchHistory(query){
    let searches=storage.get(SEARCH_KEY,[]);
    deleteFromArr(searches,item=>{
        return item===query
    });
    storage.set(SEARCH_KEY,searches);
    return searches;
}
// 清空搜索历史
export function clearSearchHistory(){
    storage.remove(SEARCH_KEY);
    return [];
}
// 获取播放历史
export function loadPlayHistory(){
    return storage.get(PLAY_KEY,[])
}
// 添加播放历史
export function savePlayHistory(song){
    let plays = storage.get(PLAY_KEY,[]);
    insertArr(plays,song,(item)=>{
        return item.id===song.id;
    },PLAY_MAX_LEN);
    storage.set(PLAY_KEY,plays);
    return plays;
}
// 删除喜欢歌曲
export function deleteFavoriteSong(song){
    let songs=storage.get(FAVORITE_KEY,[]);
    deleteFromArr(songs,(item)=>{
        return item.id===song.id;
    });
    storage.set(FAVORITE_KEY,songs);
    return songs;
}
// 保存喜欢歌曲
export function saveFavoriteSong(song){
    let songs=storage.get(FAVORITE_KEY,[]);
    insertArr(songs,song,(item)=>{
        return item.id===song.id;
    },FAVORITE_MAX_LEN);
    storage.set(FAVORITE_KEY,songs);
    return songs;
}
// 加载喜欢歌曲
export function loadFavoriteSong(){
    return storage.get(FAVORITE_KEY,[]);
}
