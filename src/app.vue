<template>
	<div id="app">
		<!-- 这里只用来显示组件 -->
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				// routerPath:this.$route.path
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	#app{
		height: 100%;
	}
</style>