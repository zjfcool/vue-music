<template>
  <ul class="switches">
     <li v-for="(item,index) in switches" @click="getActiveIndex(index)" :key="index" :class="{'active':activeIndex===index}">{{item.name}}</li>
  </ul>
</template>
<script>
    export default{
        props:{
            switches:{
                type:Array,
                default:[]
            },
            activeIndex:{
                type:Number,
                default:0
            }
        },
        methods:{
            getActiveIndex(index){
                this.$emit('active',index)
            }
        }
    }    
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .switches{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 240px;
        margin: 0 auto;
        &>li{
            flex: 1;
            padding: 8px;
            text-align: center;
            font-size: @font-size-medium;
            color: @color-text-d;
            border: 1px solid @box-color;
            &.active{
                background-color: @box-color;
                color:@color-text; 
            }

        }
    }
</style>
