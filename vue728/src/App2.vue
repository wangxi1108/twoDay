<template>
	<!-- 此为最大的组件，App是里面的，然后App里面还有小组件路由。 -->
	<div id="app2">
		<router-view></router-view>

	</div>

</template> 

<script>
  export default {
    name: 'app2'
  }
</script>

<style>
	
	#app2{
		width: 100%;
		height:100%;
		
	}
</style>