<template>
    <el-dialog title="修改" :visible.sync="flag_info" @opened=openDialog
               :modal-append-to-body="false"
               width="550px"
               @close="close">
        <el-form :model="addInfo">
            <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="addInfo.type" placeholder="请选择" style="width: 150px">
                    <el-option v-for="item in category.item"
                               :key="item.value"
                               :label="item.label"
                               :value="item.category_name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题:" :label-width="formLabelWidth">
                <el-input v-model="addInfo.title" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="概况:" :label-width="formLabelWidth">
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="addInfo.content">
                </el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" @click="close">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import {reactive, ref, watch, computed} from "@vue/composition-api";

    export default {
        name: 'editDialog',
        //单向数据流 父->子 //不能反向修改
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                required: true,
            }

        },
        setup(props, {emit}) {

            //弹框
            const formLabelWidth = ref('120px');

            const addInfo = reactive({
                type: '',
                title: '',
                content: '',
            });

            const flag_info = ref(false);

            watch(() => {
                flag_info.value = props.flag;
            });

            const close = (() => {
                flag_info.value = false;
                emit('close', false);
            });

            const category = reactive({
                item: [],
            });

            const openDialog = () => {
                category.item = props.options;
            };


            return {
                addInfo,
                formLabelWidth,
                flag_info,
                close,
                openDialog,
                category
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../../style/config.scss";

</style>


