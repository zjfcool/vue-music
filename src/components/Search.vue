<template>
  <div class="search">
      <div class="search-box-container">
          <search-box @query="query" ref="searchBox"></search-box>
      </div>
      <scroll ref="listScroll" class="list-scroll" :data="concatData">
          <div class="list-container">
                <div class="hot-search" v-show="!searchQuery">
                    <h3 class="hot-word">热门搜索</h3>
                    <ul class="hot-search-con">
                            <li class="search-item" v-for="(item,index) in hotKeys" :key="index" @click="setKeyWord(item)">
                            <a @click.stop v-if="item.url" :href="item.url"></a>
                            {{item.k}}
                            </li>
                    </ul>
                </div>
                <div class="history-list" v-show="!searchQuery">
                    <div class="history-title">
                            <h1>
                                搜索历史 
                            </h1>
                            <span @click="clearHistory"></span>
                    </div>
                    <div class="history-content">
                        <search-list @deleteItem="deleteItem" @selectItem="selectItem" :searchData="searchHistory"></search-list>
                    </div>
                </div>
          </div>
      </scroll>
      <div v-show="searchQuery" class="search-result">
          <suggest @beforeScroll="beforeScroll" :query="searchQuery" @select="selectSearchList"></suggest>
      </div>
      <confirm ref="confirm" :content="confirmText" :ensure="ensureText" @clear="clearSearch"></confirm>
      <router-view></router-view>
  </div>
</template>
<script>
    import {getHotKey,search} from '../api/search'
    import {ERR_OK} from '../api/config'
    import { mapActions, mapGetters } from 'vuex'
    import Confirm from '../base/confirm'
    import Scroll from '../base/scroll'
    import {playListMixin,searchMixin} from '../assets/js/mixin'
    export default{
        mixins:[playListMixin,searchMixin],
        data(){
            return {
                hotKeys:[],
                confirmText:'确定要清空搜索历史吗？',
                ensureText:'清空'
            }
        },
        components:{
            Confirm,
            Scroll
        },
        computed: {
            concatData(){
                return this.hotKeys.concat(this.searchHistory);
            },
           
        },
        created(){
            this._getHotKey()
        },
        methods: {
            handlePlaylist(playlist){
                const bottom = playlist.length>0?'60px':'';
                this.$refs.listScroll.$el.style.bottom=bottom;
                this.$refs.listScroll.refresh();
            },
            setKeyWord(item){
                this.$refs.searchBox.setQuery(item.k);
            },
            _getHotKey(){
                getHotKey().then(res=>{
                    if(ERR_OK===res.body.code){
                        this.hotKeys=res.body.data.hotkey.slice(0,10);
                        if(res.body.data.special_key){
                            this.hotKeys.unshift({
                                k:res.body.data.special_key,
                                url:res.body.data.special_url
                            })
                        }
                    }
                },err=>{
                    console.log(err)
                })
            },
            
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .search{
        .list-scroll{
            position: fixed;
            top: 104px;
            bottom: 0;
            width: 100%;
            overflow: hidden;
        }
        .list-container{
            
            .hot-search{
                box-sizing: border-box;
                width: 100%;
                padding: 0 12px;
                .hot-word{
                    position: relative;
                    height: 32px;
                    line-height: 32px;
                    text-align: left;
                    color: @active-color;
                    font-size: @font-size-medium-x;
                }
                .hot-search-con{
                    display: flex;
                    flex-wrap: wrap;
                    .search-item{
                        position: relative;
                        padding: 4px ;
                        font-size: @font-size-medium;
                        background: @box-color;
                        color: @color-text;
                        margin: 4px 4px;
                        a{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            color: @active-color;
                            border: 1px solid @active-color;
                        }
                    }
                }
            }
            .history-list{
                width: 100%;
                .history-title{
                    display: flex;
                    height: 32px;
                    width: 100%;
                    align-items: center;
                    h1{
                        flex: 1;
                        text-align: left;
                        padding-left: 12px;
                        color: @active-color;
                    }
                    span{
                        width: 32px;
                        height: 32px;
                        text-align: center;
                        color: @color-text-d;
                        background: url(../assets/images/delete.png) no-repeat center;
                        background-size: 24px 24px;
                    }
                }
                .history-content{
                    width: 100%;
                }
            }
        }
        
        .search-result{
            position: fixed;
            width: 100%;
            top: 104px;
            bottom: 0;
            overflow: hidden;
        }
    }
</style>

