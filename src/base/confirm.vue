<template>
  <transition 
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
        <div class="confirm" v-show="showFlag" @click.stop="hide">
            <div class="confirm-container">
                    <div class="confirm-content">
                        {{content}}
                    </div>
                    <div class="confirm-btns">
                        <span @click="hide">{{cancel}}</span>
                        <span @click="clear">{{ensure}}</span>
                    </div>
            </div>
        </div>
  </transition>
</template>
<script>
    export default{
        data(){
            return {
                showFlag:false
            }
        },
        props:{
            content:{
                type:String,
                default:''
            },
            cancel:{
                type:String,
                default:'取消'
            },
            ensure:{
                type:String,
                default:'确定'
            }
        },
        methods:{
            show(){
                this.showFlag=true;
            },
            hide(){
                this.showFlag=false;
            },
            clear(){
                this.$emit('clear');
                this.hide();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .confirm {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color:@bg-color-d; 
        .confirm-container{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            border-radius: 15px;
            transform: translate(-50%,-50%);
            background-color: @box-color;
            .confirm-content{
                width: 100%;
                height: 32px;
                padding: 8px 4px;
                line-height: 32px;
                text-align: center;
                color: @color-text-d;
            }
            .confirm-btns{
                width: 100%;
                height: 32px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: @color-text-d;
                span{
                    flex: 1;
                    padding: 4px;
                    text-align: center;
                }
            }
        }
    }
</style>

