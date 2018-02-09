<template>
  <div class="wrapper" ref="scroll">
      <slot></slot>
  </div>
</template>
<script>
    import BScroll from 'better-scroll'    
    export default {
        mounted(){
            setTimeout(()=>{
                 this._initScroll()
            },20)
        },
        props:{
            probeType:{
                type:Number,
                default:1
            },
            /**
             * 是否实时监听滚动
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 点击列表是否派发click事件
             */
            click:{
                type:Boolean,
                default:true
            },
            /**
             * 列表数据
             */
            data:{
                type:Array,
                default:null
            },
            refreshDelay:{
                type:Number,
                default:20
            }
        },
        methods:{
            _initScroll(){
                if(!this.$refs.scroll){
                    return;
                }
                this.scroll = new BScroll(this.$refs.scroll,{
                    probeType:this.probeType,
                    click:this.click
                })
                if(this.listenScroll){
                    let that=this;
                    this.scroll.on('scroll',(pos)=>{
                        that.$emit('scroll',pos);
                    })
                }
                // console.log(this.scroll)
            },
            refresh(){
                this.scroll&&this.scroll.refresh();
            },
            enable(){
                this.scroll&&this.scroll.enable();
            },
            disable(){
                this.scroll&&this.scroll.disable();
            },
            scrollTo(){
                this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments);
            },
            scrollToElement(){
                this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments);
            }
        },
        watch:{
            data(){
                setTimeout(()=>{
                    this.refresh();
                },this.refreshDelay)
            }
        }
    }

</script>
