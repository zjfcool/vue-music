<template>
  <transition 
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
      <div class="add-songs" v-show="showFlag" @click.stop>
          <div class="add-song-header">
              <h1 class="title">添加歌曲列表</h1>
              <div @click="hide">
                  ×
              </div>
          </div>
          <div class="search-box-container">
              <search-box ref="searchBox" @query="query"></search-box>
          </div>
          <div class="shortcut">
              <switches :switches="switches" @active="active" :activeIndex="activeIndex"></switches>
              <div class="list-wrapper">
                <scroll v-show="activeIndex===0" :data="playHistory" ref="songList" class="listscroll">
                    <div class="list-inner">
                        <song-list :songs="playHistory" @select="selectSong"></song-list>
                    </div>
                </scroll>
                <scroll v-show="activeIndex===1" :data="searchHistory" ref="searchList" class="listscroll">
                    <div class="list-inner">
                        <search-list @deleteItem="deleteItem" @selectItem="selectItem" :searchData="searchHistory"></search-list>
                    </div>
                </scroll>
              </div>
          </div>
          <div v-show="searchQuery" class="search-result">
            <suggest @beforeScroll="beforeScroll" :query="searchQuery" @select="selectSearchList"></suggest>
          </div>
      </div>
  </transition>
</template>
<script>
import { searchMixin } from "../assets/js/mixin";
import Switches from "../base/switches";
import SongList from "../base/songlist";
import { mapGetters, mapActions } from "vuex";
import Songs from '../assets/js/songs'
import Scroll from '../base/scroll'
export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      activeIndex: 0,
      switches: [
        {
          name: "最近播放"
        },
        {
          name: "搜索历史"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      playHistory: "getPlayHistory"
    })
  },
  methods: {
    hide() {
      this.showFlag = false;
    },
    show() {
      this.showFlag = true;
      setTimeout(()=>{
        if(this.activeIndex===0){
          this.$refs.songList.refresh();
        }else{
          this.$refs.searchList.refresh();
        }
      },20)
    },
    active(index) {
      this.activeIndex = index;
    },
    selectSong(item, index) {
      this.insertSong(new Songs(item));
    },
    ...mapActions(["insertSong"])
  },
  components: {
    Switches,
    SongList,
    Scroll
  },
  watch: {
    playHistory(newVal){
      console.log(newVal)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/variable.less";
.add-songs {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: @bg-color;
  z-index: 9999;
  .search-result {
    position: fixed;
    top: 72px;
    left: 0;
    width: 100%;
    background-color: @bg-color;
  }
  .shortcut{
      .list-wrapper{
          position: fixed;
          top: 104px;
          bottom: 0;
          width: 100%;
          .listscroll{
            height: 100%;
            overflow: hidden;
            .list-inner{
              width: 100%;
            }
          }
      }
  }
  .add-song-header {
    position: relative;
    width: 100%;
    height: 32px;
    text-align: center;
    & > h1 {
      width: 100%;
      height: 32px;
      line-height: 32px;
      color: @color-text;
      font-size: @font-size-large;
    }
    & > div {
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>

