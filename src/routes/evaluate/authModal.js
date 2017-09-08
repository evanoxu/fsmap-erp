import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Row, Col, Radio, Upload, message,Select,Switch } from 'antd';

import { APIPath } from '../../utils';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const Modals = ({
  editInfo,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  var init = {
    account: '',
    password: '',
    name: '',
    telphone: '',
    state: '0',
    isUperManage: false,
    uperManageAccount: '',
    menus: '',
    hasMyMap: false,
  }  
  if(editInfo){
    init = {
      account: editInfo.account,
      password: editInfo.password,
      name: editInfo.name,
      telphone: editInfo.telphone,
      state: editInfo.state,
      isUperManage: Number(editInfo.isUperManage)?true:false,
      uperManageAccount: editInfo.uperManageAccount,
      menus: editInfo.menus,
      hasMyMap: Number(editInfo.hasMyMap)?true:false,
    }    
  }  
  // console.log(init);
  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      var  data = {
        ...getFieldsValue(),
      };
      data.isUperManage = data.isUperManage?1:0;
      data.hasMyMap = data.hasMyMap?1:0;
      if(init.id)  data.id = init.id
      onOk(data);
    });
  };

  // 封装父层数据
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator('account', {
            initialValue: init.account,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="新密码" {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
          })(<Input />)}
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: init.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="电话" {...formItemLayout}>
          {getFieldDecorator('telphone', {
            initialValue: init.telphone,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>                              
        <FormItem label="账号状态" {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: String(init.state),
            rules: [
              {
                required: true,
              },
            ],
          })(
          <Select
            >
              <Option value="0">可用</Option>
              <Option value="1">不可用</Option>
            </Select>
          )}
        </FormItem>       
        <FormItem
          {...formItemLayout}
          label="是否为主管部门"
        >
          {getFieldDecorator('isUperManage', {
            initialValue: init.isUperManage,
            valuePropName: 'checked' 
          })(
            <Switch />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="自定义地图权限"
        >
          {getFieldDecorator('hasMyMap', {
            initialValue: init.hasMyMap,
            valuePropName: 'checked' 
          })(
            <Switch />
          )}          
        </FormItem>   
      </Form>
    </Modal>
  )

};

// Modals.propTypes = {
//   item: PropTypes.object,
//   zkey: PropTypes.string,
//   onOk: PropTypes.func,
//   form: PropTypes.object.isRequired,
// }

export default Form.create()(Modals);