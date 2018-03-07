<template>
  <div class="search-list-container">
      <ul class="search-list">
          <li class="search-item" @click="selectItem(item)" v-for="(item, index) in searchData" :key="index">
              <p>{{item}}</p>
              <span @click.stop="deleteItem(item)">×</span>
          </li>
      </ul>
  </div>
</template>
<script>
    export default {
        props:{
            searchData:{
                type:Array,
                default:[]
            }
        },
        methods:{
            selectItem(item){
                this.$emit('selectItem',item);
            },
            deleteItem(item){
                this.$emit('deleteItem',item);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../assets/css/variable.less';
    .search-list-container{
        width: 100%;
        box-sizing: border-box;
        .search-list{
            width: 100%;
            .search-item{
                display: flex;
                align-items: center;
                width: 100%;
                height: 32px;
                p{
                    flex: 1;
                    padding-left: 12px;
                    font-size: @font-size-medium;
                }
                span{
                    display: inline-block;
                    width: 32px;
                    text-align: center;
                }
            }
        }
    }
</style>
