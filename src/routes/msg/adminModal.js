import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Row, Col, Radio, Upload, message,Select,Switch } from 'antd';

import { APIPath } from '../../utils';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
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
    id: '',
    type: '',
    remark: '',
  }  
  if(editInfo){
    init = {
      id:editInfo.id,
      type: editInfo.type,
      remark: editInfo.remark,
    }    
  }  
  
  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      var  data = {
        ...getFieldsValue(),
      };
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
        <FormItem label="标题" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: init.type,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="内容" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: init.remark,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input rows="3" type="textarea" />)}
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