<template>
	<div class="biglei">
		<router-link to="s"></router-link>
		<dl v-for="item in bigList">
	
			<dt>
				<h3 >{{item.title}}</h3>
				<p>
					<router-link to="s" v-for="i in item.lei"><span>|</span>{{i}}</router-link>
					<!-- <router-link to="s"><span>|</span>热门电器</router-link> -->						
				</p>
			</dt>
			<dd>
				<div class="pinBox" v-for="ele in item.xinxi" @click="duXinxi">
					<router-link to="/Detail"><img :src="ele.img"></router-link>
					<b class="duID">{{ele.id}}</b>
				</div>
				<!-- 注意路径写法： -->
				 <!-- <router-link to="s"><img src="/static/img1/1494840138351_2.jpg" alt=""></router-link> -->
					
			</dd>
		
		</dl>
	</div>

</template>

<script>
import $ from "../../../static/jquery.js"


export default{
	name:'biglei',
	props:['bigList'],
	data(){
		return {

		}
	},

	methods:{

		duXinxi(e){//读取当前点击的商品id放到localStorage里面
			
			var duId= $(e.target).parents(".pinBox").children(".duID").html();
			// console.log(duId);
			var storage= window.localStorage;
			
			var bigXin={
				id:duId
			};
			var bigXin=JSON.stringify(bigXin);
			storage.setItem("bigXin",bigXin);
			// console.log(bigXin);
		}
	}

}

</script>

<style lang="less" scoped>

	 .biglei{
		width:100%;
		margin-bottom: 0.43rem;
		dl{
			width: 100%;
			height: 2.3rem;
			border:1px solid #eee;
			border-bottom: none;
			a{
				text-decoration:none;
				color:#969696;
			}
			dt{
				width: 100%;
				height: 0.37rem;
				border-bottom: 1px solid #eee;
				line-height:0.37rem;

				h3{
					font-weight:normal;
					float:left;
					color:#333;
					font-size:0.14rem;
				}
				p{
					
					float:right;
					font-size:0.12rem;
	
				}
			}
			dd{
				width: 100%;
				height: 0.75rem;
				.pinBox{
					width: 0.92rem;
					height: 0.75rem;
					float:left;
					border-left:1px solid #eee;
					border-bottom:1px solid #eee;
						.duID{
							display:none;
						}
				}
				
				a{
					display:block;
					width: 0.92rem;
					height: 0.75rem;
					text-align:center;
					line-height:0.75rem;
					
					img{
						width:0.65rem;
						height: 0.65rem;
					}
				}
			}
		}
	} 


</style>