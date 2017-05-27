<template>
    <div class="login" :style="winSize">
        <el-row>

            <el-col :span='24'>
                <div class="content">
                <h1 style="color: #D3DCE6;text-align: center;padding: 7% 0 3%;">CRM管理系统</h1>
                    <el-form label-position="left" label-width="0px" class="demo-ruleForm card-box loginform"
                             v-loading="login_actions.disabled"
                             :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'"
                             :style="formOffset"
                             :model='data'
                             :rules="rule_data"
                             ref='data'>
                        <h3 class="title">
                            <span
                                    :class="[{active:register===false}]"
                                    @click="toggleStatus(false)">系统登录</span>
                            <span
                                    :class="[{active:register===true}]"
                                    @click="toggleStatus(true)">注册账号</span>
                        </h3>
                        <el-form-item
                                prop='username'>
                            <el-input type="text" auto-complete="off" placeholder="账号"
                                      v-model='data.username'></el-input>
                        </el-form-item>

                        <el-form-item
                                prop='password'>
                            <el-input type="password" auto-complete="off" placeholder="密码"
                                      v-model='data.password'
                                      @keyup.native.enter="onLogin('data',true)"></el-input>
                        </el-form-item>

                        <el-form-item
                                v-if="register===true"
                                prop='repassword'>
                            <el-input type="password" auto-complete="off" placeholder="确认密码"
                                      v-model='data.repassword'
                                      @keyup.native.enter="onRegister('data')"></el-input>
                        </el-form-item>

                        <el-checkbox style="margin:0px 0px 35px 0px;"
                                     v-if="register===false"
                                     >记住密码
                        </el-checkbox>
                        <el-form-item style="width:100%;">
                            <el-button type="primary"
                                       v-if="register===false"
                                       @click='onLogin("data")'>登录
                            </el-button>
                            <el-button type="primary"
                                       v-if="register===true"
                                       @click='onRegister("data")'>注册
                            </el-button>
                            <el-button @click='resetForm("data")'>重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div></template>

<script>

  export default {
data() {
        return {
            winSize: {
                width: '',
                height: ''
            },

            formOffset: {
                position: 'absolute',
                left: '',
                top: ''
            },


            register:false,

            login_actions: {
                disabled: false
            },

            data: {
                username: '',
                password: '',
                // token: ''
            },

            rule_data: {
                username: [{
          validator:(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请输入用户名'));
            } else {
              if(/^[a-zA-Z0-9_-]{1,16}$/.test(value)){
                callback();
              }else{
                callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'));
              }
            }
          },
                    trigger: 'blur'
                }],
                password: [{
          validator:(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
                if(!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))){
                callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'));
              }else{
                    if(this.register===true){
                  if (this.data.repassword !== ''){
                    this.$refs.data.validateField('repassword');
                  }
                                }
                callback();
                            }

            }
                    },
                    trigger: 'blur'
                }],
                repassword:[{
          validator:(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.data.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        setSize() {
            this.winSize.width = $(window).width() + "px";
            this.winSize.height = $(window).height() + "px";

            this.formOffset.left = (parseInt(this.winSize.width) / 2 - 210) + 'px';
            // this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
        },

        onLogin(ref,type) {
            if(type && this.register===true){
                this.$message.error('请输入确认密码');
                return;
            }
            this.$refs[ref].validate((valid) => {
                if (valid) {
                  this.$router.push('/home')
}
            });
        },

        onRegister(ref){
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.login_actions.disabled = true;
          this.$$api_user_register(this[ref], data => {
            this.login_actions.disabled = false;
              this.$message.success('注册成功，请登录。');
              this.toggleStatus(false);
                    }, {
            errFn: () => {
              this.login_actions.disabled = false;
            },
            tokenFlag: true
          });
                }
            });
        },

        resetForm(ref) {
            this.$refs[ref].resetFields();
        },

        toggleStatus(type){
            this.register=type;
            if(this.register===true){
                this.$set(this.data,'repassword','');
            }else{
        this.$delete(this.data,'repassword');
            }
        }
    },
    created() {
        this.setSize();
        $(window).resize(() => {
            this.setSize();
        });
    },
    mounted() {
 
    }

  }
</script>

<style>
.login {
    background : #1F2D3D;
  }
.card-box {
        border-radius: 5px;
        margin-bottom : 20px;
        background-color: #F9FAFC;
        border:2px solid #8492A6;
    }
.title {
        margin: 0px auto 40px;
        text-align: center;
        color: #505458;
        font-weight: normal;
        font-size: 16px;
      }
.title span {
            cursor : pointer;
          }
.title span.active {
                font-weight : bold;
                font-size: 18px;
            }
.loginform {
        width: 350px;
        padding: 35px 35px 15px 35px;
    }
</style>