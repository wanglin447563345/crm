<template>
<ul class="leftNav">
	<li>
		<router-link to="/home"> <i class="fa fa-home fa-lg"></i>
			首页
		</router-link>
	</li>
	<li>
		<router-link to="/order"> <i class="fa fa-cart-plus fa-lg"></i>
			订单管理
		</router-link>
	</li>
	<li>
		<router-link to="/shop">
			<i class="fa fa-building" fa-lg></i>
			门店管理
		</router-link>
	</li>
	<li>
		<router-link to="/user">
			<i class="fa fa-user fa-lg"></i>
			用户管理
		</router-link>
	</li>
</ul>

</template>
<script>
  export default {
    methods: {
    }
  }
</script>
<style type="text/css">
.leftNav{
	/*background: #fff*/
	padding:0
}
.leftNav li a{
	padding:15px;
}
.fa {
    margin-right: 8px;
    vertical-align: baseline;
    /*color: #fff;*/
}
.nav-active{
	color: #FFF;
	background: #20A0FF;
}
</style>
