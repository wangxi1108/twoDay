<template>
  <div id="swiper">
  
    <div class="swiper-container">
       <div class="swiper-wrapper">
           <div class="swiper-slide"><img src="../../static/img1/1494572885004_2.jpg" alt=""></div>
           <div class="swiper-slide"><img src="../../static/img1/1494579829512_2.jpg" alt=""></div>
           <div class="swiper-slide"><img src="../../static/img1/1495089061159_2.jpg" alt=""></div>
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
       mounted(){
          var swiper = new Swiper('.swiper-container', {
              autoplay: 4000
          })
       }
       
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #swiper{
    width:100%;
    height: 2.2rem;
    border-bottom:1px solid red;

    img{
      width:100%;
      height: 2.2rem;
    }
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
