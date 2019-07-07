import VueRouter from 'vue-router'

// 导入app 组件
import app from './app.vue'
// 导入home组件
import home from './components/home/home.vue'
import welcome from './components/home/welcome.vue'
import login from './components/home/login.vue'
import register from './components/home/register.vue'
// 导入bc_archives组件
import archivesSearch from './components/bc_archives/archivesSearch.vue'
import archivesAdd from './components/bc_archives/archivesAdd.vue'
// 导入courier组件
import courierList from './components/courier/courierList.vue'
import courierAdd from './components/courier/courierAdd.vue'
// 导入region 组件
import regionList from './components/region/regionList.vue'
import subregionAdd from './components//region/subregionAdd.vue'
import fixedRegion from './components/region/fixedRegion.vue'

var router = new VueRouter({
	// 匹配规则
	routes:[
		{path:'/',redirect:'/login'},
		{
			path:'/login',
			component:login,
			name:'login',
			meta:{
				// 表示不被拦截验证
				noAuth:true
			}
		},
		{
			path:'/register',
			component:register,
			name:'register',
			meta:{
				noAuth:true
			}
		},
		{
			path:'/sys',
			component:home,
			name:'sys',
			children: [
                { path: 'welcome', component: welcome,name:'welcome' }
                
            ]
        },
        {
        	path:'/basic',
        	component:home,
       		children:[
       			{ path: 'archivesSearch', component: archivesSearch,name:'archivesSearch'},
       			{ path: 'archivesAdd', component: archivesAdd,name:'archivesAdd'}
       		]
        },
        {
        	path:'/courier',
        	component:home,
       		children:[
       			{ path: 'courierList', component: courierList,name:'courierList'},
       			{ path: 'courierAdd', component: courierAdd,name:'courierAdd'}
       		]
        }, 
        {
        	path:'/region',
        	component:home,
       		children:[
       			{ path: 'regionList', component: regionList,name:'regionList'},
       			{ path: 'subregionAdd', component: subregionAdd,name:'subregionAdd'},
       			{ path: 'fixedRegion', component: fixedRegion,name:'fixedRegion'}
       		]
        },   	
	]
})

// 定义全局钩子，在路由前进行判断
router.beforeEach((to,from,next) => {
	// 判断是否需要拦截
	if (to.meta.noAuth == true) {
		// 不需要进行拦截
		next()
	}else{
		// 验证是否有登陆
		if (sessionStorage.getItem('userCode') == null) {
			// 需要先进行登陆
			alert('请先进行登陆')
			next({
				path:'/login'
			})
		}else{
			next()
		}
	}
})

export default router