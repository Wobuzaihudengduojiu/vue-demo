<template>
    <div class="category">
        <el-button type="danger">添加一级标题</el-button>

        <div>
            <el-row :gutter="30">
                <el-col :span="10">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>

        </div>

31
    </div>

</template>

<script>

    export default {
        name: 'newsCategory',

    }
</script>

<style lang="scss" scoped>


</style>
