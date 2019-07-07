<template>
	<div class="fixed_region">
		<toolbar></toolbar>
		<el-table
	    :data="fixedRegionList"
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
	      prop="name"
	      label="定区名称"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="courierId"
	      label="取派员编号"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="150">
	      <template slot-scope="scope">
	        <el-button
	          plain
	          icon="el-icon-guide"
	          size="small"
	          @click.native.prevent="openRelationshipBox(scope.row.id)"
	         >
	        </el-button>
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index, customerList)"
	          plain
	          icon="el-icon-delete"
	          size="small">
	        </el-button>
	      </template>
	    </el-table-column>
	  	</el-table>
	  	<pagination></pagination>
	  	 <!-- 弹出框 -->
	    <div class="my-relationship-mgr" v-show="isEdit">
	    	<el-transfer v-model="hasDZ" :data="noDz"></el-transfer>
	    </div>
	</div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue';
	import pagination from '../utils/pagination.vue';
	export default{
		data(){
			return {
				fixedRegionList:[],
				isEdit:false,
				noDz:[],
				customerList:[],
				hasDZ:[]
			}
		},
		created(){
			this.getFixedRegionList();
			//this.getCustomer();
		},
		methods:{
			// 获取定区列表
			getFixedRegionList(){
				this.$http.get('sys/fixed/findAll').then(result => {
					if (result.data.fixedRegionList != undefined) {
						this.fixedRegionList = result.data.fixedRegionList;
					}
				})
			},
			deleteRow(index, rows) {
		    	rows.splice(index, 1);
		    },
		    openRelationshipBox(id){
		    	this.isEdit = !this.isEdit;
		    	if (this.isEdit == true) {
		    		this.getCustomer(id);
		    	}
		    },
		    // 获取定区客户列表
		    getCustomer(id){
		    	this.$http.get('sys/fixed/getCustomer?id='+id).then(result => {
					if (result.data.customerList != undefined) {
						this.customerList = result.data.customerList;
						this.customerList.forEach((item,index) => {
							let option = {
								key:item.id,
								label:item.name+'('+item.telephone+')',
								disabled:false
							};
							this.noDz.push(option);
						})
						console.log(this.noDz)
					}
					// 已经进行关联的人
					this.customerList.filter(customer => {
						if (customer.decidedzoneId != null) {
							this.hasDZ.push(customer.id);
						}
					})
				})
		    }
		},
		components:{
			toolbar,
			pagination
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	
	.fixed_region{
		position: relative;
		.my-relationship-mgr{
			width: 497.98px;
			height: 400px;		
			margin-top: -200px;
			margin-left: -248.99px;
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 1001;
			background-color: white;
			overflow-y: auto;
			// border: 1px solid;
		}
	}
</style>