<template>
    <div id="header-warp">
        <div class="pull-left header-icon" @click="navMenuStatus">
            <svg-icon icon-class="list" class-name="list"></svg-icon>
        </div>
        <div class="pull-right">

            <div class="pull-left">
                <img :src="imgUrls">
            </div>
            <div class="user-info pull-left">geyx</div>
            <div class="pull-right header-icon">
                <svg-icon icon-class="close" class-name="close"></svg-icon>
            </div>
        </div>

    </div>
</template>

<script>

    import {ref} from '@vue/composition-api';
    import imageUrl from '@/assets/user.jpg'

    export default {
        name: 'Header',
        setup(props,{root}) {

            const imgUrls = ref(imageUrl);

            const navMenuStatus=(()=>{
                root.$store.commit('logins/SET_Collapse');
            })

            return {
                imgUrls,
                navMenuStatus
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../style/config.scss";

    #header-warp {
        position: fixed;
        top: 0;
        right: 0;
        height: 75px;
        background-color: #fff;
        @include webkit(transition,all .3s ease 0s);
        line-height: 75px;


    }

    .pull-left {
        float: left;
    }

    .pull-right {
        float: right;
    }

    .user-info {
        height: 100%;
        border-right: 1px solid #ededed;
        font-size: 18px;
        padding-right: 40px;

    }
    .open{

    }

    img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
        border-radius:100%;
        margin-bottom: -10px;

    }

    .header-icon {
        padding: 0 32px;

        svg {
            font-size: 25px;
            margin-bottom: -8px;
            cursor: pointer;
        }
    }

    .open{
        #header-warp {
            left: 250px;
        }
    }
    .close{
        #header-warp{
            left:64px;
        }
    }

</style>
