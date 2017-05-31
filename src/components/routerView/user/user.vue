<template>
<div class="user">
<!--         <nav>
            <top-nav></top-nav>
        </nav>
        <div class="bottom-con">
            <aside>
                <left-nav></left-nav>
            </aside>
            <section> -->
                <user-right></user-right>
<!--             </section>
        </div> -->
    </div>
</template>

<script>
import userRight from './user-right/user-right.vue'
// import topNav from '../../topNav/topNav.vue'
// import leftNav from '../../leftNav/leftNav.vue'
export default{
components:{
    userRight
    // topNav,
    // leftNav
}
}
</script>

<style>
    /*@import url(../../../assets/css/layout.css);*/
</style>