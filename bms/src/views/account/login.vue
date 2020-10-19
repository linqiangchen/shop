<template>
<div class="login">
<h1>欢迎登录星座商城管理系统</h1>
  <a-form-model ref="ruleForm" :model="ruleForm" v-bind="layout">
  <a-form-model-item has-feedback label="用户名" prop="age">
      <a-input v-model.number="ruleForm.user" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
       登录
      </a-button>
     
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import Vue from "vue";
import axios from 'axios'
import { Form, FormModel, Input, Button ,Message} from "ant-design-vue";
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Button);
Vue.use(Message);
export default {
  data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
    //   clearTimeout(checkPending);
    //   if (!value) {
    //     return callback(new Error('Please input the age'));
    //   }
    //   checkPending = setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('Please input digits'));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('Age must be greater than 18'));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        user: '',
      },
    //   rules: {
    //     pass: [{ validator: validatePass, trigger: 'change' }],
    //     checkPass: [{ validator: validatePass2, trigger: 'change' }],
    //     age: [{ validator: checkAge, trigger: 'change' }],
    //   },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           axios
        .post("/os/account/login", { user: this.ruleForm.user, pass: this.ruleForm.pass })
        .then((res) => {

         this.$message.info(res.data.msg);
          if (res.data.code === 0) {
              
            this.$store.commit("account/setLogin", true);
            this.$store.commit("account/setInfo", res.data.data);
            this.$router.push("/");
          }
        });
        } else {
          
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" >
.login{
   padding: 50px;
    background-color: #FAFAFA;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    h1{
        font-size: 18px;
        margin-bottom: 20px;
    }
    form{
        div{
          display: flex;
          justify-content: center;
          .ant-form-item-label{
              width: 80px;
             label{
              display: inline-block;
              width: 80px;
              text-align-last: justify;
          }
          }
         .ant-form-item-control-wrapper{
             width: 200px;
         }
   
          input{
              width: 200px;
          }
        }
    .ant-form-item:nth-child(3){
    .ant-form-item-control-wrapper{
        width: 280px !important;
        margin: 0;
        .ant-form-item-control{
            margin:  0 auto;
        }
    }
    }
    }
}
</style>