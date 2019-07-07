<template>
	<div class="subregionAdd">
		<toolbar></toolbar>
		<el-form ref="form" :model="subregion" label-width="80px">
		  <el-form-item label="选择区域">
		    <el-select 
		    v-model="subregion.regionId"
		    placeholder="请选择区域"
		    filterable
    		remote
    		:remote-method="remoteMethod"
    		:loading="loading"
		    >
		      <el-option v-for="item in regions" :label="item.name" :value="item.id" :key="item.name"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="地址关键字">
		    <el-input v-model="subregion.addressKey"></el-input>
		  </el-form-item>
		   <el-form-item label="起始号">
		    <el-input v-model="subregion.startNum"></el-input>
		  </el-form-item>
		   <el-form-item label="终止号">
		    <el-input v-model="subregion.endNum"></el-input>
		  </el-form-item>
		   <el-form-item label="单双号">
		    <el-input v-model="subregion.single"></el-input>
		  </el-form-item>
		  <el-form-item label="位置信息">
		    <el-input type="textarea" v-model="subregion.assistKey"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">保存</el-button>
		    <el-button @click="reset">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import toolbar from '../utils/toolbar.vue';
	import QS from 'qs';

	export default {
    data() {
      return {
      	loading:false,
       	subregion:{
       		regionId:'',
       		addressKey:'',
       		startNum:'',
       		endNum:'',
       		single:'',
       		assistKey:''
       	},
       	regions:[]
      }
    },
    created(){
    	// 获取区域列表
    	var query = '';
    	this.getRegions(query);
    },
    methods: {
    	// 获取区域数据
    	getRegions(query){
    		this.loading = true;
    		this.$http.get('sys/region/findAllByQuery?query='+query).then(result => {
    			this.loading = false;
    			if (result.data.regions != undefined) {
    				this.regions = result.data.regions;
    			}else{
    				this.$message({
    					showClose:true,
    					type:'warning',
    					message:'加载区域列表失败'
    				})
    			}
    		})
    	},
    	// 添加
      	onSubmit() {
      		if (this.checkForm(this.subregion)) {
      			this.$http.post('sys/subregion/add',QS.stringify(this.subregion)).then(result => {
      				if (result.data.state == true) {
      					this.$message({
	    					showClose:true,
	    					type:'success',
	    					message:'分区信息保存成功'
	    				})
      				}else{
      					this.$message({
	    					showClose:true,
	    					type:'fail',
	    					message:'分区信息保存失败'
	    				})
      				}
      			})
      		}
      	},
      	// 表单验证
      	checkForm(form){
      		if (form.regionId == '') {
      			this.$message({
					showClose:true,
					type:'warning',
					message:'请选择区域'
    			})
    			return false;
      		}

      		if (form.addressKey == '') {
      			this.$message({
					showClose:true,
					type:'warning',
					message:'请输入地址关键字'
    			})
    			return false;
      		}

      		if (form.startNum == '') {
      			this.$message({
					showClose:true,
					type:'warning',
					message:'请输入起始号'
    			})
    			return false;
      		}

      		if (form.endNum == '') {
      			this.$message({
					showClose:true,
					type:'warning',
					message:'请输入终止号'
    			})
    			return false;
      		}
      		return true;
      	},
	    // 远程搜索
	    remoteMethod(query){
	    	// 获取区域数据
	      	this.getRegions(query);
	    },
	    reset(){
	    	window.open('http://localhost:8080/sys/subregion/download');
	    	let subregion = {
	       		regionId:'',
	       		addressKey:'',
	       		startNum:'',
	       		endNum:'',
	       		single:'',
	       		assistKey:''
	       	};
	       	this.subregion = subregion;
	    }
    },
    components:{
    	toolbar
    }
  }
</script>

<style type="text/css" lang="less" scoped>
	.subregionAdd{
		background: white;
		.el-form{
			padding: 10px;
		}
	}
</style>