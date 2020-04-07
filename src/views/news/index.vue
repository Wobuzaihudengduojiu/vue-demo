<template>
    <div class="wrap">
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label>类型:</label>
                    <div class="wrap-content">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option style="width: 100%"
                                       v-for="item in options.category"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.category_name">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label>日期:&nbsp;&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                        <el-date-picker style="width: 100%"
                                        v-model="value1"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-word">
                    <label>关键字:&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                        <el-select v-model="search_key" style="width: 100%">
                            <el-option
                                    v-for="item in keyWords"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入内容" style="width: 100%"
                          v-model="input"
                          clearable>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="2">
                <el-button type="danger" style="width: 100%" @click="dialogInfo = true">新增</el-button>
            </el-col>
        </el-row>

        <div class="table-content">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading"
                      @selection-change="handleSelectionChange">>
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" width="430" align="center"></el-table-column>
                <el-table-column prop="category" label="类型" align="center" width="130"></el-table-column>
                <el-table-column prop="date" label="日期" align="center" width="237"
                                 :formatter="toData"></el-table-column>
                <el-table-column prop="user" label="管理员" align="center" width="115"></el-table-column>
                <el-table-column prop="opera" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
<!--                        <router-link :to="{name:'InfoCategory',query:{id:scope.row}}">-->
                            <el-button style="margin: 0 10px"
                                size="mini"
                                type="primary"
                                @click="handleEditInfo(scope.row)">编辑详情
                            </el-button>
<!--                        </router-link>-->
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-content">
            <el-row>
                <el-col :span="4">
                    <el-button type="danger" @click="deleteAll">批量删除</el-button>
                </el-col>
                <el-col :span="11" :offset="7">
                    <el-pagination
                            background
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="100"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            layout="total,sizes,prev, pager, next" :total="1000">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>

        <div class="notice-wrap">
            <newsDialog :flag="dialogInfo" :options="options.category" @close="close"/>
            <editDialog :flag="edit_dialogInfo" :options="options.category" @close="close"/>
        </div>
    </div>
</template>

<script>

    import {ref, reactive, watch, onMounted} from '@vue/composition-api';
    import newsDialog from './dialog/news';
    import editDialog from "./dialog/edit";
    import {global} from '@u/global';
    // import {common} from '@/api/common';

    export default {
        name: 'newsIndex',
        components: {
            newsDialog,
            editDialog
        },
        setup(props, {root}) {

            const pickerOptions = reactive({
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            });

            //开始日期和结束日期
            const value1 = ref('');
            const value2 = ref('');

            const input = ref('');

            const search_key = ref('ID')
            const keyWords = reactive([
                {
                    value: 'id',
                    label: 'ID',
                },
                {
                    value: 'title',
                    label: '标题',
                }
            ]);

            const value = ref('');

            const options = reactive({
                category: []
            });

            const loading = ref(false);


            const tableData = reactive([{
                id:1,
                title: '上海市普陀区金沙江路 1518 弄',
                date: '2016-05-02',
                category: '王小虎',
                user: '管理员',
            }, {
                id:2,
                title: '上海市普陀区金沙江路 1518 弄',
                date: '2016-05-04',
                category: '王小虎',
                user: '管理员',
            }, {
                id:3,
                title: '上海市普陀区金沙江路 1518 弄',
                date: '2016-05-01',
                category: '王小虎',
                user: '管理员',
            }]);

            const handleEdit = ((index, row) => {
                edit_dialogInfo.value = true;
                console.log(index, row);
                edit_dialogInfo.value = false;
            });

            const {confirm} = global();

            const handleDelete = ((index, row) => {
                confirm({
                    text: '确认是否删除该条记录？',
                    fn: confirmDelete
                });
                console.log(index, row);
            });

            const deleteAll = (() => {
                confirm({
                    text: '确认删除已选中记录？',
                    fn: confirmDelete
                })
            });

            const confirmDelete = ((val) => {

            });


            const handleSizeChange = ((val) => {
                console.log(`每页 ${val} 条`);
            });
            const handleCurrentChange = ((val) => {
                console.log(`当前页: ${val}`);
            });


            //对话框
            const dialogInfo = ref(false);

            const edit_dialogInfo = ref(false);

            const close = (() => {
                dialogInfo.value = false;
            });


            // const {getCategoryInfo, categorys} = common();

            onMounted(() => {
                root.$store.dispatch('news/getCategoryInfo').then((resp) => {
                    options.category = resp.data.data.category;
                }).catch((error) => {

                });
            });

            const toData = (row, column, rowIndex, columnIndex) => {
                // console.log(row)
            };

            const handleSelectionChange = (val) => {
                multipleSelection.data = val;
                console.log(val);
            };

            const multipleSelection = reactive({
                data: []
            });

            const handleEditInfo = (data) => {

                //先存数据在跳转页面

                console.log(data.title)

                root.$store.commit('categoryInfo/UPDATE_STATE_VALUE',{
                    id:{
                        value: data.id,
                        session:true,
                        sessionKey:'infoId'
                    },
                    title:{
                        value:data.title,
                        session:true,
                        sessionKey:'infoTitle'
                    }
                });

                root.$router.push({
                    path:"/infoCategory",
                    params:{
                        infoId:data.id,
                        infoTitle:data.title,
                    }
                })

            };


            return {
                value2,
                value1,
                pickerOptions,
                search_key,
                options,
                keyWords,
                input,
                value,
                tableData,
                handleEdit,
                handleDelete,
                handleSizeChange,
                handleCurrentChange,
                dialogInfo,
                close,
                deleteAll,
                loading,
                toData,
                edit_dialogInfo,
                handleSelectionChange,
                handleEditInfo,
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../style/config";


    .table-content {
        padding-top: 15px;
    }

    .page-content {
        padding-top: 15px;
    }


    .label-wrap {

        &.category {
            @include labelDom(left, 60, 40);
        }


        &.date {
            @include labelDom(left, 50, 40);
        }


        &.key-word {
            @include labelDom(left, 60, 40);
        }
    }


</style>
