<template>
	<div class="detail">
	  <div class="detail_content">
		<div class="Stou">
          <a href="javascript:history.go(-1)" class="sBack"><i class="iconfont icon-iconxiangzuo"></i></a>
          <h3>商品详情</h3>
		</div>

		<div class="swiper-container">
	       <div class="swiper-wrapper">
	           <div class="swiper-slide"><img :src="detailDis.img" alt=""></div>
	           <div class="swiper-slide"><img src="../../static/img1/1494579829512_2.jpg" alt=""></div>
	       	</div>
       		<div class="swiper-pagination"></div>
   		</div>

   		<div class="detailBox">
   			<h3>{{detailDis.dis}}</h3>
   			<div class="goods_price">
	            <p class="goods_price_number">￥{{detailDis.new}}<span class="tag" id="promotion">新品促销</span></p>
	            <p class="goods_price_right">运费￥0　|　好评率25%</p>
        	</div>
        	<div class="goods_oldPrice">
	            <label>价格:</label>
	            <del>￥{{detailDis.old}}</del>
	        </div>
	        <p class="goods_buy_give mt5">送e点:<span class="e_spot">{{detailDis.e}}</span></p>
   		</div>
   		<section>
   			背景
   		</section>
   	
	  </div>
	<!-- 详情底部 -->
	    <div class="detail_foot">
   			<div class="service"><i></i><span>客服</span></div>
   			<div class="collect"><i></i><span>收藏</span></div>
   			<button class="add_cart" @click="openAll">加入购物车</button>
   			<button class="buy_now" @click="openAll">立即购买</button>

   		</div>

   		<div class="all_cover" v-show="look"></div>

   	<!-- 购买弹窗 -->
		<div class="buyCover" v-show="look">
		 		<div class="buy_disBox">
		 			<img class="buy_img" :src="detailDis.img"  alt="">
		 			<div class="buy_dis">
		 				<h2 class="price">￥{{detailDis.new}}</h2>
		 				<h3>送e点：<span class="eDian">{{detailDis.e}}</span></h3>
		 				<h3>库存498件</h3>
		 				<h3>已选<span>1-1.5g</span></h3>
		 			</div>
		 			<p class="close" @click="closeAll">X</p>

		 		</div>
		 		<div class="buy_type">
		 			<h3>克重</h3>
		 			<p class="zhong">1-1.5g</p>
		 		</div>
		 		<div class="buy_number">
		 			<span>数量</span>
		 			<div class="caozuo">
		 				<p @click="jian">-</p>
		 				<p><input class="shu" type="text" v-model="zhi"></p>
		 				<p @click="add">+</p>
		 			</div>
		 		</div>
		 		<div class="buy_btn">
		 			<button class="buy_btn_add">加入购物车</button>
		 			<button class="buy_btn_now">立即购买</button>
		 		</div>
		</div>

	<!-- 查看购物车 -->
		<router-link to="/Cart" class="look_cart" ><i class="iconfont icon-gouwuche"></i></router-link>
		

	</div>

</template>

<script>

//不要把css放在外面，样式会不起作用，弄死都调不出来
import $ from "../../static/jquery.js"
import Liebiao from "../../static/liebiao.json"

export default{

	name:'detail',
	data(){
		return{
			look:false,
			liebiao:Liebiao,
			detailDis:'', //列表详情信息
			zhi:1
		}
	},

	beforeMount(){ //读取localStorage里面的id,读取信息，放模板
		var _this= this;

		setTimeout(function(){ //给点时间让它渲染完！
			var storage= window.localStorage;
			var data= JSON.parse(storage.getItem("bigXin"));
			var localId= data.id;
				// console.log("id是: "+data.id);
			// console.log(this.liebiao);
			
		// 根据遍历，找到相同id所在的那条商品信息。-------重点---------------！！！！！！
			var _liebiao= _this.liebiao;

			for(var one in _liebiao){
				for(var two in _liebiao[one]){

					let arr=(_liebiao[one])[two]

					for(let i=0;i<arr.length;i++){
						// console.log(arr[i].id)
						let lieId= arr[i].id;
						if(localId== lieId){
							// console.log(arr[i]);
							_this.detailDis= arr[i];
							console.log(_this.detailDis);
						}
					}
					
				}
			}	

		},100);


	},


	mounted(){
          var swiper = new Swiper('.swiper-container', {
              autoplay: 4000
          })
       },

    methods:{
    	openAll(){
    		this.look= true;
    	},
    	closeAll(){
    		this.look= false;
    	},
    	add(){
    		this.zhi++;
    		// console.log(this.zhi);

    	},
    	jian(){
    		this.zhi--;
    		if(this.zhi<=1){
    			this.zhi=1
    		}
    		
    	}
    },

	components:{

	}
}


