<template>
	<div class="courier_list">
		<toolbar></toolbar>
		<el-table
	    :data="courierList"
	    style="width: 100%;"
	    max-height="400"
	    height="400">
		    <el-table-column
		      fixed
		      prop="id"
		      label="编号"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="120">
		    </el-table-column>
		     <el-table-column
		      prop="bcarchivesDetailId"
		      label="取派员类型"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="hasPda"
		      label="是否使用PDA"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="station"
		      label="所属单位"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      prop="user.username"
		      label="录入人"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="standard"
		      label="收费标准"
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
		          @click="editRow(scope.row.id)">
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
	    <!-- 弹出框 -->
	    <div class="my-courier-edit" v-show="isEdit">
	    	<el-form ref="form" :model="courier" label-width="80px">
			  <el-form-item label="编号">
			    <el-input v-model="courier.id"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
			    <el-input v-model="courier.name"></el-input>
			  </el-form-item>
			  <el-form-item label="类型">
			  	<el-select v-model="courierTypeId" placeholder="请选择">
				    <el-option
				      v-for="item in courierType"
				      :key="item.archivesDetailName"
				      :label="item.archivesDetailName"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="启用PDA">
			    <el-radio v-model="hasPda" :label="1">是</el-radio>
  				<el-radio v-model="hasPda" :label="0">否</el-radio>
			  </el-form-item>
			  <el-form-item label="所属单位">
			    <el-input v-model="courier.station"></el-input>
			  </el-form-item>
			  <el-form-item label="录入人">
			  <el-input v-model="courier.user.username"></el-input>
			  </el-form-item>
			  <el-form-item label="收费标准">
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" >立即创建</el-button>
			    <el-button @click="isEdit = !isEdit">返回</el-button>
			  </el-form-item>
			</el-form>
	    </div>
    </div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue';
	import pagination from '../utils/pagination.vue';
	export default {
		data(){
			return {
				isEdit:false,// 是否显示编辑框
				courierList: [],// 取派员列表
				courier:{
					id:'',
					name:'',
					hasPda:'',
					station:'',
					bcarchivesDetailId:'',
					user:{
						username:''
					}
				},
				hasPda:'',
				courierTypeId:'',
				courierType:[] // 取派员类型
			}
		},
		created(){
			// 获取取派员列表
			this.getCourierList();
			// 获取取派员类型
			this.getCourierType();
		},
		methods:{
			// 获取取派员列表
			getCourierList(){
				this.$http.post('sys/courier/findAll').then(result => {
					if (result.data.courierList != undefined) {
						this.courierList = result.data.courierList;
						console.log(this.tableData4);
					}
				});
			},
			// 获取取派员类型
			getCourierType(){
				this.$http.post('sys/courier/getCourierType').then(result => {
					if (result.data.courierType != undefined) {
						this.courierType = result.data.courierType;
					}
				})
			},
			// 编辑行 id,取派员id
			editRow(id){
				this.isEdit=!this.isEdit;
				this.courier = this.courierList.filter( c => c.id == id)[0];
				this.hasPda = this.courier.hasPda;
				console.log(this.courier.bcarchivesDetailId);
				this.courierTypeId = this.courier.bcarchivesDetailId;


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
	.courier_list{
		position: relative;
		height: 100%;
		background-color: white;
		// overflow: hidden;
		padding-bottom: 32px;
		&>.my-courier-edit{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -200px;
			margin-left: -200px;
			padding:5px;
			z-index: 1001;
			width: 400px;
			height: 400px;
			background-color: white;
			overflow-y: auto;
			border: 1px solid;
		}
	}
</style>