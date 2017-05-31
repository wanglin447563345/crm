<template>
<div class="index">
	<nav>
		<top-nav></top-nav>
	</nav>
	<div class="bottom-con">
		<aside>
			<left-nav></left-nav>
		</aside>
		<section>
			<transition name="bounce">
				<router-view></router-view>
			</transition>
		</section>
	</div>
</div>
</template>

<script>
import topNav from './topNav/topNav.vue'
import leftNav from './leftNav/leftNav.vue'
export default{
components:{
    topNav,
    leftNav
}
}
</script>

<style>
@import url(../assets/css/animate.css);
@import url(../assets/css/layout.css);
</style>