<template>
    <div id="layout" :class="menuStates?'close':'open'">
        <LayoutNav/>
        <LayoutHeader/>
        <LayoutMain/>
    </div>
</template>

<script>
    import LayoutHeader from './components/header';
    import LayoutNav from './components/nav';
    import LayoutMain from './components/main';
    import {computed} from '@vue/composition-api';

    export default {
        name: 'layout',
        components: {LayoutHeader, LayoutNav, LayoutMain},
        setup(props, {root}) {

            const menuStates = computed(() => root.$store.state.logins.isCollapse);

            return {
                menuStates,
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import "../../style/config.scss";

    #layout {
        background-color: #f7f7f7;
    }


</style>
