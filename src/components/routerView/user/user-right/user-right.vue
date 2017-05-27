<template>
    <div class="list">
        <el-col :span="24" class='actions-top'>
            <el-button type='danger' icon='delete'
                       :disabled='batch_flag'
                       @click='onDeleteUser(true)'>删除选中
            </el-button>

            <el-form :inline="true" :model='search_user' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="姓名"
                              v-model='search_user.name'
                              clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="邮箱" v-model='search_user.email'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
					<el-button type="success">新增用户</el-button>
					</el-form-item>
            </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="user_list"
                  @selection-change='onSelectionChange'>
<!--             <el-table-column
                    label='住址'
                    type="expand">
                <template scope="props">
                    <p>住址: {{ props.row.address }}</p>
                </template>
            </el-table-column> -->

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="姓名"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="user_email"
                    label="邮箱"
                    align="center"
                    min-width="200">
            </el-table-column>
            <el-table-column
                    prop="user_sex"
                    label="性别"
                    align="center"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="user_ctime"
                    label="创建时间"
                    align="center"
                    min-width="160">
            </el-table-column>
            <el-table-column
                    prop="user_status"
                    label="状态"
                    align="center"
                    min-width="100">
            </el-table-column>

            <el-table-column
                    label="操作"
                    min-width="260">
                <template scope='scope'>
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectUser(scope.row)'></el-button>
                    <el-button
                            type="success"
                            icon='edit'
                            size="mini"
                            @click='onEditUser(scope.row)'></el-button>

                    <el-button
                            type="primary"
                            size="mini"
                            @click='onSetAccess(scope.row,scope.$index,user_list)'>设置权限
                    </el-button>


                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDeleteUser(scope.row,scope.$index,user_list)'></el-button>


                    <!-- 不要试图强制打开这个操作，因为服务端做了验证，打开也没用n(*≧▽≦*)n -->
                    <el-button
                            size="mini"
                            :type="scope.row.status==1 ? 'danger' : 'info'"
                            @click='onSetStatusUser(scope.row,scope.$index,user_list)'>{{scope.row.status==1 ? '禁用' :
                        '启用'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="用户信息" v-model="dialog_user.show" size="tiny">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog_user.user_info">
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    {{dialog_user.user_info.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    {{dialog_user.user_info.username}}
                </el-form-item>
                <el-form-item label="性别">
                    {{dialog_user.user_info.sex==1 ? '男' : (dialog_user.user_info.sex==2 ? '女' : '保密')}}
                </el-form-item>
                <el-form-item label="生日">
                    {{dialog_user.user_info.birthday}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='地址'>
                    {{dialog_user.user_info.address}}
                </el-form-item>
                <el-form-item label="状态">
                    {{dialog_user.user_info.status==1 ? '启用' : '禁用'}}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{dialog_user.user_info.create_time}}
                </el-form-item>
                <el-form-item label="最后更新时间">
                    {{dialog_user.user_info.update_time}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_user.show = false">取 消</el-button>
                <el-button type="primary" @click="dialog_user.show = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from "axios"
	export default{
    data() {
        return {
            user_list: [], //用户列表数组

            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //搜索表单信息
            search_user: {
                user_name: '',
                user_email: '',
            },

            //详情弹框信息
            dialog_user: {
                show: false,
                user_info: {}
            }
            
        }
    },
    methods: {
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

        
initRouters(){
            var routes = this.$router.options.routes;
            for (var i = 0; i < routes.length; i++) {
                if (routes[i].hidden !== true && routes[i].children && routes[i].children.length) {
                    var tempObj = {},
                        module = routes[i],
                        menus = module.children;
                    tempObj.name = module.name;
                    tempObj.path = module.path;
                    tempObj.access = module.path;
                    tempObj.children = [];
                    for (var j = 0; j < menus.length; j++) {
                        if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
                            var tempChildObj = {},
                                menu = menus[j],
                                pages = menu.children;
                            tempChildObj.name = menu.name;
                            tempChildObj.path = '/' + menu.path;
                            tempChildObj.access = tempObj.path + '/' + menu.path;
                            tempChildObj.children = [];
                            for (var k = 0; k < pages.length; k++) {
                                if (pages[k].hidden !== true) {
                                    var tempPageObj = {},
                                        page = pages[k];
                                    tempPageObj.name = page.name;
                                    tempPageObj.path = '/' + page.path;
                                    tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
                                    tempChildObj.children.push(tempPageObj);
                                }
                            }
                            tempObj.children.push(tempChildObj);
                        }
                    }
                    this.accesss.push(tempObj);
                }
            }
        },
        /**
         * 删除用户事件
         * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前用户列表索引
         * @param  {array} list  当前用户列表数组
         */
        onDeleteUser(user, index, list) {
            // console.dir(user);

            if (user === true) {
                var id = this.batch_id;
            } else {
                var id = user.id;
            }
			this.$confirm('你确定删除用户 '+user.username+' 么?', '删除用户', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$$api_user_deleteUser({
					id: id
				}, (data) => {
					if (user === true) {
						this.user_list = this.user_list.filter(function(item, idx) {
							return id.indexOf(item.id) === -1;
						});
					} else {
						list.splice(index, 1);
					}
					this.getList();
				});
			});

        },
        /**
         * 表格列表触发CheckBox的事件
         * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
         */
        onSelectionChange(val) {
            // console.log(val);
            if (val.length) {
                this.batch_flag = false;
                var ids = [];
                for (var i = 0; i < val.length; i++) {
                    ids.push(val[i].id);
                }
                this.batch_id = ids.join(',');
            } else {
                this.batch_flag = true;
                this.batch_id = '';
            }
        },

        /**
         * 修改用户
         * @param  {object} user 当前用户信息对象
         */
        onEditUser(user) {
            if (user && user.id) {
                this.$router.push('/home/user/edit?id=' + user.id);
            } else {
                this.$message({
                    showClose: true,
                    message: 'ID跑哪去了？',
                    type: 'error'
                });
            }
        },


        /**
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        onSelectUser(users) {
            this.dialog_user.show = true;
            this.dialog_user.user_info = users;
        },


        /**
         * 获取用户信息列表方法
         */
        GetUserList(){
        axios.get('json/userlist.json').then((res)=>{
            this.user_list=res.data.userList;
            console.log(this.user_list)
        })
        }
    },

    mounted() {
        this.GetUserList();

        this.initRouters();

        //test dialog

        /* setTimeout(() => {
             this.onSelectUser(this.user_list[0]);
         }, 600);*/
    },
    watch: {
        '$route' (to, from) {
            this.getList();
        }
    }
}
</script>
<style scoped>
    .demo-form-inline {
        display: inline-block;
        float: right;
    }

    .btm-action {
        margin-top: 20px;
        text-align: center;
    }

    .actions-top {
        height: 46px;
    }

    .pagination {
        display: inline-block;
    }
</style>
