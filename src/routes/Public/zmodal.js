import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Row, Col, Upload, message, Select } from 'antd';

import { APIPath } from '../../utils';

const FormItem = Form.Item;
const Option = Select.Option;

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
  pType,
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
      if (zkey == '2') {
        const asd = pType.filter(function (v, i) {
          return v.label == data.typeName;
        });
        data.typeValue = asd[0].value;
      }
      // console.log('提交',data);
      onOk(data);
    });
  };
  // 封装父层数据
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  // 上传接口
  const propss = {
    action: APIPath.PUBLICTYPEUPPIC,
    showUploadList: false,
  };

  /* 公共服务分类 */
  // 公共服务图标
  const deType = getFieldsValue();
  const deTypePic = deType['typePic'];
  const deTypePicOn = deType['typePicOn'];
  const deTypeSmallPic = deType['subSmallPic'];
  const deTypeBigPic = deType['subBigPic'];
  // 公共服务图标图标上传回调数据
  const handlePicChange = (type, info) => {
    let filesList = info.file;
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      if (type == 'typepic') {
        const fields = getFieldsValue();
        fields['typePic'] = data;
        setFieldsValue(fields);
      } else if (type == 'typepicon') {
        const fields = getFieldsValue();
        fields['typePicOn'] = data;
        setFieldsValue(fields);
      } else if (type == 'subsmallpic') {
        const fields = getFieldsValue();
        fields['subSmallPic'] = data;
        setFieldsValue(fields);
      } else {
        const fields = getFieldsValue();
        fields['subBigPic'] = data;
        setFieldsValue(fields);
      }
    }
  };
  // 公共服务图标图标上传检测
  const handlePicUpload = (file) => {
    const isType = file.type;
    if (isType == '') {
      message.error('上传文件格式有误，请重新选择');
      return false;
    } else {
      return true;
    }
  };

  /* 公共服务子类 */
  // 公共服务子类图标
  const subType = getFieldsValue();
  const subTypePic = subType['subTypePic'];
  const subTypePicOn = subType['subTypePicOn'];
  const subTypeSmallPic = subType['subSmallPic'];
  const subTypeBigPic = subType['subBigPic'];
  // 公共服务图标图标上传回调数据
  const handleSPicChange = (type, info) => {
    let filesList = info.file;
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      if (type == 'subtypepic') {
        const fields = getFieldsValue();
        fields['subTypePic'] = data;
        setFieldsValue(fields);
      } else if (type == 'subtypepicon') {
        const fields = getFieldsValue();
        fields['subTypePicOn'] = data;
        setFieldsValue(fields);
      } else if (type == 'subsmallpic') {
        const fields = getFieldsValue();
        fields['subSmallPic'] = data;
        setFieldsValue(fields);
      } else {
        const fields = getFieldsValue();
        fields['subBigPic'] = data;
        setFieldsValue(fields);
      }
    }
  };
  // 公共服务图标图标上传检测
  const handleSPicUpload = (file) => {
    const isType = file.type;
    if (isType == '') {
      message.error('上传文件格式有误，请重新选择');
      return false;
    } else {
      return true;
    }
  };
  const selectOption = pType.map(sels => <Option key={sels.label}>{sels.label}</Option>);

  // console.log('modal', zkey, item);

  if (zkey === '1') {
    return (
      <Modal width={400} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="公共服务分类" {...formItemLayout}>
            {getFieldDecorator('typeName', {
              initialValue: item.typeName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="输入公共服务分类名" />)}
          </FormItem>
          <FormItem label="图标（未选中）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
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
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="图标（选中）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
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
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="定位图标（小）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={deTypeSmallPic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handlePicChange.bind(null, 'subsmallpic')} beforeUpload={handlePicUpload}>
                  {getFieldDecorator('subSmallPic', {
                    initialValue: item.subSmallPic,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="定位图标（大）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={deTypeBigPic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handlePicChange.bind(null, 'subbigpic')} beforeUpload={handlePicUpload}>
                  {getFieldDecorator('subBigPic', {
                    initialValue: item.subBigPic,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  } else if (zkey === '2') {
    return (
      <Modal width={400} {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="公共服务分类" {...formItemLayout}>
            {getFieldDecorator('typeName', {
              initialValue: item.typeName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Select placeholder="选择公共服务分类名">{selectOption}</Select>)}
          </FormItem>
          <FormItem label="公共服务子类" {...formItemLayout}>
            {getFieldDecorator('subTypeName', {
              initialValue: item.subTypeName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="输入公共服务子类名" />)}
          </FormItem>
          <FormItem label="图标（未选中）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={subTypePic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handleSPicChange.bind(null, 'subtypepic')} beforeUpload={handleSPicUpload}>
                  {getFieldDecorator('subTypePic', {
                    initialValue: item.subTypePic,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="图标（选中）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={subTypePicOn} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handleSPicChange.bind(null, 'subtypepicon')} beforeUpload={handleSPicUpload}>
                  {getFieldDecorator('subTypePicOn', {
                    initialValue: item.subTypePicOn,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="定位图标（小）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={subTypeSmallPic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handleSPicChange.bind(null, 'subsmallpic')} beforeUpload={handleSPicUpload}>
                  {getFieldDecorator('subSmallPic', {
                    initialValue: item.subSmallPic,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="定位图标（大）" {...formItemLayout}>
            <Row>
              <Col span={2} style={{ width: 20, height: 20, margin: '6px 7px' }}>
                <img width="20" height="20" src={subTypeBigPic} />
              </Col>
              <Col span={20}>
                <Upload {...propss} onChange={handleSPicChange.bind(null, 'subbigpic')} beforeUpload={handleSPicUpload}>
                  {getFieldDecorator('subBigPic', {
                    initialValue: item.subBigPic,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input size="large" placeholder="点击选择新图片" disabled />)}
                </Upload>
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
  pType: PropTypes.array,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Modals);
