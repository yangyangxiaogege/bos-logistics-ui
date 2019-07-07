<template>
	<div class="login">
		<div class="login-box">
			<div class="login-title">
				<h1>BOS-物流管理系统</h1>
				<span>Logistics Management System</span>
			</div>
			<el-form label-width="70px">
			  <el-form-item label="用户名">
			    <el-input v-model="username" placeholder="请输入用户名"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
			  </el-form-item>
			  <p class="register-link">
			  	<router-link to="/register">还没有账号?去注册一个>></router-link>
			  </p>
			  <el-button plain type="success" :loading="loading" @click="login">登陆</el-button>
			</el-form>
		</div>
	</div>
</template>

<script type="text/javascript">
	// 这个模块是axios中已经包含的，
	// springmvc 默认只能解析?xx=xx&xx=xx..形式的参数，而axios 在使用post方式提交时，它会将我们的参数转换为json格式
	// 所以我们需要通过qs模块对参数进行操作，将其转换为query形式
	import QS from 'qs';
	export default{
		data(){return {
			username:'admin', // 用户名
			password:'admin', // 用户密码
			loading:false
		}},
		methods:{
			// 登陆
			login(){
				// 当表单验证操作通过时才会执行后续操作
				if(this.checkForm() == false) return;

				// 将状态改为加载状态
				this.loading = true;
				var postData = QS.stringify({username:this.username,password:this.password});
	
				this.$http.post('login',postData,{timeout: 1000 * 60}).then(result => {
					
					if (result.data.msg != undefined) {
						this.$message({
				          showClose: true,
				          type:'warning',
				          message: result.data.msg
				        });
				        this.loading = false;
					}else{
						// 登陆成功
						sessionStorage.setItem('userCode',JSON.stringify(result.data.loginUser));
						this.$store.state.loginUser = result.data.loginUser;
						// 进入系统首页
						this.$router.push({name:'welcome'});
					}
				}).catch((error) => {
					this.loading = false;
					this.$message({
				          showClose: true,
				          type:'error',
				          message: "请求超时"
				    });
				})
			},
			// 表单验证
			checkForm(){
				if (this.username.trim() == '') {
					this.$message({
			          showClose: true,
			          type:'warning',
			          message: '账号不能为空'
			        });
					return false;
				}else if (this.password.trim() == '') {
					this.$message({
			          showClose: true,
			          type:'warning',
			          message: '密码不能为空'
			        });
					return false;
				}
				return true;
			}

		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.login{
		height: 100%;
		padding:50px 0;
		background-color: rgb(0,0,0);
		// opacity: 0.5;
		
		.login-box{
			width: 400px;
			margin: 0 auto;
			padding:20px;
			border:1px solid white;
			box-shadow: 0 0 5px white;
			background-color: #24262F;
			.login-title{
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
			.el-button{
				width: 100%;
			}
		}
	}
</style>