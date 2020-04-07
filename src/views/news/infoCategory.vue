<template>
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">

        <el-form-item label="信息分类">
            <el-select v-model="form.categoryId" placeholder="请选择类别">
                <template v-for="item in data.category">
                    <el-option  :key="item.value"
                                :label="item.category_name"
                                :value="item.id"></el-option>
                </template>
            </el-select>
        </el-form-item>

        <el-form-item label="新闻标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

<!--        <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--            <el-button>取消</el-button>-->
<!--        </el-form-item>-->
    </el-form>
</template>

<script>

    import {ref, reactive, onMounted} from '@vue/composition-api';

    export default {
        name: 'infoCategory',
        setup(props, {root, refs}) {

            const data = reactive({
                category:[],
            });

            const form = reactive({
                title:'',
                categoryId:''
            });

            let id = root.$store.getters.title || sessionStorage.getItem('infoTitle');
            console.log(id)

            onMounted(() => {
                root.$store.dispatch('news/getCategoryInfo').then((resp) => {
                    data.category = resp.data.data.category;
                    form.categoryId=1;
                }).catch((error) => {

                });
            });


            return {
                data,form
            }
        }

    }
</script>

<style lang="scss" scoped>


</style>
