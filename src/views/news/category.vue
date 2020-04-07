<template>
    <div class="container">
        <el-button type="danger" @click="addFirst">添加一级分类</el-button>
        <hr style="margin-right: 10px;margin-left: -10px">
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="item in category.item">
                            <h4>
                                <svg-icon class-name="add" icon-class="add"></svg-icon>
                                {{item.category_name}}
                                <div class="button-wrap">
                                    <el-button type="danger" round size="mini">编辑</el-button>
                                    <el-button type="success" round size="mini">添加子级</el-button>
                                    <el-button plain round size="mini">删除</el-button>
                                </div>
                            </h4>
                            <ul v-if="item.children">
                                <li v-for="childItem in item.children">
                                    {{childItem.category_name}}
                                    <div class="button-wrap">
                                        <el-button type="danger" round size="mini">编辑</el-button>
                                        <el-button plain round size="mini">删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form :label-position="labelPosition"
                             label-width="100px"
                             :model="formLabelAlign"
                             ref="formLabelAlign">
                        <el-form-item label="一级分类名称">
                            <el-input v-model="formLabelAlign.firstMenu" style="width: 200px" :disabled="button_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称" v-if="category_first">
                            <el-input v-model="formLabelAlign.secondMenu" style="width: 200px" :disabled="button_disabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submitForm" :loading="submit_loading" :disabled="button_disabled">确定</el-button>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>

        </div>

    </div>

</template>

<script>

    import {ref, reactive,onMounted} from '@vue/composition-api';
    import {addFirstCategory,getAllCategory} from "@/api/news";

    export default {
        name: 'newsCategory',
        setup(prop, {root,refs}) {

            const formLabelAlign = reactive({
                firstMenu: '',
                secondMenu: ''
            });

            const labelPosition = ref('left');

            //不要直接放数组对象
            let category=reactive({
                item:[]
            });

            const button_disabled=ref(true);

            const submitForm = () => {
                submit_loading.value=true;
                if(!formLabelAlign.firstMenu){
                    root.$message({
                        message: '一级分类不能为空',
                        type: 'error'
                    });
                    submit_loading.value=false;
                    return false;
                };

                addFirstCategory({category: formLabelAlign.firstMenu}).then(
                    (resp) => {
                        let data = resp.data;

                        if (data.status === 200) {
                            root.$message({
                                message: data.data.message,
                                type: 'success'
                            });

                        }

                        refs.formLabelAlign.resetFields();
                        submit_loading.value=false;

                        console.log(data.data.category+'111')
                        category.item.push(data.data.category);
                    }
                ).catch(
                    (error) => {
                        submit_loading.value=false;
                    }
                );

            };

            const category_first = ref(true);
            const addFirst = () => {
                category_first.value = false;
                button_disabled.value=false;
            };

            const submit_loading=ref(false);

            const getCategory=()=>{
                getAllCategory().then(
                    (resp)=>{
                        let data = resp.data.data;
                        console.log(data.category)
                        category.item=data.category;
                    }
                ).catch(
                    (error)=>{

                    }
                );
            };

            onMounted(()=>{
                getCategory();
            });

            return {
                labelPosition,
                formLabelAlign,
                submitForm,
                addFirst,
                category_first,
                submit_loading,
                category,
                button_disabled
            }
        }

    }
</script>

<style lang="scss" scoped>

    @import "../../style/config";

    .menu-title {
        line-height: 44px;
        background-color: #ededed;
        padding-left: 22px;
        margin-right: 30px;
    }

    .category-wrap {
        div:first-child {
            &:before {
                top: 20px;
            }
        }

        div:last-child {
            &:before {
                bottom: 21px;
            }
        }


    }

    .category {
        position: relative;
        line-height: 44px;
        cursor: pointer;

        &:before {
            content: '';
            position: absolute;
            width: 32px;
            border-left: 1px dotted #344a5f;
            top: -22px;
            bottom: 0px;
            left: 40px;
        }

        h4 {
            padding-left: 50px;
            position: relative;
        }

        svg {
            position: absolute;
            top: 15px;
            left: 32px
        }

        li {
            //外边距
            padding-left: 40px;
            position: relative;
            list-style-type: none;

            &:before {
                content: '';
                position: absolute;
                width: 32px;
                border-bottom: 1px dotted #344a5f;
                top: 22px;
                left: 0px
            }
        }

        li, h4 {
            &:hover {
                background-color: #ededed;

                .button-wrap {
                    display: block;
                }

                @include webkit(transition, all .3s ease 0s);
            }
        }
    }

    .button-wrap {
        display: none;
        z-index: 2;
        position: absolute;
        top: 0px;
        right: 10px;
    }

</style>
