<template>
<!-- 分页器 -->
  	<div class="my_pagination">
  		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="this.$store.state.page.pageNo"
	      :page-sizes="[8, 16, 32, 64]"
	      :page-size="8"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="this.$store.state.page.totalCount"
	      ref="page">
	    </el-pagination>
  	</div>	
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				pageSize:8
			}
		},
		methods:{
			handleSizeChange(val) {
				this.$store.state.page.pageSize = val;
				this.handleCurrentChange(1);
				console.log('come size')	
		    },
		    handleCurrentChange(val) {
		    	console.log('come no')
		      	this.$store.state.page.pageNo = val;
		    	this.$store.commit('getRegionList');
		    }
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.my_pagination{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 32px;
		background-color: #35404d;
	}
</style>
