<template>
  <div class="search">
      <div class="search-box-container">
          <search-box @query="query" ref="searchBox"></search-box>
      </div>
      <div class="hot-search" v-show="!searchQuery">
          <h3 class="hot-word">热门搜索</h3>
          <ul class="hot-search-con">
                <li class="search-item" v-for="(item,index) in hotKeys" :key="index" @click="setKeyWord(item)">
                  <a @click.stop v-if="item.url" :href="item.url"></a>
                  {{item.k}}
                </li>
          </ul>
      </div>
      <div v-show="searchQuery" class="search-result">
          <suggest @beforeScroll="beforeScroll" :query="searchQuery" ></suggest>
      </div>
      <router-view></router-view>
  </div>
</template>
<script>
    import SearchBox from '../base/searchBox'
    import {getHotKey,search} from '../api/search'
    import {ERR_OK} from '../api/config'
    import Suggest from './Suggest'
    export default{
        data(){
            return {
                hotKeys:[],
                searchQuery:''
            }
        },
        components:{
            SearchBox,
            Suggest
        },
        created(){
            this._getHotKey()
        },
        methods: {
            query(data){
                this.searchQuery=data;
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
            beforeScroll(){
                this.$refs.searchBox.inputBlur();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .search{
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
        .search-result{
            position: fixed;
            width: 100%;
            top: 104px;
            bottom: 0;
            overflow: hidden;
        }
    }
</style>

