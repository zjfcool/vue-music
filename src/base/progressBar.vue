<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
      <div class="bar-inner">
            <div class="progress-now" ref="progressNow">

            </div>
            <div class="progress-btn" ref="progressBtn"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd">
                <div class="progress-btn-inner">

                </div>
            </div>
      </div>
  </div>
</template>
<script>
    import dom from '../assets/js/dom'
    const progressBtnWidh=16;
    const transform= dom.compBrowser('transform');
    export default {
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
        created(){
            this.touch={};
        },
        methods:{
            progressTouchStart(e){
                this.touch.initated=true;
                this.touch.startX=e.touches[0].pageX;
                this.touch.left = this.$refs.progressNow.clientWidth;
            },
            progressTouchMove(e){
                if(!this.touch.initated){
                    return;
                }
                const deltaX=e.touches[0].pageX-this.touch.startX;
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth-progressBtnWidh,Math.max(0,this.touch.left+deltaX))
                this._offset(offsetWidth);
            },
            progressTouchEnd(e){
                this.touch.initated=false;
                this._triggerPercent();
            },
            progressClick(e){
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX-rect.left;
                this._offset(offsetWidth);
                this._triggerPercent()
            },
            _offset(offsetWidth){
                this.$refs.progressNow.style.width=`${offsetWidth}px`;
                this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
            },
            _triggerPercent(){
                const barW = this.$refs.progressBar.clientWidth-progressBtnWidh;
                const percent = this.$refs.progressNow.clientWidth/barW;
                this.$emit('percentChange',percent) 
            }
        },
        watch:{
            percent(newPercent){
                if(newPercent>=0 && !this.touch.initated){
                    const barW = this.$refs.progressBar.clientWidth-progressBtnWidh;
                    const offsetWidth = barW*newPercent;
                    this._offset(offsetWidth);
                }
            }
        },
    }
</script>
<style scoped lang="less">
    @import "../assets/css/variable.less";
    .progress-bar{
        height: 32px;
        .bar-inner{
            position: relative;
            height: 4px;
            width: 100%;
            top: 14px;
            background: rgba(0,0,0,.3);
            .progress-now{
                background: @active-color;
                height: 100%;
            }
            .progress-btn{
                position: absolute;
                top:-14px;
                left: -8px;
                width: 32px;
                height: 32px;
                .progress-btn-inner{
                    position: relative;
                    top: 6px;
                    left: 8px;
                    width: 16px;
                    height: 16px;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    background: @active-color;
                }
            }
        }
    }
</style>

