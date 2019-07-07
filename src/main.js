// 导入vue模块
import Vue from 'vue';
// 导入路由模块，并将其注册到Vue中
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
// 导入vuex进行状态管理（对组件公用数据的管理）
import Vuex from 'vuex';
Vue.use(Vuex);
// 导入axios进行ajax请求处理
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;

// 导入日期格式化插件
import moment from 'moment';

// 导入ElementUi 它是基于Vue的一款ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 导入App组件
import app from './App.vue';


// 定义全局的日期过滤器
Vue.filter('dateFormat',(dateStr,pattern = 'YYYY-MM-DD') => {
	return moment(dateStr).format(pattern);
});


// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('请求成功');
    return config;
  }, function (error) {
    // Do something with request error
    vm.$message({
			showClose: true,
			type:'error',
			message: '服务器异常'
		});
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    vm.$message({
			showClose: true,
			type:'error',
			message: '服务器异常'
	});
    return Promise.reject(error);
});

// 由于页面刷新，state数据会丢失，所以需要进行同步
var loginUser = JSON.parse(sessionStorage.getItem('userCode')) || {};
// 创建一个store,管理组件中的公共数据
const store = new Vuex.Store({
	// 公共数据
	state:{
		loginUser:loginUser,
		isImport:false,
		page:{
			pageNo:1,
			pageSize:8,
			totalCount:0,
			totalPage:1,
			forwardTo:1
		},
		regionList:[]
	},
	// 对公共数据的处理
	mutations:{
		// 启用导入功能
		enableIsImport(state){
			state.isImport = true;
		},
		// 禁用导入功能
		disableIsImport(state){
			state.isImport = false;
		},
		// 获取区域列表
		getRegionList(state){
			let page = state.page;
			// // 判断页数是否存在
			if (page.totalPage < page.pageNo) {
				vm.$message({
					showClose:true,
					type:'warning',
					message:'不存在该页数据'
				})
				return;
			}
			// pageNo当前页数 pageSize 当前页大小
			axios.get('sys/region/findAllByPage?pageNo='+page.pageNo+'&pageSize='+page.pageSize).then(result => {
				//console.log(result);
				let data = result.data;
				if (data.msg != undefined) {
					vm.$message({
						showClose:true,
						type:'warning',
						message:data.msg
					})
				}
				if (data.state == true) {
					state.regionList = data.page.data;
					state.page.pageNo = data.page.pageNo;
					state.page.pageSize = data.page.pageSize;
					state.page.totalCount = data.page.totalCount;
					state.page.totalPage = data.page.totalPage;
				}else{
					vm.$message({
						showClose:true,
						type:'success',
						message:'数据加载失败'
					})
				}
			})
		}
	},
	getters:{

	},
	setters:{}
});

// 创建Vue实例
const vm = new Vue({
	el:'#app',
	data:{},
	methods:{},
	render:c => c(app),
	router,// 挂载路由
	store// 挂载store
});