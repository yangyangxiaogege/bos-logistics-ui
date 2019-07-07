<template>
	<div class="archives_add">
		<toolbar></toolbar>
		<el-form ref="form" label-width="100px">
		  <el-form-item label="档案名称">					    
		      <el-input v-model="archives.archivesDetailName"></el-input>					    
		  </el-form-item>
		  <el-form-item label="所属基础档案">					    
		  	<el-select v-model="archives.archivesId" placeholder="请选择活动区域">
		      <el-option v-for="item in bcArchivesList" :label="item.archivesName" :value="item.id" :key="item.archivesName"></el-option>
		     <!--  <el-option label="区域二" value="beijing"></el-option> -->
		    </el-select>					    
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-col :span="11">
		      <el-date-picker 
		      ref='picker'
		      type="date" 
		      v-model="archives.operationTime" 
		      placeholder="选择日期"
		      value-format="yyyy-MM-dd HH:mm:ss" 
		      :picker-options="pickerOptions"
		      @blur="pickerBlur"
		      :clearable=false
		      style="width: 100%;">
		      </el-date-picker>
		    </el-col>
		    <el-col class="line" :span="2">-</el-col>
		    <el-col :span="11">
		      <el-time-picker type="fixed-time" placeholder="选择时间"  style="width: 100%;"></el-time-picker>
		    </el-col>
		  </el-form-item>
		   <el-form-item label="备注">
		    <el-input v-model="archives.remark" type="textarea"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="addBcArchivesDetail">立即创建</el-button>
		   <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue';
	import QS from 'qs';
	import moment from 'moment';
	let userId = sessionStorage.getItem('userCode') == null ? 0 : JSON.parse(sessionStorage.getItem('userCode')).id;
	export default{
		data(){
			return {
				archives:{ // 文档明细对象
					archivesDetailName:'',
					archivesName:'',
					archivesId:'',
					userId:userId,
					operationTime:'',
					remark:''
				},
				bcArchivesList:[],// 基础文档列表
				pickerOptions:{ //当前时间日期选择器特有的选项
					disabledDate(now){ // 禁止用户修改时间
						return true;
					}
				}
			}
		},
		created(){
			// 设置选中日期为当前日期
			this.pickerBlur();
			// 获取基础文档
			this.getBcArchivesList();
		},
		methods:{
			// 获取基础档案列表
			getBcArchivesList(){
				this.$http.post('sys/bcarchives/findAll').then(result => {
					if (result.data.bcArchivesList != undefined) {
						this.bcArchivesList = result.data.bcArchivesList;
						//console.log(this.bcArchivesList);
					}
				})
			},
			// 添加档案信息
			addBcArchivesDetail(){
				var param = QS.stringify(this.archives);
				console.log(param);
				if (this.checkForm() == false) return;
				// 发送请求
				this.$http.post('sys/bcarchivesdetail/add',param).then(result => {
					if (result.data.state == true) {
						this.$message({
				          showClose: true,
				          type:'success',
				          message: '添加成功'
				        });
					}
				})
			},
			// 表单验证
			checkForm(){
				var flag = true;
				if (this.archives.archivesDetailName.trim() == '') {
					this.$message({
			          showClose: true,
			          type:'warning',
			          message: '档案名称不能为空'
			        });
					return false;
				}else {
					// 检查档案名是否可用
					this.checkArchivesDetailName(state => {
						console.log(state);
						if (state != true) {
							this.$message({
					          showClose: true,
					          type:'warning',
					          message: '该档案名已经存在'
					        });
							flag = false;
						}
					})
				}

				if (flag == false) return false;

				if (this.archives.archivesId == '') {
					this.$message({
			          showClose: true,
			          type:'warning',
			          message: '请选择所属基础档案类型'
			        });
					return false;
				}
				return true;
			},
			// 设置选中日期为当前日期
			pickerBlur(){
				this.archives.operationTime = moment().format("YYYY-MM-DD HH:mm:ss");
			},
			// 检查用户名是否可用
			checkArchivesDetailName(callback){
				this.$http.post('sys/bcarchivesdetail/checkName?name='+this.archives.archivesDetailName).then(result => {
						callback(result.data.state)
				})
			}
		},
		components:{
			toolbar
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.archives_add{
		background-color: white;
		height: 100%;
	}
</style>