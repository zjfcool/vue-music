<template>
  <div class="progress-circle">
      <svg :width="edge" :height="edge" viewBox="0,0,100,100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-bg" r="50" cx="50" cy="50" fill="transparent"></circle>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
            :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"></circle>
      </svg>
      <slot></slot>
  </div>
</template>
<script>
    export default{
        props:{
            edge:{
                type:Number,
                default:100
            },
            percent:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                dasharray:100*Math.PI
            }
        },
        computed: {
            dashoffset(){
                return (1-this.percent)*this.dasharray;
            }
        }
    }
</script>
<style scoped lang="less">
    @import '../assets/css/variable.less';
    .progress-circle{
        position: relative;
        width: 100%;
        height: 100%;
        svg{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }
        circle{
            stroke-width: 8px;
            transform-origin: center;
            &.progress-bg{
                stroke: rgba(255, 205, 49, 0.5);
                transform: scale(0.9);
            }
            &.progress-bar{
                stroke: @active-color;
                transform: scale(0.9) rotate(-90deg);
            }
        }
        
    }
</style>
