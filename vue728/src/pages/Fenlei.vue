<template>
	<div class="fenlei">
				
		<header>
	        <router-link to="#" class="letf_a"><i class="iconfont icon-iconxiangzuo"></i></router-link>
	       
	        <router-link to="#" class="right_a">
	        	<span>寻找宝贝</span>
	         	<i class="iconfont icon-magnifier"></i>
	        </router-link>
      	</header>

		<div class="content">
			<ul class="con_left">
				<!-- <li>
					<router-link to="#" @click="dian">食品/饮料/酒水</router-link>
				</li> -->
				<li v-for="(lei, index) in leftList" :data-key=lei.id @click="changeBg(index)" :class="{'active':ind === index}">
					{{lei.msg}}
				</li>
				
							
			</ul>
			<div class="con_right">
				
				<dl v-for="ele in lists">

					<dt>{{ele.title}}</dt>
					<dd>
						<router-link to="/List" v-for="i in ele.img">{{i}}</router-link>
					</dd>

				</dl>

			</div>
				
		</div>

	</div>


</template>

<script>

import fen from '../../static/fen.css'
import _conRight from '../../static/conRight.json'


export default{
	name:'fenlei',
	data(){
		return {
			ind:0,
			
			lists:_conRight.one,

			leftList:[
				{msg:"食品/饮料/酒水",id:"1"},
				{msg:"鞋靴/箱包/配饰",id:"2"},
				{msg:"珠宝/眼镜/钟表",id:"3"},
				{msg:"母婴/电教/玩具",id:"4"},
				{msg:"母婴/电教/玩具",id:"5"},
				{msg:"鞋靴/箱包/配饰",id:"6"},
				{msg:"珠宝/眼镜/钟表",id:"7"},
				{msg:"母婴/电教/玩具",id:"8"},
				{msg:"母婴/电教/玩具",id:"9"},
				{msg:"珠宝/眼镜/钟表",id:"10"},
				{msg:"鞋靴/箱包/配饰",id:"11"},
				{msg:"珠宝/眼镜/钟表",id:"12"},
				{msg:"母婴/电教/玩具",id:"13"},
				{msg:"母婴/电教/玩具",id:"14"},
				{msg:"珠宝/眼镜/钟表",id:"15"}

			]
		}
	},
	 methods: {
	    changeBg (index) {

	     	this.ind = index;
	     	// console.log(this.ind);
		     	
		     	switch(index){
		     		case 0:
		   			this.lists= _conRight.one;
		   			break;
		   			case 1:
		   			this.lists= _conRight.two;
		   			break;
		   			case 2:
		   			this.lists= _conRight.three;
		   			break;
		     	}
	    	}
	   },

	components:{

	}
}

</script>

<style lang="less" scoped>

	.fenlei{
	   position:relative;
		width:3.75rem;
		height:6.67rem;
	  }

  header{
    width: 100%;
    height:0.42rem;
    position:fixed;
    left:0;
    top:0;
	padding-top: 0.03rem;
	border-bottom: 1px solid #eee;

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

	.active{
		background:#fff;
	}
</style>