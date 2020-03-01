<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>

<script>

    export default {


    }

</script>

<style lang="scss" scoped>

    #main-wrap{
        position: fixed;
        left: 270px;
        top:95px;
        right: 0;
        height: 100%;
        border: 30px #f7f7f7;
        border-bottom: none;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0, .1);
    }


</style>
