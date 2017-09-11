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
    imgUrl: '',
    linkUrl: '',
  }  
  if(editInfo){
    init = {
      id:editInfo.id,
      imgUrl: editInfo.imgUrl,
      linkUrl: editInfo.linkUrl,
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

  // 宽带专题图标
  const deType = getFieldsValue();
  const deTypePic = deType['imgUrl'];

  const propss = {
    action: APIPath.ACTUPLOAD,
    showUploadList: false,
  };
  // 宽带专题图标上传回调数据
  const handlePicChange = (type, info) => {
    let filesList = info.file;
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      if (type == 'imgUrl') {
        const fields = getFieldsValue();
        fields['imgUrl'] = data;
        setFieldsValue(fields);
      }
    }
  };

  // 上传检测
  const handlePicUpload = (file) => {
    const isType = file.type;
    if (isType == '') {
      message.error('上传文件格式有误，请重新选择');
      return false;
    } else {
      return true;
    }
  }

  // 封装父层数据
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="图片" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px'}}>
                <img width="20" height="20" src={deTypePic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handlePicChange.bind(null, 'imgUrl')} beforeUpload={handlePicUpload}>
                  {getFieldDecorator('imgUrl', {
                    initialValue: init.imgUrl,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                  <Input size="large" placeholder="点击选择新图片" disabled />
                  )}
                </Upload>
              </Col>
            </Row>
        </FormItem>        
        <FormItem label="链接" {...formItemLayout}>
          {getFieldDecorator('linkUrl', {
            initialValue: init.linkUrl,
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