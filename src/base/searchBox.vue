<template>
    <div class="search-box">
        <input ref="inputQuery" type="text" v-model="query" :placeholder="placeholder">
        <span v-show="query" @click="empty" class="empty">×</span>
    </div>
</template>
<script>
    import {debounce} from '../assets/js/util'
    export default{
        data(){
            return {
                query:""
            }
        },
        props:{
            placeholder:{
                type:String,
                default:"请输入歌手，歌曲"
            }
        },
        methods:{
            empty(){
                this.query="";
            },
            setQuery(data){
                this.query=data;
            },
            inputBlur(){
                this.$refs.inputQuery.blur();
            }
        },
        created(){
            this.$watch('query',debounce((newQuery) => {
                    this.$emit('query', newQuery)
                }, 200,this))
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .search-box{
        position: relative;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 0 6px;
        background-color: @box-color;
        border-radius: 6px;
        input{
            flex: 1;
            margin: 0 6px;
            line-height: 18px;
            border-color: @active-color;
            background: @box-color;
            color: @color-text;
            font-size: @font-size-medium;
            &::placeholder{
                color: @color-text-d;
            }
        }
        .empty{
            text-align: center;
            font-size: 16px;
            color: @color-text-d;
            line-height: 40px;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>

