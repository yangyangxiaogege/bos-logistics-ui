<template>
	<div class="main">
		<!-- 采用elementui的container布局 -->
		<el-container>
			<!-- 顶部区域 -->
			<el-header>
				<h1>
					<i class="el-icon-setting"></i>
					BOS-物流管理系统
				</h1>
				<el-menu
				  class="el-menu-demo"
				  mode="horizontal"
				  background-color="white"
				  text-color="black"
				  active-text-color="#ffd04b">
				  <el-menu-item index="1">处理中心</el-menu-item>
				  <el-submenu index="2">
				    <template slot="title">我的工作台</template>
				    <el-menu-item index="2-1">选项1</el-menu-item>
				    <el-menu-item index="2-2">选项2</el-menu-item>
				    <el-menu-item index="2-3">选项3</el-menu-item>
				  </el-submenu>
				  <el-menu-item index="3"><a href="javascript:void(0)" @click="exit">退出</a></el-menu-item>
				</el-menu>
			</el-header>
			<el-container>
				<!-- 侧边栏 -->
				<el-aside width="210px">
					<el-menu
				      default-active="2"
				      class="el-menu-vertical-demo"
				      text-color="#fff"
				      active-text-color="#ffd04b"
				      @open="handleOpen"
				 	>
				      <!-- 当前登陆用户 -->
				      <span class="current-user">欢迎{{this.$store.state.loginUser.role.roleName}},{{this.$store.state.loginUser.username}}</span>
				      <el-submenu v-for="menu in navMenu" :index="menu.index" :key="menu.index">
				        <template slot="title">
				          <i :class="menu.icon"></i>
				          <span>{{menu.name}}</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item v-for="sub in menu.sub" :index="sub.index" @click="addTab($event,sub.routerName)" route>
				          	<i :class="sub.icon"></i>
					         {{sub.name}}
					      </el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>
				    </el-menu>
				</el-aside>
				<!-- 主要内容区域 -->
				<el-main>
					<!-- tabs栏 -->
					<el-tabs v-model="activeName"  @tab-click="handleClick" @tab-remove="removeTab">
					    <el-tab-pane  v-for="(item,index) in tabList" :name="item.name" :key="item.label" :closable="item.closable">
					    	 <span slot="label"><i :class="item.iconClass"></i>{{item.label}}</span>
					    </el-tab-pane>
					</el-tabs>
					<router-view v-if="isRouterAlive"></router-view>
					<!-- <iframe src="http://www.baidu.com">
					</iframe> -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script type="text/javascript">
	import navMenu from '../../menu.js';
	export default{
		provide(){
			return {
				reload:this.reload
			}
		},
		data(){
			return {
				isRouterAlive:true,
				activeName:'1',
				tabList:[{
					name:'1',
					label:'首页',
					iconClass:'el-icon-menu',
					routeName:'welcome'
				}],
				navMenu:navMenu
			}
		},
		created(){
			this.$router.push({name:'welcome'});
		},
		methods:{
			// 局部刷新组件
			reload(){
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				})
			},
			// 展开导航时触发
			handleOpen(key,path){
				//console.log(key,path);
			},
			// tab被选中时触发
			handleClick(tab,event){
				var tab = this.tabList.filter(item => item.name == tab.name)[0];
				// 编程式导航（使用js控制路由）
				this.$router.push({ name: tab.routeName});
			},
			// 添加tab项
			addTab(target,routeName){
				// 是否继续添加
				var isContinue = true;
				// tab lable
				var label = target.$el.innerText;
				// 判断是否已存在该tab
				this.tabList.find( item => {
					// tabList中已经存在该tab项
					if (item.label == label) {
						this.activeName = item.name;
						isContinue = false;
						this.$router.push({ name: routeName});
					}
				})
				// 结束操作
				if (isContinue == false) return;

				// tab name
				var name = (this.tabList.length+1).toString();
				
				this.activeName = name;
				// tab对象
				var tab = {name:name,label:label,closable:true,routeName:routeName};
				// 添加到数组中
				this.tabList.push(tab);

				// 编程式导航（使用js控制路由）
				this.$router.push({ name: routeName})
			},
			// 移除tab项
			removeTab(targetName){
				// 当前tab选中项的name
				var activeName = this.activeName;

				// 移除当前tab后，让下一个选中（如果后边有tab项）或者上一个选中（后边没有tab）
				var tabs = this.tabList;
				tabs.forEach((item,index) => {
					// 当前选中项和操作项是同一个，需要重新选中tab
					if (item.name == targetName) {
						var nexTab = tabs[index+1] || tabs[index-1];
						if (nexTab) {
							activeName = nexTab.name;
							this.$router.push({ name: nexTab.routeName});
						}
 					}
				});

				// 重新将获取tab列表
				this.activeName = activeName;
				this.tabList = tabs.filter(tab => tab.name!=targetName);
			},
			// 退出系统
			exit(){
				// 删除sessionStorage中存储的用户信息
				sessionStorage.removeItem('userCode');
				// 发送请求到后台
				this.$http.get('exit').then( result => {
					if (result.data.state) {
						// 跳转到登陆页面
						this.$router.push({name:"login"});
					}
				})
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.main{
		height: 100%;
		&>.el-container{
			height: 100%;
			&>.el-container{
				&>.el-main{
					padding: 0;
					padding-top: 76px;
					background:white;
					.el-tabs{
						position: fixed;
						top: 60px;
						z-index: 1000;
						width: 100%;
						background:#35404d;
						color: white;
						text-align: center;
						.el-tabs__header{
							margin-bottom: 0px;
						}
						.el-tabs__item{
							color:white!important;
							min-width: 46.99px;
							//text-align: center;
							&.is-active{
								// background:#a2abb6;
							}
						}
					}
				}
				&>.el-aside{
					min-height: 100%;			
					background:#35404d;
					.current-user{
						width: 100%;
						height: 40px;
						line-height: 40px;
						display: inline-block;
						color: white;
						font-size: 14px;
						text-align: center;
						background-color:#35404d; 
					}
					.el-submenu__title{
						background-color: #404a50;

					}
					.el-menu--inline{
						background-color:#545c64;
						.el-menu-item:hover{
							background-color: #545c64;
							i{
								color: #ffd04b!important;
							}
							color: #ffd04b!important;
						}
					}
				}
			}
			
			&>.el-header{
				display: flex;
				background:white;
				justify-content: space-between;
				h1{
					margin: 0;
					height: 100%;
					line-height: 60px;
				}
			}
		}
	}
</style>
