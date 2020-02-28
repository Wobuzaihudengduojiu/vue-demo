<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab"
                    :class="{'current':item.current}"
                    @click="toggleMenu(item)"
                    :key="item.id">{{item.txt}}
                </li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium"
                     class="login-form">
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-if="this.type=='register'">
                    <label>重置密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="age" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.age" maxlength="6" minlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" style="width: 100%">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" style="width: 100%">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {filter, validateEmail, validatePwd, validateVcode} from "@u/validate";

    export default {
        name: 'login',
        data() {
            //验证用户名
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (validateEmail(value)) {
                    console.log(value);
                    callback(new Error('请注意输入格式，不能包含特殊字符'));
                } else {
                    callback();
                }
            };
            //验证密码
            var validatePass2 = (rule, value, callback) => {
                this.ruleForm.password = filter(value);
                value = this.ruleForm.password;
                console.log(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePwd(value)) {
                    callback(new Error("密码至少包含数字和英文"));
                } else {
                    callback();
                }
            };

            //验证重复密码
            var validatePass3 = (rule, value, callback) => {
                this.ruleForm.passwords = filter(value);
                value = this.ruleForm.passwords;
                console.log(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error("重复密码不正确"));
                } else {
                    callback();
                }
            };

            //验证验证码
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if (validateVcode(value)) {
                    return callback(new Error("验证码格式错误"));
                } else {
                    callback();
                }
            };

            return {
                menuTab: [
                    {'txt': '登录', current: true,type:'login'},
                    {'txt': '注册', current: false,type:'register'}
                ],
                type:'login',
                ruleForm: {
                    username: '',
                    password: '',
                    passwords: '',
                    age: ''
                },
                rules: {
                    username: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    passwords: [
                        {validator: validatePass3, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
        },
        mounted() {
        },
        methods: {
            toggleMenu(data) {
                this.menuTab.forEach((item) => {
                    item.current = false;
                })
                this.type=data.type;
                return data.current = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background: #344a5f;
    }

    label {
        color: #FFF;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            border-radius: 2px;
            color: #FFF;
            cursor: pointer;
        }

        .current {
            background-color: rgba(0, 0, 0, .1);
        }

        .login-form {
            margin-top: 29px;

            label {
                display: block;
                margin-bottom: 3px;
                font-size: 14px;
                color: #FFF;
            }

            .item-form {
                margin-top: 13px;
                .el-row {
                    margin-bottom: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                .el-col {
                    border-radius: 4px;
                }

                .bg-purple-dark {
                    background: #99a9bf;
                }

                .bg-purple {
                    background: #d3dce6;
                }

                .bg-purple-light {
                    background: #e5e9f2;
                }

                .grid-content {
                    border-radius: 4px;
                    min-height: 36px;
                }

                .row-bg {
                    padding: 10px 0;
                    background-color: #f9fafc;
                }
            }

            .block {
                display: block;
                width: 100%
            }
        }

    }
</style>
