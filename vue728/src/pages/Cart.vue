<template>
   <div id="cart">

      <div class="Ctou">
          <a href="javascript:history.go(-1)" class="sBack"><i class="iconfont icon-iconxiangzuo"></i></a>
          <h3>购物车(<span class="tou_total">0</span>)</h3>
      </div>

    <!-- 购物车里的商品 -->
    <div class="cart_content">
      <div class="cartBox" v-for="(ele,index) in cartList" :key="index" :data-tot="ele.new *ele.zhi">
        <div  class="trueBox"><input type="checkbox" class="proCheck"  @change="isClick"></div>
        <img  class="imgBox" :src="ele.img" alt="">
        <div class="cart_disBox">
          <h3 class="goods_dis">{{ele.dis}}</h3>
          <p class="goods_type">尺寸：{{ele.type}}</p>
          <div class="goods_priceBox">
            <div class="shuBox">
              <input class="jian" @click="jian(index)" type="button" value="-">
              <input class="number" type="text" size="1" v-model="ele.zhi" >
              <input class="add" @click="add(index)" type="button" value="+">
              <input type="number" class="cartId" style="display:none" value="0">
              <!-- <i style="display:none">{{ele.id}}</i> -->
            </div>
            <p class="danPrice">￥{{ele.new}}</p>
          </div>
          <div class="now_priceBox">
            <span class="now_totalPrice" style="color:red">￥{{ele.new *ele.zhi}}</span>
            <i class="now_delete">删除</i>
          </div>
        </div>
      </div>

    </div>

    <!-- 底部合计 -->
    <div class="cart_foot">
      <div  class="quanBox">
        <input class="quan" type="checkbox" @change="isQuan">
        <span>全选</span>
      </div>
      <div class="totalBox">
        <div class="heji">合计: <span class="total" >{{allmoney}}</span> </div>
        <p>省:￥<span class="sheng">0.00</span> </p>
      </div>
      <div class="jieBox">去结算(<span>0</span>)</div>
         
    </div>
  </div>

</template>

<script>

import $ from "../../static/jquery.js"

export default {
  name:'cart',
  data () {

    return {
      cartList:[],
      shu:0,
      totalMoney:0,
      allmoney:0,
      isCheck:null      
    }
  },

  //根据实际项目的思想，直接请求后台给的api来获取购物车数据
  created(){
    var _this= this;
    
    $.get("../../static/cart.json",function(data){
        _this.cartList= data;
        console.log(data);
    })

  },
  methods:{

    add(index){
        ++ this.cartList[index].zhi;       
       this.totmoney();
    },

    jian(index){
      --this.cartList[index].zhi;
      this.totmoney()
    },
    //计算已勾选的总价
    isClick(){
      this.totmoney();
    },

    isQuan(){
      isCheck="checked";
      this.totmoney();
    },
  
    totmoney(){
      var totMoney=0;
      var _this=this;

      setTimeout(function(){

        $(".proCheck:checked").each(function(idx,ele){
        var rowmoney= Number($(ele).parents(".cartBox")[0].dataset.tot) 
        totMoney += rowmoney
        });
        _this.allmoney= totMoney
      },100);
    
    }
    
  },

  components:{
    
  }

}
</script>

<style lang="less" scoped>

 #cart{
  width:100%;
  height:6.67rem;
  position:relative;
   
  .Ctou{
      width: 3.75rem;
      height:0.45rem;
      position:fixed;
      left:0;
      top:0;
      text-align:center;
      line-height:0.45rem;
      font-size:0.14rem;
      border-bottom:1px solid #eee;
      background:#fff;
      
      .sBack{
         display:block;
         float:left;
         width:0.3rem;
         height:0.36rem;
         text-decoration:none;
         line-height:0.36rem;
         color:#666;
        .iconfont{
            font-size:0.3rem;
        }
          }
        h3{
          font-weight:normal;
          font-size:0.18rem;
         }
  } 
  // 内容
  .cart_content{
    width:100%;
    min-height:7rem;
    background:#eee;
    padding-top: 0.45rem;

    .cartBox{
      width:100%;
      height: 1.2rem;
      background:#fff;
      font-size:0.12rem;
      margin-top: 0.1rem;
      
      .trueBox{
        width:0.3rem;
        height:100%;
        float:left;
          input{
          display:block;
          width:0.2rem;
          height: 0.2rem;
          border-radius:0.2rem;
        }
      }
      .imgBox{
        display:block;
        width:0.95rem;
        height:0.95rem;
        border-radius:0.06rem;
        float:left;

      }
      .cart_disBox{
        width:2.4rem;
        height:100%;
        float:right;
      }
    }
  }

// 底部
  .cart_foot{
    width:100%;
    height:0.55rem;
    background:#fff;
    position:fixed;
    left:0;
    bottom:0;
  
    .quanBox,.jieBox,.totalBox{
      height: 100%;
      float:left

    }
    .quanBox{
      width:1rem;
      font-size:0.16rem;

    }
    .totalBox{
      .heji{
        color:#ff2150;
        .total{
          font-size:0.18rem;
        }
      }
    }

    .jieBox{
      float:right;
      width:1rem;
      background:#ff2150;
      color:#fff;
    }
  }

 }


</style>

