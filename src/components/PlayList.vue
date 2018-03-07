<template>
    <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div class="playlist" v-show="showFlag" @click.stop="hide">
        <div class="playlist-container" @click.stop>
            <div class="playlist-header">
                <div class="mode">
                    <span @click="toggleMode" :class="playmode" class="modeicon">
                    </span>
                    <span class="mode-text">{{modeText}}</span>
                </div>
                <div class="clear" @click="clear"></div>
            </div>
            <scroll :refreshDelay="refreshDelay" class="playlist-content" :data="sequencelist" ref="playListCon">
                <transition-group name="slide" class="songlist" ref="songList" tag="ul">
                    <li  class="songitem" v-for="(item,index) in sequencelist" :key="item.id" @click="selectSong(item,index)">
                        <span class="current" :class="getCurrentIcon(item)"></span>
                        <span class="text">{{item.songname}}</span>
                        <span class="icon-heart" :class="toggleCls(item)" @click.stop="toggleHeart(item)"></span>
                        <span class="close" @click.stop="deleteItem(item)">×</span>
                    </li>
                </transition-group>
            </scroll>
            <div class="add-song" @click="addSong">
                +添加歌曲到队列
            </div>
            <div class="playlist-close" @click="hide">
                关闭
            </div>
        </div>
        <confirm @clear="deleteSongList" ref="confirm" content="是否清空播放列表？" ensure="清空"></confirm>
        <add-song ref="addSong"></add-song>
    </div>
    </transition>
    
</template>
<script>
import { playerMixin } from "../assets/js/mixin";
import { mapGetters, mapActions } from "vuex";
import Scroll from "../base/scroll";
import Confirm from "../base/confirm"
import AddSong from "./AddSong"
export default {
  mixins: [playerMixin],
  computed: {
    modeText() {
      return this.playmode === "random"
        ? "随机播放"
        : this.playmode === "seq" ? "顺序播放" : "循环播放";
    },
    ...mapGetters({
      sequencelist: "getSequenceList"
    })
  },
  data() {
    return {
      showFlag: false,
      refreshDelay:100
    };
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.playListCon.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    clear(){
      this.$refs.confirm.show()
    },
    getCurrentIcon(item) {
      if (item.id === this.currentSong.id) {
        return "icon-play3";
      }
      return "";
    },
    scrollToCurrent(current) {
      let index = this.sequencelist.findIndex(item => {
        return item.id === current.id;
      });
      this.$refs.playListCon.scrollToElement(
        this.$refs.songList.$el.children[index],
        300
      );
    },
    selectSong(item, index) {
      if (this.playmode === "random") {
        index = this.playlist.findIndex(song => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlaying(true);
    },
    deleteItem(item) {
      this.deleteSong(item);
    },
    addSong(){
      this.$refs.addSong.show();
    },
    ...mapActions(["deleteSong", "deleteSongList"])
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/variable.less";
@import "../assets/css/func.less";
.playlist {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @bg-color-d;
  z-index: 99999;
  .playlist-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: @box-color;
  }
  .playlist-header {
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .clear {
      width: 32px;
      height: 32px;
      background: url(../assets/images/delete.png) no-repeat center;
      background-size: 24px 24px;
    }
    .mode {
      width: 40%;
      height: 32px;
      display: flex;
      .mode-text {
        flex: 1;
        line-height: 32px;
        text-align: center;
      }
      .modeicon {
        width: 32px;
        height: 32px;
      }
      .seq {
        background: url(../assets/images/seq.png) no-repeat center;
      }
      .random {
        background: url(../assets/images/random.png) no-repeat center;
      }
      .loop {
        background: url(../assets/images/loop.png) no-repeat center;
      }
      .seq,
      .random,
      .loop {
        background-size: 24px 24px;
      }
    }
  }
  .playlist-content {
    width: 100%;
    max-height: 240px;
    overflow: hidden;
    .songlist {
      width: 100%;
      .songitem {
        width: 100%;
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        &.slide-enter-active,
        &.slide-leave-active {
          transition: all 0.1s;
        }
        &.slide-enter,
        &.slide-leave-to {
          height: 0;
        }
        span {
          width: 32px;
          text-align: center;
        }
        .icon-play3,
        .icon-heart {
          color: @active-color;
        }
        .icon-heart.active{
          color: red;
        }
        .text {
          flex: 1;
          text-align: left;
          .textOverflow;
        }
      }
    }
  }
  .add-song {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: @color-text-l;
  }
  .playlist-close {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.35);
  }
}
</style>

