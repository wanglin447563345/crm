<template>
<div class="headnav">
	<el-row>
		<el-col :span="4" >
	           		<p style="color: #fff;text-align: center;font-size: 40px;margin:0;line-height: 60px;">logo</p>
	           	</el-col>
	           	<el-col :span="4" :offset="16">
	           		<el-dropdown trigger="click">
	           			<span class="el-dropdown-link">
	           				个人中心 <i class="el-icon-caret-bottom el-icon--right"></i>
	           			</span>
	           			<el-dropdown-menu slot="dropdown">
	           				<el-dropdown-item
                            command='pass'
                            ><el-button type="text" @click="dialog.show=true">修改密码</el-button></el-dropdown-item>
	           				<el-dropdown-item>
	           				 <el-button type="text" @click="logout">退出</el-button>
	           				</el-dropdown-item>
	           			</el-dropdown-menu>
	           		</el-dropdown>
	           	</el-col>
	</el-row>
	<el-dialog size="small" :title="dialog.title"
                   :visible.sync="dialog.show">
            <el-form style="margin:20px;width:80%;"
                     label-width="100px"
                     :model="dialog.user_info"
                     :rules="dialog.user_info_rules"
                     ref='user_info'>
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    <el-input v-model="dialog.user_info.email" disabled placeholder='常用邮箱'></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    <el-input v-model="dialog.user_info.username" disabled placeholder='用户名'></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="当前密码"
                              prop='old_password'>
                    <el-input
                            type='password'
                            placeholder='当前密码'
                            auto-complete='off'
                            v-model="dialog.user_info.old_password"></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="新密码"
                              prop='password'>
                    <el-input
                            type='password'
                            placeholder='新密码'
                            auto-complete='off'
                            v-model="dialog.user_info.password"></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="确认密码"
                              prop='password_confirm'>
                    <el-input
                            type='password'
                            placeholder='确认密码'
                            auto-complete='off'
                            v-model="dialog.user_info.password_confirm"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="updUserPass('user_info')">确 定</el-button>
            </span>
        </el-dialog>
</div>
	
</template>
<script>
export default{
	data() {
        return {

            dialog: {
                show: false,
                title: '修改密码',

                user_info:{
                	old_password:"",
                	password:"",
                	password_confirm:""
                },
                user_info_rules: {
                    old_password: [{
                        required: true,
                        message: '旧密码不能为空！',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '新密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else {
                                if ('' !== this.dialog.user_info.password) {
                                    this.$refs.user_info.validateField('password_confirm');
                                }
                                callback();
                            }
                        }
                    }],
                    password_confirm: [{
                        required: true,
                        message: '确认密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.dialog.user_info.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }
                    }],
                }
            }
        }
    },
    mounted() {

    },
    methods: {
        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/login');
            });
        },

        /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
        updUserPass(userinfo) {
            this.$refs[userinfo].validate((valid) => {
                if (valid) {
                    UserApi.updPass.call(this, {
                        old_password: this.dialog[userinfo].old_password,
                        password: this.dialog[userinfo].password,
                        password_confirm: this.dialog[userinfo].password_confirm
                    }, (data) => {
                        this.dialog.show_pass = false;
                        // this.$nextTick(() => {
                        this.$message.success('修改成功！');
                        // });
                    });
                }
            });
        }
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .headnav {
    background: #1F2D3D;
  }
  .el-dropdown-link{
  	min-height: 60px;
  	line-height: 60px;
  	color: #fff;
  }
</style>

