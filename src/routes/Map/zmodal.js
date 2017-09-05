import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Row, Col, Radio, Upload, message } from 'antd';

import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

import { APIPath } from '../../utils';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
  zkey,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
        zkey,
      };
      // console.log('提交',data);
      onOk(data);
    });
  };

  // 颜色选择
  const def = getFieldsValue();
  const deColor = def['color'];
  const handleColorChange = (colors) => {
    const fields = getFieldsValue();
    fields['color'] = colors.color.replace('#', '');
    setFieldsValue(fields);
  };

  // 宽带专题图标
  const deType = getFieldsValue();
  const deTypePic = deType['typePic'];
  const deTypePicOn = deType['typePicOn'];
  const propss = {
    action: APIPath.DATATYPEUPPIC,
    showUploadList: false,
  };
  // 宽带专题图标上传回调数据
  const handlePicChange = (type, info) => {
    let filesList = info.file;
    console.log(filesList)
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      if (type == 'typepic') {
        const fields = getFieldsValue();
        fields['typePic'] = data;
        setFieldsValue(fields);
      } else {
        const fields = getFieldsValue();
        fields['typePicOn'] = data;
        setFieldsValue(fields);
      }
    }
  };
  // 宽带专题图标上传检测
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

  // console.log('modal', zkey, item);

  if (zkey === '1') {
    return (
      <Modal width={400} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="专题名" {...formItemLayout}>
              {getFieldDecorator('typeName', {
                initialValue: item.typeName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="输入宽带服务商名" />)}
          </FormItem>
          <FormItem label="图标（未选中）" {...formItemLayout}>
              <Row>
                <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px'}}>
                  <img width="20" height="20" src={deTypePic} />
                </Col>
                <Col span={20}>
                  <Upload {...propss} onChange={handlePicChange.bind(null, 'typepic')} beforeUpload={handlePicUpload}>
                    {getFieldDecorator('typePic', {
                      initialValue: item.typePic,
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
          <FormItem label="图标（选中）" {...formItemLayout}>
              <Row>
                <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px'}}>
                  <img width="20" height="20" src={deTypePicOn} />
                </Col>
                <Col span={20}>
                  <Upload {...propss} onChange={handlePicChange.bind(null, 'typepicon')} beforeUpload={handlePicUpload}>
                    {getFieldDecorator('typePicOn', {
                      initialValue: item.typePicOn,
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
          <FormItem label="民资运营商" {...formItemLayout}>
              {getFieldDecorator('serverType', {
                initialValue: item.serverType,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  } else if (zkey === '2') {
    return (
      <Modal width={350} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="连接方式" {...formItemLayout}>
            {getFieldDecorator('subTypeName', {
              initialValue: item.subTypeName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="输入连接方式名" />)}
          </FormItem>
          <FormItem label="连接方式速率" {...formItemLayout}>
            {getFieldDecorator('speed', {
              initialValue: item.speed ? item.speed : 20,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber min={1} max={500} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  } else {
    return (
      <Modal width={300} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="名称" labelCol={{span: 8}} wrapperCol={{span: 13}}>
              {getFieldDecorator('colorName', {
                initialValue: item.colorName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="输入宽带速率名称" />)}
          </FormItem>
          <FormItem label="宽带速率" {...formItemLayout}>
              {getFieldDecorator('speed', {
                initialValue: item.speed ? item.speed : 20,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<InputNumber min={1} max={500} />)}
          </FormItem>
          <FormItem label="颜色" labelCol={{span: 8}} wrapperCol={{span: 13}}>
              <Row>
                <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px'}}>
                  <ColorPicker
                    color={deColor ? `#${deColor}` : '#000'}
                    onChange={handleColorChange}
                    placement="topLeft"
                  />
                </Col>
                <Col span={18}>
                  {getFieldDecorator('color', {
                    initialValue: item.color,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="请选择颜色" disabled />)}
                </Col>
              </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }

};

Modals.propTypes = {
  item: PropTypes.object,
  zkey: PropTypes.string,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
}

export default Form.create()(Modals);