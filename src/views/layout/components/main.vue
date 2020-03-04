<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view/>
            </div>
        </div>

    </div>
</template>

<script>

    export default {}

</script>

<style lang="scss" scoped>
    @import "../../../style/config.scss";

    #main-wrap {

        margin-right: 20px;
        position: fixed;
        top: 95px;
        right: 0;
        height: 100%;
        @include webkit(transition,all .3s ease 0s);
        border: 30px #f7f7f7;
        border-bottom: none;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    }

    .content {
        width: 100%;
        height: 100%;
        padding-top: 30px;
        padding-left: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .open {
        #main-wrap{
            left: 270px;
        }
    }
    .close{
        #main-wrap{
            left: 82px;
        }
    }


</style>
