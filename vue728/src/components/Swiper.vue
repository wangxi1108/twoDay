<template>
  <div id="swiper">
  
    <div class="swiper-container">
       <div class="swiper-wrapper">
           <div class="swiper-slide">img 111</div>
           <div class="swiper-slide">Slide 2</div>
           <div class="swiper-slide">Slide 3</div>
       </div>
       <div class="swiper-pagination"></div>
   </div>

<!--    <div class="swiper-container">
        <div class="swiper-wrapper">
           <div class="swiper-slide"><img src="#" alt=""></div>
           <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
       </div>
       <div class="swiper-pagination swiper-pagination-white"></div>
    </div> -->
  </div>
</template>

<script>
  // import Swiper from 'swiper';
  // import '../../static/swiperku/swiper-3.4.2.min.css';

export default {
  name:'swiper',
       /*data(){
        return {

        }
       },*/
       method(){
          var mySwiper = new Swiper('.swiper-container', {
              autoplay: 3000,//可选选项，自动滑动
          })
       }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #swiper{
    width:100%;
    height: 10rem;
  }

  // .swiper-container {
  //       width: 100%;
  //       height: 10rem;
  //       .swiper-wrapper {
  //           width: 100%;
  //           height: 100%;
  //       }
  //       .swiper-slide {
  //           background:pink;
  //           width: 100%;
  //           height: 100%;
            
  //       }

</style>
