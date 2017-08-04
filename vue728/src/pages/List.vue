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
			<dl class="liBox" v-for=" ele in dataList">
				<dt><img :src="ele.img" alt=""></dt>
				<dd>
					<h3>{{ele.dis}}</h3>
					<h4>包邮</h4>
					<p>
						<span class="newSell">{{ele.new}}</span>
						<span class="oldSell">{{ele.old}}</span>
						<i>{{ele.e}}</i>
					</p>

				</dd>
			</dl>
			<p class="noMore">没有更多数据了</p>
		</div>
  </div>
</template> 

<script>
import Head from "../components/Header.vue"
import $ from "../../static/jquery.js"
import Liebiao from "../../static/liebiao.json"
export default {
  name:'list',


  data () {
    return {
    	liebiao:Liebiao ,
    	dataList:''
    }
  },

	mounted(){
		//从localStorage读取刚刚点击了的选择数据
		var _this=this;

		setTimeout(function(){//注意要用延时，不然页面还没有渲染完毕，依旧是上次的内容。

			var storage=window.localStorage;
	   		var data= JSON.parse(storage.getItem("lie"));

            // console.log(data);
            // console.log(data.bigName,data.smallName);
            var big=data.bigName;
            var small=data.smallName;

	  		var _liebiao= _this.liebiao;
	  	// console.log(this.liebiao);

	 	//直接取要得数据，而不用再挨着遍历了！！！---------------重点
	 	_this.dataList= (_liebiao[big])[small];
	 	console.log(_liebiao)

		},100)
	   	
		// console.log(this.dataList);

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
	font-size:0.14rem;
}
 	.navBox{
		width:100%;
		height:0.5rem;
		
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


.li_contentBox{
	width:100%;
	padding: 0 0.1rem;

	.noMore{
		width:100%;
		height:0.35rem;
		background:##f7f7f7;
		line-height:0.35rem;
		text-align:center;
		font-size:0.12rem
	}


	.liBox{
	 	width: 100%;
	 	height:1.2rem;
	 	border:1px solid #eee;
	 	border-radius:0.05rem;
	 	margin-top: 0.1rem;
	 	dt{
	 		width:1.18rem;
	 		height:1.18rem;
	 		float:left;

	 		img{
	 			display:block;
		 		width:100%;
		 		height:100%;
	 		}
	 	}
	 	dd{
	 		width: 2.35rem;
	 		height:1.2rem;
	 		float:right;
	 		
	 		h3{
	 			color:#333;
	 			line-height:0.2rem;
	 			margin-top: 0.05rem;
	 		}
	 		h4{
	 			width:0.4rem;
	 			border: 1px solid red;
	 			padding: 0.03rem 0.05rem;
	 			color:red;
	 			border-radius:0.05rem;
	 			margin-top: 0.05rem;
	 		}
	 		p{
	 			width:100%;
	 			margin-top: 0.05rem;

	 			.newSell{
	 				color:red;
	 			}
	 			.oldSell{
	 				color:#b8b8b8;
	 				text-decoration:line-through;
	 			}
	 			i{
	 				font-style:normal;
	 				float:right;
	 				color:#8e8e8e;
	 			}

	 		}
	 	}
 }
}
	
 
</style>