</script>

<style lang="less" scoped>

.detail{
	width:100%;
	height:6.67rem;
	position:relative;
	overflow:auto;


	.look_cart{
		position:fixed;
		display:block;
		width:0.36rem;
		height:0.36rem;
		left: 0.1rem;
		top:5.6rem;
		text-decoration:none;
		color:#666;

		.iconfont{
			font-size:0.36rem;
		}
	}
	
	// 底部
.detail_foot{
	width:3.75rem;
	height:0.56rem;
	background:#fff;
	position: fixed;
	z-index:10;
	bottom: 0;
	left: 0;
	font-size:0.14rem;
	
	.service,.collect{
		width:0.7rem;
		height:0.5rem;
		border-right: 1px solid #eee;
		line-height:0.5rem;
		text-align:center;
		float:left;
	}
		.add_cart, .buy_now{
			width:1.1rem;
			height:0.5rem;
			border: 1px solid #ff2150;
			border-radius:0.05rem;
			background:#fff;
		}

		.buy_now{
			background:#ff2150;
		}

}
//遮罩
 .all_cover{
	width: 3.75rem;
	height:6.67rem;
	background:#7d7d7d;
	position:fixed;
	left: 0;
	top: 0;
	z-index: 20;
	opacity:0.5;
}

//buyCover 购买弹框
.buyCover{

	width:100%;
	height:3.8rem;
	background:#fff;
	position:fixed;
	bottom:0;
	left:0;
	z-index:50;
	padding-top: 0.1rem;
	
	.buy_disBox{
		width:100%;
		height:1.4rem;
		
		font-size:0.14rem;

		.buy_img{
			width:1.14rem;
			height:1.14rem;
			float:left;
		}
		.buy_dis{
			width:2rem;
			height:100%;
			// border:1px solid red;
			float:left;
			.price{
				color:red;
				font-size:0.16rem;
			}
			h3{
				line-height:0.24rem;
			}
			.eDian{
				color:red;
			}
		}
		.close{
			float:right;
			font-size:0.24rem;
		}
	}

	.buy_type{
		margin-top:0.2rem;

		.zhong{
			width:0.5rem;
			height:0.3rem;
			background:#eee;
			font-size:0.14rem;
		}
	}
	.buy_number{
		width:100%;
		height:0.4rem;
		border-top:1px solid #eee;
		border-bottom:1px solid #eee;
		span{
			float:left;
		}
		.caozuo{
			float:right;

			p{
				float:left;
				width:0.3rem;
				height:0.3rem;
				background:#eee;
				margin-left: 0.03rem;
				font-size:0.2rem;
			}
			.shu{
				border:0;
				outerline:0;
				width:0.3rem;
				background:#eee;

			}

		}
	}

	.buy_btn{
		width:3.75rem;
		height:1rem;
		padding: 0.25rem 0;

		button{
			width:50%;
			height: 0.5rem;
			line-height:0.5rem;
			text-align:center;
			color:#fff;
			border:0;
			display:block;
			float:left;

		}
		.buy_btn_add{
			background:#ff2150;
		}
		.buy_btn_now{
			background:#d0022d;
		}

	}
	

}




  .detail_content{
  	width: 100%;
	
  }
	.Stou{
		width: 3.75rem;
		height:0.45rem;
	
		text-align:center;
		line-height:0.45rem;
		font-size:0.14rem;

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
	.swiper-container{
	    width:100%;
	    height: 2rem;
	    border-bottom:1px solid red;

	    img{
	      width:100%;
	      height: 2rem;
	    }
	  }

	  .detailBox{
	  	width:100%;
	  	height:1.5rem;
	  	padding: 0.1rem 0.15rem;
	    border-bottom: solid 1px #eee;
	    background-color: #fff;
	    font-size:0.14rem;

		.goods_price{
			overflow: hidden;
    		margin-top: 0.05rem;
		  	.goods_price_number{
		  		font-size: 0.16rem;
	    		float: left;
	    		    color: #ff2150;
	    		    .tag{
						background-color: #ff2150;
					    color: #fff;
					    margin-left: 0.07rem;
					    padding: 0 0.05rem;
					    font-size: 0.12rem;
					    display: inline-block;
					    margin-top: -0.03rem;
		  			}
		  	}
		  	.goods_price_right {
			    float: right;
			    color: #969696;
			}
		}

		.goods_oldPrice{
			font-size:0.12rem;
			color:#999;
		  	
	  	}
	  	.e_spot{
	  		color:#ff2150;
	  	}
	}

	section{
		width: 100%;
		height:8rem;
		background:beige;
	}
}
</style>