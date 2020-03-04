import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@v/layout';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect:"login",
        hidden:true,
        meta:{
            name:'主页',
        }
    },
    {
        path: "/login",
        name:"Login",
        hidden:true,
        component: ()=>import("@v/login/index.vue"),
        meta:{
            name:'首页',
        }
    },
    {
        path:'/index',
        name:'Index',
        redirect:'index/1',
        meta:{
            name:'控制台',
            icon:'order',
        },
        component:Layout,
        children:[
            {
                path:'/index/1',
                name:'Index',
                meta:{
                    name:'首页',
                },
                component:()=>import("@v/index/index.vue"),
            }
        ]
    },
    {
        path:'/news',
        name:'News',
        meta:{
            name:'信息管理',
            icon:'credits',
        },
        component:Layout,
        children:[
            {
                path:'/newsIndex',
                name:'NewsIndex',
                meta:{
                    name:'信息列表',
                },
                component:()=>import("@v/news/index.vue"),
            },
            {
                path:'/newsCategory',
                name:'NewsCategory',
                meta:{
                    name:'信息分类',
                },
                component:()=>import("@v/news/category.vue"),
            }
        ]
    },
    {
        path:'/user',
        name:'User',
        meta:{
            name:'用户管理',
            icon:'filter',
        },
        component:Layout,
        children:[
            {
                path:'/userIndex',
                name:'UserIndex',
                meta:{
                    name:'用户列表',
                },
                component:()=>import("@v/user/index.vue"),
            },

        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
