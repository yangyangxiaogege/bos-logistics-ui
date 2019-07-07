<template>
	<div class="region_list">
		<toolbar></toolbar>
	  	<el-table
	    :data="this.$store.state.regionList"
	    style="width: 100%;"
	    max-height="400"
	    height="400">
	    <el-table-column
	      fixed
	      prop="id"
	      label="编号"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="province"
	      label="省份"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="city"
	      label="城市"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="county"
	      label="村镇"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="shortCode"
	      label="简码"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="cityCode"
	      label="城市简码"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="150">
	      <template slot-scope="scope">
	        <el-button
	          plain
	          icon="el-icon-edit"
	          size="small"
	         >
	        </el-button>
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index, courierList)"
	          plain
	          icon="el-icon-delete"
	          size="small">
	        </el-button>
	      </template>
	    </el-table-column>
	  	</el-table>
	  	<pagination></pagination>
	</div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue';
	import pagination from '../utils/pagination.vue';

	export default {
		data(){
			// private String id; // 区域id
			// private String province; // 省
			// private String city; // 市
			// private String county; // 县/区
			// private String postalCode; // 邮编
			// private String shortCode; // 简码
			// private String cityCode; // 城市编码
			return {
				
			}
		},
		created(){
			// 初始化数据
			this.getRegionList();
		},
		mounted(){
			// 启用导入数据功能
			this.$store.commit('enableIsImport');
		},
		methods: {
			// 获取区域信息列表
			getRegionList(){
				this.$store.commit('getRegionList');
			},
		    deleteRow(index, rows) {
		    	rows.splice(index, 1);
		    }   
	    },
		components:{
			toolbar,
			pagination
		}
	}
</script>

<style type="text/css" lang="less">
	.region_list{
		position: relative;
		height: 100%;
		background-color: white;
		// overflow-y: hidden;
		padding-bottom: 32px;
		
	}
</style>