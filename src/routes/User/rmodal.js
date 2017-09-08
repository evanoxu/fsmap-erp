import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Modals = ({
  menus,
  item,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  // const menu = menuSet(item.menuUid);
  // console.log(menus);

  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.roles = data.roles.join(',');
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
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入用户名" />)}
        </FormItem>
        <FormItem label="菜单类型" {...formItemLayout}>
          {getFieldDecorator('roles', {
            rules: [
              {
                required: true,
              },
            ],
          })(<CheckboxGroup options={menus} />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

Modals.propTypes = {
  menus: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Modals);
