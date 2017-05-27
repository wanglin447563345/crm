<template>
    <div class="shop">
        <nav>
            <top-nav></top-nav>
        </nav>
        <div class="bottom-con">
            <aside>
                <left-nav></left-nav>
            </aside>
            <section>
                <shop-right></shop-right>
            </section>
        </div>
    </div>
</template>

<script>
import shopRight from './shop-right/shop-right.vue'
import topNav from '../../topNav/topNav.vue'
import leftNav from '../../leftNav/leftNav.vue'
export default{
components:{
    shopRight,
    topNav,
    leftNav
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url(../../../assets/css/layout.css);
</style>