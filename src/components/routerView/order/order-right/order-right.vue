<template>
	<div class="order-right">
		<el-row>
			<el-col :span="4">
				<el-button type='danger' icon='delete'
                       :disabled='batch_flag'>删除选中</el-button>
			</el-col>
			<el-col :span="20">
				<el-form :inline="true" :model='search_data' class="demo-form-inline">
					<el-form-item>
						<el-input placeholder="姓名"
                              v-model='search_data.order_client'
                              clear></el-input>
					</el-form-item>
					<el-form-item>
						<el-input placeholder="订单号"
                                  v-model='search_data.order_num'
                                  clear></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click='onSearch'>查询</el-button>
					</el-form-item>
					<el-form-item>
					<el-button type="success" @click=onEditOrder>新增订单</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table border style="width: 100%" align='center'
            :data="order_list"
            @selection-change='onSelectionChange'>
					<el-table-column
                    type="selection"
                    width="50">
                    </el-table-column>
					<el-table-column
                   label='id'
                   type="index"
                   width="80"
                   align='center'>
                  </el-table-column>
				<el-table-column
                :prop="fields.client_name.info.prop"
                :label="fields.client_name.info.label"
                :align="fields.client_name.style.align"
                :min-width="fields.client_name.style.width"></el-table-column>
				<!-- <el-table-column
                :prop="fields.client_sex.info.prop"
                :label="fields.client_sex.info.label"
                :align="fields.client_sex.style.align"
                :width="fields.client_sex.style.width"
                :filters="fields.client_sex.filter.list"
                :filter-multiple="fields.client_sex.filter.multiple"></el-table-column> -->
					<el-table-column
                :prop="fields.order_num.info.prop"
                :label="fields.order_num.info.label"
                :align="fields.order_num.style.align"
                :min-width="fields.order_num.style.width"></el-table-column>
                <el-table-column
                :prop="fields.order_shop.info.prop"
                :label="fields.order_shop.info.label"
                :align="fields.order_shop.style.align"
                :min-width="fields.order_shop.style.width"
                :filters="fields.order_shop.filter.list"
                :filter-multiple="fields.order_shop.filter.multiple"></el-table-column>
<!-- 					<el-table-column
                :prop="fields.order_type.info.prop"
                :label="fields.order_type.info.label"
                :align="fields.order_type.style.align"
                :width="fields.order_type.style.width"
                :filters="fields.order_type.filter.list"
                :filter-multiple="fields.order_type.filter.multiple"
                ></el-table-column> -->
					<el-table-column
                :prop="fields.client_tel1.info.prop"
                :label="fields.client_tel1.info.label"
                :align="fields.client_tel1.style.align"
                :min-width="fields.client_tel1.style.width"></el-table-column>
					<el-table-column
                :prop="fields.order_status.info.prop"
                :label="fields.order_status.info.label"
                :align="fields.order_status.style.align"
                :min-width="fields.order_status.style.width"
                :filters="fields.order_status.filter.list"
                :filter-multiple="fields.order_status.filter.multiple"></el-table-column>
					<el-table-column
                :prop="fields.order_ctime.info.prop"
                :label="fields.order_ctime.info.label"
                :align="fields.order_ctime.style.align"
                :min-width="fields.order_ctime.style.width"
                ></el-table-column>
					<el-table-column
                    label="操作"
                    align="center"
                    width="160"
                    :context="_self">
						<template scope='scope'>
							<el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='OrderDeails(scope.row)'></el-button>
							<el-button
                            type="primary"
                            icon='edit'
                            size="mini"
                            @click=onEditOrder(scope.row)></el-button>
                            <el-button type="danger"
                             icon='delete'
                             size="mini"
                             @click="DeleteOrder"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<!-- 订单详情弹窗 -->
