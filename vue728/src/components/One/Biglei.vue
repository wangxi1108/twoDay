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
				<router-link to="s" v-for="img in item.url"><img :src="img"></router-link>
					
				<!-- 注意路径写法： -->
				 <!-- <router-link to="s"><img src="/static/img1/1494840138351_2.jpg" alt=""></router-link> -->
					
			</dd>
		
		</dl>

	</div>


</template>

<script>
export default{
	name:'biglei',
	props:['bigList'],
	method(){

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
				
				
				a{
					display:block;
					float:left;
					width: 0.92rem;
					height: 0.75rem;
					text-align:center;
					line-height:0.75rem;
					
					border-left:1px solid #eee;
					border-bottom:1px solid #eee;
					img{
						width:0.65rem;
						height: 0.65rem;
					}
				}
			}
		}
	} 


</style>