<template>
  <div>
     <header>
          <a href="javascript:history.go(-1)" class="letf_a"><i class="iconfont icon-iconxiangzuo"></i></a>
         
          <router-link to="#" class="right_a">
            <span>寻找宝贝</span>
            <i class="iconfont icon-magnifier"></i>
          </router-link>
        </header>
  </div>
</template> 

<script>

export default {
  // name:'head',
  data () {

    return {
      
    }
  },
  components:{
    
  }

}
</script>

<style lang="less"  scoped>
  

   header{
      width: 100%;
      height:0.42rem;
      position:fixed;
      left:0;
      top:0;
      padding-top: 0.03rem;
      border-bottom: 1px solid #eee;
      background:#fff;

    .letf_a{
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
  .right_a{
      display:block;
      float:left;
      width:2.62rem;
      height:0.36rem;
      background:#f7f7f7;
      line-height:0.36rem;
      border-radius:0.05rem;
      color:#969696;
      text-decoration:none;
      margin-left: 0.25rem;
    span{
      float:left;
    }
    i{
      float:right;
    }
    .iconfont{
      font-size:0.24rem;
    }

  }
    
  }
</style>


