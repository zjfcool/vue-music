<template>
  <scroll class="suggest" ref="suggest" 
    :data="searchResult" 
    :pullup="pullup" 
    :beforeScroll="beforeScroll"
    @beforeScroll="startScroll"
    @scrollToEnd="scrollMore">
      <ul class="search-list">
          <li class="search-item" 
            v-for="(item,index) in searchResult" 
            :key="index"
            @click="setItem(item)">
              <span :class="icon(item)"></span>
              <p v-html="getName(item)"></p>
          </li>
          <loading v-show="hasMore" title=""></loading>
      </ul>
  </scroll>
</template>
<script>
    import {search} from '../api/search'
    import {ERR_OK} from '../api/config'
    import {createSong} from '../assets/js/songs'
    import Singer from '../assets/js/singer'
    import Scroll from '../base/scroll'
    import Loading from '../base/loading/index'
    import {mapMutations,mapActions} from 'vuex'
    import * as types from '../store/mutationTypes'
    const TYPE_SINGER="singer";
    const perpage=20;
    export default{
        props:{
            query:{
                type:String,
                default:''
            },
            showSinger:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                searchResult:[],
                page:1,
                hasMore:true,
                pullup:true,
                beforeScroll:true
            }
        },
        components:{
            Scroll,
            Loading
        },
        methods:{
            _search(query){
                this.page=1;
                this.hasMore=true;
                this.$refs.suggest.scrollTo(0,0);
                search(query,this.page,this.showSinger,perpage).then(res=>{
                    if(ERR_OK===res.body.code){
                        this.searchResult=this.genResult(res.body.data)
                        this.checkMore(res.body.data)
                    }
                },err=>{console.log(err)})
            },
            genResult(data){
                let ret=[];
                if(data.zhida&&data.zhida.singerid){
                    ret.push({...data.zhida,...{type:TYPE_SINGER}})
                }
                if(data.song){
                    ret = ret.concat(this.normalizeSongs(data.song.list))
                }
                return ret;
            },
            normalizeSongs(list){
                let ret=[];
                list.forEach(item=>{
                    if(item.songid&&item.albummid){
                        ret.push(createSong(item))
                    }
                })
                
                return ret;
            },
            getName(item){
                if(item.type===TYPE_SINGER){
                    return item.singername
                }
                return item.songname+'-'+item.singer;
            },
            icon(item){
                if(item.type===TYPE_SINGER){
                    return 'singer-icon'
                }
                return 'song-icon'
            },
            scrollMore(){
                if(!this.hasMore){
                    return ;
                }
                this.page++;
                search(this.query,this.page,this.showSinger,perpage).then(res=>{
                    if(ERR_OK===res.body.code){
                        this.searchResult=this.searchResult.concat(this.genResult(res.body.data));
                        this.checkMore(res.body.data)

                    }
                })
            },
            checkMore(data){
                const song=data.song;

                if(!song.list.length||(song.curnum+song.curpage*perpage)>song.totalnum){
                    this.hasMore=false;
                }
            },
            startScroll(){
                this.$emit('beforeScroll');
            },
            setItem(item){
                if(item.type===TYPE_SINGER){
                    let singer = new Singer({
                        id:item.singermid,
                        name:item.singername
                    })
                    this.$router.push({
                        path:`/singer/${singer.id}`
                    })
                    this.setSinger(singer);
                }else{
                    this.insertSong(item)
                }
            },
            ...mapMutations({
                setSinger:types.SINGER_LIST
            }),
            ...mapActions([
                'insertSong'
            ])
        },
        watch:{
            query(newQuery){
                this._search(newQuery)
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    @import '../assets/css/func.less';
    .suggest{
        height: 100%;
        width: 100%;
        .search-list{
            box-sizing: border-box;
            width: 100%;
            padding-left:12px; 
            .search-item{
                display: flex;
                height: 32px;
                line-height: 32px;
                font-size: @font-size-medium;
                span{
                    width: 32px;
                    text-align: center;
                    &.singer-icon{
                        background: url(../assets/images/singer-icon.png) no-repeat center;
                        background-size: 16px 16px;
                    }
                    &.song-icon{
                        background: url(../assets/images/song-icon.png) no-repeat center;
                        background-size: 16px 16px;
                    }
                }
                p{
                    flex: 1;
                    color: @color-text-d;
                    .textOverflow; 
                }
            }
        }
    }
</style>

