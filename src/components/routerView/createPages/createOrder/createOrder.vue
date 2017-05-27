<template>
    <!-- 订单信息弹窗 -->
    <div class="form">
        <el-form label-width="100px"
            :model="clientInfo"
            :rules="order_rules"
            ref='clientInfo'>
            <el-row><el-form-item label="订单号:" prop='order_num'><span v-text="clientInfo.order_num"></span></el-form-item></el-row>
            <el-row>
                <el-col :span='8'>
                    <el-form-item label="客户姓名:" prop='client_name'>
                        <el-input 
                :disabled='clientInfo.id ? true : false'
                v-model="clientInfo.client_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='16'>
                    <el-form-item label="联系电话" prop='client_tel1'>
                        <el-input 
                :disabled='clientInfo.id ? true : false'
                v-model="clientInfo.client_tel1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='8'>
                    <el-form-item label="性别">
                        <el-select v-model="clientInfo.client_sex" placeholder="请选择">
                            <el-option key="1" label="男" value="1"></el-option>
                            <el-option key="2" label="女" value="2"></el-option>
                            <el-option key="3" label="保密" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='16'>
                    <el-form-item label="备用电话" prop='client_tel2'>
                        <el-input 
                :disabled='clientInfo.id ? true : false'
                v-model="clientInfo.client_tel2"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-form-item class="edit-form" 
                label='地址'
                prop='client_address'>
                    <el-input type='textarea' 
                    v-model="clientInfo.client_address"
                    placeholder='住址'></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary" style='float: right' @click='save_client("clientInfo")'>保存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

<el-tabs v-model="tabActive">
    <el-tab-pane label="珠宝" name="first">珠宝</el-tab-pane>
    <el-tab-pane label="皮具" name="second">皮具</el-tab-pane>
    <el-tab-pane label="腕表" name="third">腕表</el-tab-pane>
    <el-tab-pane label="定制" name="fourth">定制</el-tab-pane>
  </el-tabs> 

        
    </div>
  


</template>

<script>
  export default {
      data() {
        return {
             tabActive: 'first',
            clientInfo: {
                order_num: '1122233',
                client_name: '',
                client_tel1:'',
                client_tel2:'',
                client_sex: '',
                client_address: ''
            },
            goodInfo: {
                good_type: '',
                good_name: '',
                good_question:'',
                good_img1:''
            },
            repairInfo: {
                good_img2: '',
                order_shop: ''
            },
            statusInfo: {

            },
                
            order_rules: {
                client_name: [{
                    required: true,
                    message: '请输入客户名字',
                    trigger: 'blur'
                }],
                client_sex: [{
                    required: true,
                    message: '性别必填',
                    trigger: 'blur'
                }],
                client_tel1: [{
          validator:(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请输入联系电话'));
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
                client_address: [{
                    required: true,
                    message: '客户地址不能为空',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
         handleClick(tab, event) {
        console.log(tab, event);
      },
        /**
         * 提交表单
         * @param  {string} formName 表单名称
         */
        save_client(formdata) {
            this.$refs[formdata].validate((valid) => {
                if (valid) {

                    alert('用户信息保存成功');

                }
            });
        },
        reset_order(formdata) {
            this.$refs[formdata].resetFields();
        },
    },
    created() {},
    mounted() {

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>