<template>
	<div class="register">
		<div class="register-box">
			<div class="register-title">
				<h1>BOS-物流管理注册系统</h1>
				<span>Logistics Management Register System</span>
			</div>
			<el-form label-width="50px">
			  <el-form-item label="账号">
			    <el-input v-model="account"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="password"></el-input>
			  </el-form-item>
			   <el-checkbox v-model="checked">同意用户协议</el-checkbox>
			  <el-button plain type="success" :loading="loading" @click="register">注册</el-button>
			</el-form>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){return {
			account:'',
			password:'',
			loading:false,
			checked:true
		}},
		methods:{
			register(){
				this.loading = true;
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.register{
		height: 100%;
		padding:50px 0;
		background-color: rgb(0,0,0);
		// opacity: 0.5;
		
		.register-box{
			width: 400px;
			margin: 0 auto;
			padding:20px;
			border:1px solid white;
			box-shadow: 0 0 5px white;
			background-color: #24262F;
			.register-title{
				margin-bottom:20px;
				h1{
					color: white;
					text-align: center;	
					margin-bottom: 0;
				}
				span{
					display: inline-block;
					width: 100%;
					text-align: center;
					color: #bed896;
				}
			}
			.register-link{
				text-align: right;
			}
			.el-checkbox{
				margin-bottom:22px;
			}

			.el-button{
				width: 100%;
			}
		}
	}
</style>