import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select } from 'antd';

const FormItem = Form.Item;
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
  pmenus,
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
  const roleOption = pmenus.map(sels => <Option key={sels.name}>{sels.name}</Option>);

  // 查询名
  const roleSet = (id) => {
    if (id) {
      const ad = pmenus.filter((v) => {
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
  // 查询值
  const roleFet = (name) => {
    if (name) {
      const ad = pmenus.filter((v) => {
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

  const role = roleSet(item.parentUid);

  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.parentUid = roleFet(data.parentUid);
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
        <FormItem label="菜单名" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入菜单名" />)}
        </FormItem>
        <FormItem label="所属菜单" {...formItemLayout}>
          {getFieldDecorator('parentUid', {
            initialValue: role,
          })(<Select size="large" style={{ width: '100%' }} placeholder="选择所属菜单">{roleOption}</Select>)}
        </FormItem>
      </Form>
    </Modal>
  );
};

Modals.propTypes = {
  pmenus: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Modals);
