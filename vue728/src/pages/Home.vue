<template>
  <div class="home">
    
        <swiper></swiper>

        <div class="point">
          <router-link to="#">
            <img src="../assets/time.png" alt="">
            <p>限时抢购</p>
          </router-link>
          <router-link to="#">
            <img src="../assets/you.png" alt="">
            <p>福利专区</p>
          </router-link>

        </div>
        <dl class="hotBox">
            <dt>
              <h3>热销商品</h3><span class="xia" @click="nextList"><i class="iconfont icon-huanyipi"></i>换一批</span>
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
import $ from '../../static/jquery.js'

/*<!-- 引入json数据 -->*/
// import _BigList from '../../static/Biglist.json'
import _Huan from '../../static/Huan.json'

export default {
  name:'home',
  //从服务器请求数据:
  created(){
    var _this = this;

    $.get("/api/Biglist",{},function(data){

      _this.bigList= data;
    })
  },

  data (){
    return {

      bigList:'',
      huan:_Huan
    }
  },
  components:{  //引入的子组件,'<自定义的标签名>':引入的组件名
    "swiper":Swiper,
    "biglei":Biglei
  },
   methods: {
      
        nextList(){
          var _this= this;
          _this.huan=[];

          $.get("/api/next",{},function(hot){

              console.log(hot);
              
            for(var i= 0;i<4;i++){
                _this.huan.push(hot[i]);
            }
            /*hot.forEach(function(ele,idx){
                _this.huan.push(ele);

            })*/ 

          })
    }

    /*$.get("/data",{},function(data){
         var data1=[];
         for(var i=0;i<10;i++){
          data1.push(data[i]);
         }
        _this.tableData=data1;
        _this.num=data.length;
      })
    },
*/
  }

}
</script>

<style lang='less' scoped>
  .home{
    width:3.75rem;
    height: 6.67rem;
  }

  .lun{
    font-size:30px;

    i{
      color:red;
    }

  }

  .point{
    width:3.75rem;
    height: 0.88rem;
    display:flex;
    justify-content:space-around;
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
    width:3.75rem;
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

