import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Modals = ({
  roles,
  item,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  // 设置角色权限
  const roleOption = roles.map(sels => <Option key={sels.name}>{sels.name}</Option>);

  // 查询产业类型名
  const roleSet = (id) => {
    if (id) {
      const ad = roles.filter((v) => {
        return v.uid === id;
      });
      if (ad.length > 0) {
        return ad[0].name;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };
  // 查询产业类型值
  const roleFet = (name) => {
    if (name) {
      const ad = roles.filter((v) => {
        return v.name === name;
      });
      if (ad.length > 0) {
        return ad[0].uid;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  const role = roleSet(item.roleUid);

  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.roleUid = roleFet(data.roleUid);
      // console.log('提交',data);
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
            initialValue: item.account,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入用户名" />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {getFieldDecorator('password', {})(<Input type="password" placeholder="设置新密码" />)}
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入昵称" />)}
        </FormItem>
        <FormItem label="所属角色" {...formItemLayout}>
          {getFieldDecorator('roleUid', {
            initialValue: role,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select size="large" style={{ width: '100%' }} placeholder="选择所属角色">{roleOption}</Select>)}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: item.state,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup>
              <Radio value={0}>可用</Radio>
              <Radio value={1}>不可用</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

Modals.propTypes = {
  roles: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Modals);
