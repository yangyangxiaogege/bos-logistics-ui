const navMenu = [
	{
		index:"1",
		name:"基础档案",
		icon:"el-icon-document",
		sub:[
			{index:"1-1",name:"档案查询",routerName:"archivesSearch",icon:"el-icon-search"},
			{index:"1-2",name:"新增档案",routerName:"archivesAdd",icon:"el-icon-plus"}
		]
	},
	{
		index:"2",
		name:"取派设置",
		icon:"el-icon-phone",
		sub:[
			{index:"2-1",name:"取派员列表",routerName:"courierList",icon:"el-icon-tickets"},
			{index:"2-2",name:"添加取派员",routerName:"courierAdd",icon:"el-icon-plus"}
		]
	},
	{
		index:"3",
		name:"区域管理",
		icon:"el-icon-phone",
		sub:[
			{index:"3-1",name:"区域列表",routerName:"regionList",icon:"el-icon-tickets"},
			{index:"3-2",name:"添加分区",routerName:"subregionAdd",icon:"el-icon-tickets"},
			{index:"3-3",name:"定区列表",routerName:"fixedRegion",icon:"el-icon-tickets"},
		]
	}
]

export default navMenu
