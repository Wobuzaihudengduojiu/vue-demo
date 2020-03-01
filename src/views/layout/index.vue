<template>
    <div id="layout">
        <LayoutNav/>
        <LayoutHeader/>
        <LayoutMain/>
    </div>
</template>

<script>
    import LayoutHeader from './components/header';
    import LayoutNav from  './components/nav';
    import LayoutMain from './components/main';

    export default {
        name:'layout',
        components:{LayoutHeader,LayoutNav,LayoutMain},
        setup(){

        }

    }

</script>

<style lang="scss" scoped>
    #layout{

        background-color: #f7f7f7;
    }



</style>
