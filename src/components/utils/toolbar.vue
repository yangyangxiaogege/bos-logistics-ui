<template>
	<div class="utils_toolbar">
		<!-- 局部组件刷新 -->
		<el-tooltip content="刷新" placement="top" effect="light">
			<!-- <el-button plain icon="el-icon-refresh" size="small" @click="refresh"></el-button> -->
			<i class="utils-icon el-icon-refresh" @click="refresh"></i>
		</el-tooltip>
		<el-tooltip content="查询" placement="top" effect="light">
			<i class="utils-icon el-icon-search" @click="refresh"></i>
		</el-tooltip>
		<el-tooltip content="导入数据" placement="top" effect="light">
			<i class="utils-icon el-icon-upload" @click="openFileBox" v-if="$store.state.isImport"></i>
		</el-tooltip>
		<input type="file" name="upload" style="display: none" ref="upload" @change="upload">
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	// 由于axios已经进行了全局配置，做上传操作时可能会被拦截，所以在这里创建一个新的实例
	var instance = axios.create({
	  baseURL:  'http://localhost:8080/',
	  timeout: 1000,
	  headers: { "Content-Type": "multipart/form-data"}
	});
	export default{
		inject:['reload'],
		data(){
			return {
				
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				this.$store.commit('disableIsImport');
			},
			refresh(){
				this.reload();
			},
			openFileBox(){
				this.$refs.upload.value = '';
				this.$refs.upload.click();
				//console.log(this.$refs);
				console.log('执行完毕');
			},
			upload(){
				let upload = this.$refs.upload;
				if (upload.value != undefined && upload.value != null && upload.value != '') { // 上传文件
					// 获取文件
					let files = upload.files;
					// 判断文件是否是xls类型
					let pattern = /\.xls$/;
					if (!pattern.test(upload.value)) {
						this.$message({
							showClose:true,
							type:'warning',
							message:'文件类型必须为xls'
						})
						return;
					}
					// 用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成
					let param = new FormData();
					param.append("file",files[0]);
					instance.post('sys/region/regionImport',param,{timeout: 1000 * 60}).then(result => {
						if (result.data.state == true) {
							this.$message({
								showClose:true,
								type:'success',
								message:'导入数据成功'
							})
						}
					})
				}
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.utils_toolbar{
		position: fixed;
		top: 100px;
		z-index: 1000;
		width: 100%;
		background-color: #35404d;
		.utils-icon{
			padding: 8px;
			font-size: 20px;
			color: white;
		}
	}
</style>