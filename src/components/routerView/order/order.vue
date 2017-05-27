<template>
    <div class="order">
        <nav>
            <top-nav></top-nav>
        </nav>
        <div class="bottom-con">
            <aside>
                <left-nav></left-nav>
            </aside>
            <section>
                <order-right></order-right>
            </section>
        </div>
    </div>
</template>

<script>
import orderRight from './order-right/order-right.vue'
import topNav from '../../topNav/topNav.vue'
import leftNav from '../../leftNav/leftNav.vue'
export default{
components:{
    orderRight,
    topNav,
    leftNav
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url(../../../assets/css/layout.css);
</style>