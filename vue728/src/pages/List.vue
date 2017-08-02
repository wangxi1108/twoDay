<template>
  <div class="list">
  		<tou></tou>
		<ul class="navBox">
			<li><span>综合</span></li>
			<li><span>销量</span></li>
			<li><span>新品</span></li>
			<li><span>评论</span></li>
			<li><span>筛选</span></li>

		</ul>

		<div class="li_contentBox">
			<div></div>

		</div>
  </div>
</template> 

<script>
import Head from "../components/Header.vue"

export default {
  name:'list',
  data () {

    return {
      
    }
  },
  components:{
    "tou":Head
  }

}
</script>

<style lang='less' scoped>
.list{
	width:100%;
	height:6.67rem;
	padding-top:0.42rem;
}
 	.navBox{
		width:100%;
		height:0.5rem;
		background:beige;

		li{
			float:left;
			border-bottom:1px solid #eee;

			span{
				display:block;
				width:0.75rem;
				height:0.5rem;
				line-height:0.5rem;
				text-align:center;
				border-right:1px solid #eee;
				
			}
		}
 	}


 .listBox{
 	width: 100%;
 }
</style>


