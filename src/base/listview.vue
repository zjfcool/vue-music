<template>
  <scroll 
    @scroll="scroll"
    :probeType="probeType" 
    :listenScroll="listenScroll"
    :data="data" 
    class="singer-wrapper" 
    ref="singerWarpper">
      <ul class="singer-list" ref="list">
          <li ref="listGroup" class="group" v-for="(groupData,index) in data" :key="index">
              <h2>{{groupData.title}}</h2>
              <ul>
                  <li @click="singerDetail(item)" v-for="(item,index) in groupData.items" :key="index">
                      <a>
                          <img v-lazy="item.imgURL" alt="">
                      </a>
                      <span>{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="list-shortcut" 
            @touchstart.stop.prevent="shortcutToucStart"
            @touchmove.stop.prevent="shortcutToucMove">
          <ul>
              <li 
                v-for="(item,index) in shortcutList" 
                :key="index" 
                :data-index="index"
                :class="{'active':currentIndex===index}">
                  {{item}}
              </li>
          </ul>
      </div>
      <div ref="fixedTitle" class="fixed-head" v-show="fixedContent">
          {{fixedContent}}
      </div>
      <div v-show="!data.length" class="loading-container">
          <loading></loading>
      </div>
  </scroll>
</template>
<script>
    import Scroll from './scroll'
    import fDom from '../assets/js/dom'
    import Loading from '../base/loading/index'
    const TITLE_HEIGHT=32;
    const PADDING=24;
    export default {
        created(){
            this.touch={};
            this.probeType = 3
            this.listenScroll = true
            this.listHeight=[];
        },
        components: {
            Scroll,
            Loading
        },
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                currentIndex:0,
                scrollY:-1,
                diff:0
            }
        },
        computed:{
            shortcutList(){
                return this.data.map(item=>{
                    return item.title.substr(0,1);
                })
            },
            fixedContent(){
                if(this.scrollY>0){
                    return '';
                }
                return this.data[this.currentIndex]?this.data[this.currentIndex].title:'';
            }
        },
        methods:{
            shortcutToucStart(e){
                let anchorIndex = parseInt(fDom.getAttr(e.target,'data-index'));
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = anchorIndex;
                this._scrollTo(anchorIndex)
               
            },
            shortcutToucMove(e){
                let firstTouch = e.touches[0];
                this.touch.y2=firstTouch.pageY;
                let distance = this.touch.y2-this.touch.y1;
                let anchorIndex = Math.floor(distance/18)+this.touch.anchorIndex;
                this._scrollTo(anchorIndex);
            },
            singerDetail(item){
                this.$emit('detail',item);
            },
            _scrollTo(index){
                if(!index && index!==0){
                    return;
                }
                if(index<0){
                    index=0;
                }else if(index>this.listHeight.length-2){
                    index=this.listHeight.length-2
                }
                this.scrollY=-this.listHeight[index]
                this.$refs.singerWarpper.scrollToElement(this.$refs.listGroup[index],0)
            },
            scroll(pos){
                this.scrollY=pos.y;
            },
            groupHeight(){
                this.listHeight=[];
                let lists=this.$refs.listGroup;
                let h=0;
                this.listHeight.push(h)
                for(let i=0;i<lists.length;i++){
                    let item=lists[i];
                    h+=item.clientHeight;
                    this.listHeight.push(h);
                }
            }

        },
        watch:{
            data() {
                setTimeout(() => {
                this.groupHeight()
                }, 20)
            },
            scrollY(newY){
                let listH = this.listHeight;
                // 当滚动到顶部时
                if(newY>0){
                    this.currentIndex=0;
                    return;
                }
                // 当滚动到中间
                for(let i=0;i<listH.length-1;i++){
                    if(-newY>=listH[i] && -newY<listH[i+1]){
                        this.currentIndex=i;
                        this.diff=listH[i+1]+newY;
                        return;
                    }
                }
                // 当滚动到底部时
                this.currentIndex=listH.length-2;
                
            },
            diff(newVal){
                let fixedTop = newVal>0&&newVal<TITLE_HEIGHT?newVal-TITLE_HEIGHT:0;
                if(this.fixedTop===fixedTop){
                    return;
                }
                this.fixedTop = fixedTop;
                this.$refs.fixedTitle.style.transform=`translate3d(0,${fixedTop}px,0)`
            }
        },
        mounted(){
           let w = this.$refs.list.clientWidth-PADDING;
           this.$refs.fixedTitle.style.width=w+'px';
        }
    }
</script>
<style scoped lang="less">
    @import '../assets/css/func.less';
    @import '../assets/css/variable.less';

    @singer-list-h:60px;
    .singer-wrapper{
        height: 500px;
        overflow: hidden;
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9;
    }
    .fixed-head{
        height: 32px;
        background: #2e2e2e;
        line-height: 32px;
        padding-left:12px;
        position: fixed;
        top: 64px;
        right: 0;
        left: 0;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .singer-list{
        width: 100%;
        box-sizing: border-box;
        padding:0 12px;
        overflow: hidden;
        .group{
            width: 100%;
            h2{
                height: 32px;
                background: #2e2e2e;
                line-height: 32px;
                padding-left:12px;
                margin-bottom: 8px; 
            }
            &>ul{
                width: 100%;
                &>li{
                    width: 100%;
                    height: @singer-list-h;
                    .flex;
                    margin-bottom: 8px;
                    overflow: hidden;
                    a{
                        display: block;
                        width: @singer-list-h;
                        height: 100%;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    span{
                        flex: 1;
                        text-align: left;
                        padding: 22px 0 0 12px;
                    }
                }
            }
        }
    }
    .list-shortcut{
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 18px;
        z-index: 999;
        background: #202020;
        padding: 12px 0;
        height: auto;
        ul{
            width: 100%;
            li{
                width: 100%;
                height: 18px;
                line-height: 18px;
                text-align: center;
                font-size: 14px;
                color: #ddd;
            }
            .active{
                color: @active-color;
            }
        }
    }
</style>
