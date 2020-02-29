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
                    <label for="email">邮箱</label>
                    <el-input id="email" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label for="pwd">密码</label>
                    <el-input id="pwd" type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-if="type=='register'">
                    <label for="r_pwd">重置密码</label>
                    <el-input id="r_pwd" type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="age" class="item-form">
                    <label for="code">验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input id="code" v-model.number="ruleForm.age" maxlength="6" minlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" style="width: 100%" :disabled="codeBtn" @click="getMsgs">
                                {{codeValue}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" :disabled="loginBtn" style="width: 100%">
                        {{type==='login'?'登录':'注册'}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {filter, validateEmail, validatePwd, validateVcode} from "@u/validate";
    import {reactive, ref} from '@vue/composition-api';
    import {getMsg, register, login} from '@/api/login'

    export default {
        name: 'login',
        //放置data中的数据，生命周期，自定义函数
        setup(props, {refs, root},) {

            //验证密码
            let validatePass2 = (rule, value, callback) => {
                ruleForm.password = filter(value);
                value = ruleForm.password;
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
            let validatePass3 = (rule, value, callback) => {
                ruleForm.passwords = filter(value);
                value = ruleForm.passwords;
                console.log(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value !== ruleForm.password) {
                    callback(new Error("重复密码不正确"));
                } else {
                    callback();
                }
            };

            //验证验证码
            let checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if (validateVcode(value)) {
                    return callback(new Error("验证码格式错误"));
                } else {
                    callback();
                }
            };

            //验证用户名
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (validateEmail(value)) {
                    console.log(value);
                    callback(new Error('请注意输入格式，不能包含特殊字符'));
                } else {
                    callback();
                }
            };

            const menuTab = reactive([
                {'txt': '登录', current: true, type: 'login'},
                {'txt': '注册', current: false, type: 'register'}
            ]);
            //表单数据
            const ruleForm = reactive({
                username: '',
                password: '',
                passwords: '',
                age: ''
            });

            //表单验证
            const rules = reactive({
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
            });

            //type.value
            const type = ref('login');

            const loginBtn = ref(true);

            const codeBtn = ref(false);

            const codeValue = ref('发送验证码');

            const time = ref(null);

            const toggleMenu = (data => {
                menuTab.forEach((item) => {
                    item.current = false;
                })
                type.value = data.type;
                refs.ruleForm.resetFields();
                return data.current = true;
            });

            const submitForm = ((formName) => {

                refs[formName].validate((valid) => {
                    if (valid) {
                        if (type.value === 'login') {
                            login(ruleForm).then((resp) => {
                                console.log(resp.data);
                            }).catch((error) => {
                                console.log(error);
                            });
                        } else {
                            register(ruleForm).then((resp) => {

                                if(resp.data.status===200){
                                    root.$message({
                                        message: '注册成功',
                                        type: 'success'
                                    });

                                    toggleMenu(menuTab[0]);
                                    clearCountDown();
                                }
                            }).catch((error) => {
                                $message.error('注册失败');
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            });

            //获取验证码
            const getMsgs = (() => {

                if (ruleForm.username == '') {
                    root.$message({
                        message: '邮箱不能为空！',
                        type: 'warning'
                    });
                    return;
                }
                if (ruleForm.password == '') {
                    root.$message({
                        message: '密码不能为空！',
                        type: 'warning'
                    });
                    return;
                }

                codeBtn.value = true;
                codeValue.value = '发送中';

                setTimeout(() => {
                    getMsg({username: ruleForm.username}).then((rep) => {

                            loginBtn.value = false;
                            countDown(10);
                        }
                    ).catch((error) => {
                        console.log(error);
                    });

                }, 1000)


            });

            const clearCountDown=(()=>{
                clearInterval(time.value);
                codeValue.value='发送验证码';
                codeBtn.value=false;
                loginBtn.value=true;
            })

            const countDown = ((number) => {

                //清理定时器
                if(time.value==null){
                    clearInterval(time.value);
                }

                let timer = number;

                time.value = setInterval(() => {

                    if (timer === 0) {
                        codeBtn.value = false;
                        codeValue.value = '再次获取';
                        clearInterval(time.value);
                    } else {
                        timer--;
                        codeValue.value = `倒计时${timer}`;
                    }
                }, 1000)
            })


            return {
                menuTab,
                loginBtn,
                type,
                ruleForm,
                rules,
                toggleMenu,
                submitForm,
                getMsgs,
                codeBtn,
                codeValue
            }
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
