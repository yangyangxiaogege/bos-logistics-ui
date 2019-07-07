<template>
	<!-- 档案管理 -->
	<div class="archives_mgr">
		<toolbar></toolbar>
		<div class="archives_search">
			<el-input
			    placeholder="请输入内容"
			    prefix-icon="el-icon-search"
			>
			 </el-input>
			 <el-button plain type="primary">快速查找</el-button>
		</div>
		<div class="archives_list">
			<el-container>
				<el-aside>
					<el-menu
				      default-active="1"
				      class="el-menu-vertical-demo"
				      active-text-color="#ffd04b">
					    <el-submenu v-for="item in bcArchivesList" :index="item.archivesName" :key="item.id">
					        <template slot="title">
					          <i class="glyphicon glyphicon-user"></i>
					          <span>{{item.archivesName}}</span>
					        </template>
					        <el-menu-item-group>					          
					          <el-menu-item v-for="sub in item.detaiList" :index="sub.archivesDetailName"
					          @click="showDetail(item.id,sub.id)"
					          >
					      		{{sub.archivesDetailName}}
					      	  </el-menu-item>
					        </el-menu-item-group>
					    </el-submenu>
				  	</el-menu>
				</el-aside>
				<el-main>
					<el-form ref="form" label-width="100px">
					  <el-form-item label="档案编号">
					    <el-input disabled v-model="subDetail.id"></el-input>
					  </el-form-item>
					  <el-form-item label="档案名称">					    
					      <el-input v-model="subDetail.archivesDetailName"></el-input>					    
					  </el-form-item>
					  <el-form-item label="所属基础档案">					    
					      <el-input v-model="subDetail.archivesName"></el-input>
					      <input v-model="subDetail.archivesId" hidden/>					    
					  </el-form-item>
					  <el-form-item label="创建人">					    
					      <el-input v-model="subDetail.userId"></el-input>					    
					  </el-form-item>
					  <el-form-item label="创建时间">
					    <el-col :span="11">
					      <el-date-picker type="date" v-model="subDetail.operationTime" placeholder="选择日期" style="width: 100%;"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2">-</el-col>
					    <el-col :span="11">
					      <el-time-picker type="fixed-time" placeholder="选择时间"  style="width: 100%;"></el-time-picker>
					    </el-col>
					  </el-form-item>
					   <el-form-item label="备注">
					    <el-input v-model="subDetail.remark" type="textarea"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary">立即创建</el-button>
					   <el-button>取消</el-button>
					  </el-form-item>
					</el-form>
				</el-main>
			</el-container>
		</div>
	</div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue'
	export default{
		inject:['reload'],
		data(){
			return {
				bcArchivesList:[],
				subDetail:{
					id:'',
					archivesDetailName:'',
					archivesName:'',
					archivesId:'',
					userId:'',
					operationTime:'',
					remark:''
				}
			}
		},
		components:{
			toolbar
		},
		created(){
			this.getArchives()
		},
		methods:{
			// 获取档案信息列表
			getArchives(){						
				this.$http.get('sys/bcarchives/findBcArchives').then( result => {
					if (result.data.bcArchivesList != undefined) {
						this.bcArchivesList = result.data.bcArchivesList;
					}
				});
			},
			// 查看档案的详细信息 parentId 基本档案id,subId 档案明细id
			showDetail(parentId,subId){
				var archives = this.bcArchivesList.filter(archives => {
					return archives.id == parentId;
				})[0];
				
				this.subDetail = archives.detaiList[0];
				this.subDetail.archivesName = archives.archivesName;
				this.subDetail.archivesId = archives.archivesId;
			},
			test(){
				this.reload();
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.archives_mgr{
		background-color: white;
		height: 100%;
		.archives_search{
			display: flex;
			padding:10px 0;
			justify-content: space-between;
		}
		.archives_list{
			height: 100%;
			.el-container{
				height: 100%;
				height: 100%;
			}
			.el-aside{
				background-color: white;
				.el-menu{
					.el-submenu__title{
						color: black;
						font-weight: bold;
						background-color: #e8e3b4;
					}
					.el-menu--inline{
						background-color: #e8e6d3;
					}
				}
			}
			.el-main{
				background-color: white;
			}
		}
	}
</style>