import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Row, Col, Radio, Upload, message,Select } from 'antd';

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
    mapType: 'map',
    subTypeName: '',
    id: ''
  }  
  if(editInfo){
    init = {
      mapType: editInfo.mapType,
      subTypeName: editInfo.subTypeName,
      id: editInfo.id
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
        <FormItem label="所属板块" {...formItemLayout}>
          {getFieldDecorator('mapType', {
            initialValue: init.mapType,
            rules: [
              {
                required: true,
              },
            ],
          })(
          <Select
            >
              <Option value="map">宽带地图</Option>
              <Option value="publicService">公共服务评价</Option>
            </Select>
          )}          
        </FormItem>      
        <FormItem label="问题类型" {...formItemLayout}>
          {getFieldDecorator('subTypeName', {
            initialValue: init.subTypeName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
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