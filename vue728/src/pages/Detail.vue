<template>
	<div class="detail">
		<div class="Stou">
          <router-link to="#" class="sBack"><i class="iconfont icon-iconxiangzuo"></i></router-link>
          <h3>商品详情</h3>
		</div>

		<div class="swiper-container">
	       <div class="swiper-wrapper">
	           <div class="swiper-slide"><img src="../../static/img1/1499476874118_2.jpg" alt=""></div>
	           <div class="swiper-slide"><img src="../../static/img1/1494579829512_2.jpg" alt=""></div>
	       	</div>
       		<div class="swiper-pagination"></div>
   		</div>

   		<div class="detailBox">
   			<h3>天鑫洋 足金/黄金转运珠手链 彩绳+黄金转运珠</h3>
   			<div class="goods_price">
	            <p class="goods_price_number">￥588<span class="tag" id="promotion">新品促销</span></p>
	            <p class="goods_price_right">运费￥0　|　好评率25%</p>
        	</div>
        	<div class="goods_oldPrice">
	            <label>价格:</label>
	            <del>￥588.00</del>
	        </div>
	        <p class="goods_buy_give mt5">送e点:<span class="e_spot">71点</span></p>
   		</div>
   		<section>
   			背景
   		</section>

	</div>

</template>

<script>
export default{
	name:'detail',
	data(){
		return{

		}
	},
	mounted(){
          var swiper = new Swiper('.swiper-container', {
              autoplay: 4000
          })
       },
	components:{

	}
}


</script>

<style lang="less" scoped>
.detail{
	width:100%;

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
	  	height:1rem;
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