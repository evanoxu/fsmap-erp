import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const Modals = ({
  item,
  dtype,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {

  // 封装父层数据
  const modalOpts = {
    ...modalProps,
  };

  if (dtype === 0) {
    return (
      <Modal width={400} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="ID" {...formItemLayout}>
            <span>{item.list[0].id}</span>
          </FormItem>
          <FormItem label="内容" {...formItemLayout}>
            <span>{item.list[0].content}</span>
          </FormItem>
          <FormItem label="用户名" {...formItemLayout}>
            <span>{item.list[0].createName}</span>
          </FormItem>
          <FormItem label="创建时间" {...formItemLayout}>
            <span>{item.list[0].createTime}</span>
          </FormItem>
        </Form>
      </Modal>
    );
  } else {
    return (
      <Modal width={350} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="ID" {...formItemLayout}>
            <span>{item.list[0].id}</span>
          </FormItem>
          <FormItem label="内容" {...formItemLayout}>
            <span>{item.list[0].content}</span>
          </FormItem>
          <FormItem label="用户名" {...formItemLayout}>
            <span>{item.list[0].createName}</span>
          </FormItem>
          <FormItem label="创建时间" {...formItemLayout}>
            <span>{item.list[0].createTime}</span>
          </FormItem>
        </Form>
      </Modal>
    );
  }

};

Modals.propTypes = {
  item: PropTypes.object,
  dtype: PropTypes.number,
  form: PropTypes.object.isRequired,
}

export default Form.create()(Modals);