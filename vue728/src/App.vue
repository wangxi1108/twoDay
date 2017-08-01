<template>
  <div id="app">
    <router-view></router-view>
    <footer>

      <router-link to="/">
        <i class="iconfont icon-shouye"></i>
        <p>首页</p>
      </router-link>
       <router-link to="/Fenlei">
        <i class="iconfont icon-fenlei-copy-copy"></i>
        <p>分类</p>
      </router-link>
       <router-link to="/Welfare">
        <i class="iconfont icon-quyuchaxun"></i>
        <p>福利专区</p>
      </router-link>
       <router-link to="/My">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>

    </footer>

  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  
#app {
  width: 100%;
  height: 100%;
  font-size: 0.14rem;

}

footer{
  width: 100%;
  height: 0.43rem;
  background: #fff;
  border-top: 2px solid red;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content:space-around;
}

footer a{
  display: block;
  text-decoration: none;
  color:#000;
}

footer a p{
  font-size: 0.12rem;
   color: #000;
}

footer .iconfont{
  font-size: 0.22rem;
}

footer .router-link-active .iconfont{
  color: red;
}
</style>