<el-dialog title="订单详情" v-model="dialog.show" size="small">
            <el-form style="margin:20px" :inline="true"
                     label-width="120px"
                     :model="dialog.order_info">
                <el-form-item class='edit-form'
                              label="订单号：">
                    {{dialog.order_info.order_num}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="客户姓名：">
                    {{dialog.order_info.client_name}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="联系方式：">
                    {{dialog.order_info.client_tel1}}
                </el-form-item>
                
                <el-form-item label="性别：">
                    {{dialog.order_info.client_sex==1 ? '男' : (dialog.order_info.client_sex==2 ? '女' : '保密')}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='商品类型：'>
                    {{dialog.order_info.good_type}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='商品名字：'>
                    {{dialog.order_info.good_name}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='维修前图片：'>
                    {{dialog.order_info.good_img1}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='维修后图片：'>
                    {{dialog.order_info.good_img2}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='问题描述：'>
                    {{dialog.order_info.good_question}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='地址：'>
                    {{dialog.order_info.client_address}}
                </el-form-item>
                <el-form-item label="快递单号："> 
                {{dialog.order_info.express_num}}
                </el-form-item>
                <el-form-item label="创建时间：">
                    {{dialog.order_info.order_ctime}}
                </el-form-item>
                <el-form-item label="最后更新时间：">
                    {{dialog.order_info.order_utime}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click=PrintOrder>打印</el-button>
            </span>
        </el-dialog>

        <el-dialog title="我的订单" v-model="dialogEdit.show" size="small">
        <create-order></create-order>
        </el-dialog>

        <!-- 分页 -->
		<el-col :span="24" style="text-align: center;margin: 40px 0 80px;">
            <el-pagination
                v-if='paginations.total>0'
                class='pagination'
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page='paginations.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
        </el-col>
	</div>
</template>

<script>
import axios from 'axios'
import createOrder from '../../createPages/createOrder/createOrder.vue'
 export default {
 	data() {
        return {
            order_list: [],
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            //搜索表单信息
            search_data: {
                client_name: '',
                order_num: '',    
            },
            //详情弹框信息
            dialog: {
                show: false,
                order_info: {}
            },
            dialogEdit: {
                show: false,
                order_info: {}
            },

//需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },

            // 订单状态
            format_status_list: {
                1: '待维修',
                2: '已维修',
                3: '已发货',
                4: '已成交',
                5: '退单',
                6: '其他'
            },

            fields: {
                // order_type: {
                //     info: {
                //         prop: 'order_type',
                //         label: '类型',
                //     },
                //     filter: {
                //         list: [{
                //             text: '珠宝',
                //             value: 1
                //         }, {
                //             text: '皮具',
                //             value: 2
                //         }, {
                //             text: '包包',
                //             value: 3
                //         }, {
                //             text: '定制',
                //             value: 4
                //         }, {
                //             text: '其他',
                //             value: 5
                //         }],
                //         multiple: false
                //     },
                //     style: {
                //         width: '100',
                //         align: 'center'
                //     }
                // },
                client_sex: {
                    info: {
                        prop: 'client_sex',
                        label: '性别',
                    },
                    filter: {
                        list: [{
                            text: '男',
                            value: 1
                        }, {
                            text: '女',
                            value: 2
                        }, {
                            text: '保密',
                            value: 3
                        }],
                        multiple: false
                    },
                    style: {
                        width: '100',
                        align: 'center'
                    }
                },
                order_num: {
                    info: {
                        prop: 'order_num',
                        label: '订单号',
                    },
                    filter: {

                    },
                    style: {
                        width: '110',
                        align: 'center'
                    }
                },
                order_shop: {
                    info:{
                        prop: 'order_shop',
                        label: '所属门店'
                    },
                    filter:{
                        list:[{
                            value:1,
                            text:'北京'
                        }, {
                            value:2,
                            text:"杭州"
                        }, {
                            value:3,
                            text:"上海"
                        }],
                        multiple: false
                    },
                    style:{
                        width:'110',
                        align:'center'
                    }

                },
                client_name: {
                    info: {
                        prop: 'client_name',
                        label: '客户姓名',
                    },
                    filter: {

                    },
                    style: {
                        width: '95',
                        align: 'center'
                    }
                },
                client_tel1: {
                    info: {
                        prop: 'client_tel1',
                        label: '联系方式',
                    },
                    filter: {

                    },
                    style: {
                        width:'120',
                        align: 'center'
                    }
                },
                order_status: {
                    info: {
                        prop: 'order_status',
                        label: '状态',
                    },
                    filter: {
                        list: [{
                            text: '待维修',
                            value: 1
                        }, {
                            text: '已维修',
                            value: 2
                        }, {
                            text: '已发货货',
                            value: 3
                        }, {
                            text: '已成交',
                            value: 4
                        }, {
                            text: '退单',
                            value: 5
                        }, {
                            text: '其他',
                            value: 6
                        }],
                        multiple: false
                    },
                    style: {
                        width: '110',
                        align: 'center'
                    }
                },
                order_ctime: {
                    info: {
                        prop: 'order_ctime',
                        label: '创建时间',
                    },
                    filter: {

                    },
                    style: {
                        width: '120',
                        align: 'center'
                    }
                }
            },
             //需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            }
        }
    },
      methods:{

      	//获取订单列表
        GetOrderList({
            page,
            page_size,
            where,
            fn
        } = {}){
           var query = this.$route.query;

            this.paginations.current_page = page || parseInt(query.page) || 1;
            this.paginations.page_size = page_size || parseInt(query.page_size) || this.paginations.page_size;

            var data = {
                page: this.paginations.current_page,
                page_size: this.paginations.page_size
            };

            if (where) {
                data = Object.assign(data, where || {});
            }

        axios.get('json/orderlist.json').then((res)=>{
            this.order_list=res.data.orderList;
            // console.log(this.order_list);
            this.paginations.total = res.data.orderList.length;
        })
        },
        // 删除订单
        DeleteOrder() {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 查看订单详情
       OrderDeails(orders) {
       	this.dialog.show = true;
        this.dialog.order_info = orders;
      },
     // 打印订单
      PrintOrder() {
        this.$alert('确定打印吗？', '打印', {
          confirmButtonText: '确定',
          callback: action => {
          	this.dialog.show = false;
            this.$message({
              type: 'success',
              message: "打印成功"
            });
          }
        });
      },
       /**
         * 修改用户
         * @param  {object} user 当前用户信息对象
         */
        onEditOrder(user) {
            this.dialogEdit.show = true;
            user=this.$route.query;
            console.log(user);
            if (user && user.id) {
                this.$router.push('/order?id=' + user.id);
            } else {
                this.$message({
                    showClose: true,
                    message: 'ID跑哪去了？',
                    type: 'error'
                });
            }
        },

   /**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);

            if (typeof field === 'object') {
                query = field;
            } else {
                query[field] = value;
            }

            this.$router.push({
                path,
                query
            });
        },


        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        onChangeCurrentPage(page) {
            this.GetOrderList({
                page,
                fn: () => {
                    this.setPath('page', page);
                }
            });
        },
/**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        onChangePageSize(page_size) {
            this.GetOrderList({
                page_size,
                fn: () => {
                    this.setPath('page_size', page_size);
                }
            });
        },

        /**
         * 点击搜索按钮事件
         */
        onSearch() {
            console.log(this.search_data);

            var sd = {};

            var query = this.$route.query;
            for (var p in query) {
                sd[p] = query[p];
            }

            for (var s in this.search_data) {
                sd[s] = this.search_data[s];

                if (!sd[s]) {
                    delete sd[s];
                }
            }


            this.$router.push({
                path: this.$route.path,
                query: sd
            });
        },
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
        }
      },
      mounted() {
            this.GetOrderList({
            fn: () => {
                // this.onSelectArticle(this.article_list[1]);
            }
        })
        },
    components:{
		createOrder
    },
    watch: {
        '$route' (to, from) {
            this.GetOrderList();
        }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.demo-form-inline{
		float: right;
	}
</style>