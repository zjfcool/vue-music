<template>
  <div class="slider">
    <swiper :options="swiperOption">
        <swiper-slide v-for="sliderItem in sliderData" :key="sliderItem.id">
            <a :href="sliderItem.linkUrl">
                <img :src="sliderItem.picUrl" @load="loadImage" alt="">
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlider} from 'vue-awesome-swiper'
    export default{
        components: {
            swiper,
            swiperSlider
        },
        props:{
            sliderData:{
                type:Array,
                default:[]
            },
            swiperOption:{
                default:function(){
                    return {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable:true
                        },
                        loop: true,
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: false
                        },
                    }
                }
            }
        },
        methods:{
            loadImage(){
                if(!this.checkloaded){
                    this.checkloaded=true;
                    this.$emit('load-image');
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    a{
        display: inline-block;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: auto;
        }
    }
</style>

