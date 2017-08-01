<template>
  <div class="home">
    
        <div class="point">

          <router-link to="#">
            <img src="../assets/time.png" height="89" width="88" alt="">
            <p>限时抢购</p>
          </router-link>
          <router-link to="#">
            <img src="../assets/you.png" height="89" width="88" alt="">
            <p>福利专区</p>
          </router-link>

        </div>
        <dl class="hotBox">
            <dt>
              <h3>热销商品</h3><span>换一批</span>
            </dt>
            <dd>
                  <router-link to="#" v-for="ele in huan">
                    <img :src="ele.img" alt="">
                    <p>{{ele.name}}</p>      

                  </router-link>
                  <!-- <router-link to="#">
                    <img src="../../static/img1/1499147963759_2.jpg" alt="">
                    <p>金龙鱼/调</p>             
                  </router-link> -->
            </dd>
        </dl>

  <biglei :bigList="bigList"></biglei>

  </div>
</template>

<script>

import Swiper from '../components/Swiper.vue'
import Biglei from '../components/One/Biglei.vue'

/*<!-- 引入json数据 -->*/
import _BigList from '../../static/Biglist.json'
import _Huan from '../../static/Huan.json'

export default {
  name:'home',
  data (){

    return {
      bigList:_BigList,
      huan:_Huan
    }
  },
  components:{  //引入的子组件,'<自定义的标签名>':引入的组件名
    "swiper":Swiper,
    "biglei":Biglei
  }

}
</script>

<style lang='less' scoped>
  .home{
    width:100%;
    height: 3.75rem;
  }

  .lun{
    font-size:30px;

    i{
      color:red;
    }

  }

  .point{
    width:100%;
    height: 0.88rem;
    display:flex;
    justify-content:space-around;
    border:2px solid cyan;
    padding: 0.1rem 0;

      a{
        display: block;
        text-decoration: none;
        color: #000;
        text-align:center;
      }
      img{
        width:0.42rem;
        height: 0.42rem;
      }
      p{
        font-size:0.14rem;
        color:#666;
      }
    
  }

  .hotBox{
    width:100%;
    height: 1.8rem;
    border-top:1px solid #eee;
    margin-top: 0.2rem;
    dt{
      width: 100%;
      height: 0.37rem;
      border-bottom:1px solid #eee;
      line-height:0.37rem;

      h3{
        font-weight:normal;
        float:left;
        color:#333;
        font-size:0.14rem;
        float:left;
      }
      span{
        float:right;
        color:red;
      }

    }
    dd{
      width: 100%;
      height: 1.05rem;
      border-bottom:1px solid #eee;

      a{
        text-decoration:none;
        display:block;
        float:left;
        width:0.93rem;
        height: 1.05rem;
        text-align:center;
        border-left:1px solid #eee;

        img{
          border:0;
          display:inline-block;
          width:0.75rem;
          height: 0.75rem;
        }
        p{
          width:100%;
          height: 0.16rem;
          font-size:0.08rem;
          color:#666;

          
        }
      }
    }
  }


</style>

