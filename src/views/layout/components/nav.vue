<template>

    <div id="nav-wrap">
        <h1 class="logo">
            <img src="@/assets/logo.png">
        </h1>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="transparent" text-color="#fff"
                 active-text-color="#fff" :collapse="isCollapse" router>

            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index.toString()">
                    <template slot="title">
                        <svg-icon :icon-class="item.meta.icon" :class-name="item.meta.icon"/>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <template v-for="(subItem,index) in item.children">
                            <el-menu-item  v-if="!subItem.hidden" :key="subItem.id"
                                           :index="subItem.path">
                                {{subItem.meta.name}}
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>

    </div>

</template>

<script>

    import {reactive, ref, computed} from '@vue/composition-api';

    export default {
        name: 'navMenu',
        setup(props, {root}) {

            // const isCollapse = ref(false);
            const routers = reactive(root.$router.options.routes);

            const isCollapse = computed(() => root.$store.state.logins.isCollapse);

            return {
                isCollapse,
                routers
            };

        }

    }

</script>


<style lang="scss" scoped>
    @import "../../../style/config.scss";

    .logo {

        img {
            height: 90px;
            width: 90px;
            margin-left: 60px;
        }
    }

    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #344a5f;
        @include webkit(transition,all .3s ease 0s);

        svg {
            font-size: 20px;
            margin-right: 15px;
        }

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 250px;
            min-height: 400px;
        }
    }

    .open {
        #nav-wrap {
            width: $navMenu;
        }

        .logo img {
            margin-left: 60px;
            @include webkit(transition,all .3s ease 0s);
        }
    }

    .close {
        #nav-wrap {
            width: 64px;
        }

        .logo img {
            margin-left: 4px;
            height: 70%;
            width: 80%;
            @include webkit(transition,all .3s ease 0s);
        }
    }

</style>
