<template>
	<div class="home">
		<h1 class="th1">数据统计分析</h1>
		<el-row>
			<el-col :span=12>
				<div class="table_bg">
					<pie></pie>
				</div>
			</el-col>
			<el-col :span=12>
				<div class="table_bg">
					<category></category>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import pie from './pie/pie.vue'
import category from './category/category.vue';
export default{
components:{
	pie,
	category
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.th1{
	color: #324057;
	margin:20px 0 80px;
	text-align: center;
	font-size: 32px;
}
.table_bg{
	margin:0 15px;
	padding:50px 0;
	border:1px solid #C0CCDA;
	border-radius: 5px;
	background: #F9FAFC;
	box-shadow: 0px 3px 3px #F9FAFC;
}
</style>