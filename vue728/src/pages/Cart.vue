<template>
   <div id="cart">

      <div class="Ctou">
          <a href="javascript:history.go(-1)" class="sBack"><i class="iconfont icon-iconxiangzuo"></i></a>
          <h3>购物车<span>(0)</span></h3>
      </div>

    <div class="cart_content">
       
    </div>

  </div>

</template>

<script>

export default {
  name:'cart',
  data () {

    return {
      
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
          font-weight:bold;
         }
  } 

 }


</style>

