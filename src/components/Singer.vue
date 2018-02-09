<template>
  <div>
      <list-view @detail="singerDetail" :data="singerList"></list-view>
      <router-view></router-view>
  </div>
</template>
<script>
    import {getSingerList} from '../api/singer'
    import {ERR_OK} from '../api/config'
    import ListView from '../base/listview'
    import Singer from '../assets/js/singer'
    import {mapMutations} from 'vuex'
    const HOT_SINGER_LEN=10;
    const HOT_NAME='热门';
    export default{
        created(){

        },
        data(){
            return{
                singerList:[]
            }
        },
        components:{
            ListView
        },
        mounted(){
            this._jsonpSingerList();
        },
        methods:{
            _jsonpSingerList(){
                getSingerList().then(res=>{
                    if(res.body.code===ERR_OK){
                        this.singerList=this._normallizeSinger(res.body.data.list);
                    }
                },err=>{
                    console.log(err)
                })
            },
            singerDetail(item){
                this.$router.push(`singer/${item.id}`)
                this.singer(item)
            },
            _normallizeSinger(lists){
                let initial={
                    hot:{
                        title:HOT_NAME,
                        items:[]
                    }
                }
                lists.forEach((item,index)=>{
                    if(index<HOT_SINGER_LEN){
                        initial.hot.items.push(new Singer({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name
                        }))
                    }
                    const key = item.Findex;
                    if(!initial[key]){
                        initial[key]={
                            title:key,
                            items:[]
                        }
                    }
                    initial[key].items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }));
                });
               let ret =[];
               let hot =[];
               for(let key in initial){
                   let val =initial[key];
                   if(val.title.match(/[a-zA-Z]/)){
                       ret.push(val)
                   }else if(val.title===HOT_NAME){
                       hot.push(val)
                   }
               }
               ret.sort((a,b)=>{
                   return a.title.charCodeAt(0) - b.title.charCodeAt(0)
               });
               return hot.concat(ret);

            },
            ...mapMutations({
                singer:'SINGER_LIST'
            })
        }
    }
</script>
