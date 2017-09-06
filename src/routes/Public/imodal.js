import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Cascader, Row, Col } from 'antd';
import { BDMap } from '../../components';

const FormItem = Form.Item;
const { TextArea } = Input;

// 设置地图对象
let stateMap = {};

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
};

const Imodal = ({
  pType,
  modalVisible,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  
  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.publicServiceSubType = data.publicServiceType[1];
      data.publicServiceType = data.publicServiceType[0];
      // console.log('提交',data);
      onOk(data);
    });
  };

  // 获取地图信息
  const handleMap = (obj) => {
    const _map = obj;
    stateMap = _map;
    _map.addEventListener('click', function (e) {
      // console.log('当前坐标点：' + e.point.lng + ',' + e.point.lat);
      // 创建地址解析器实例
      const newGeo = new BMap.Geocoder();
      // 根据新坐标获取地址
      newGeo.getLocation(e.point, function (res) {
        // console.log('m', res);
        // 清除标注
        _map.clearOverlays();
        // 创建新标注
        const newPonit = new BMap.Point(res.point.lng, res.point.lat);
        const marker = new BMap.Marker(newPonit);
        _map.addOverlay(marker);
        // 添加新标注跳跃动画
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        // 定位到新坐标
        _map.panTo(newPonit);
        // 修改参数
        const fields = getFieldsValue();
        fields['lnglat'] = res.point.lng + ',' + res.point.lat;
        fields['address'] = res.address;
        setFieldsValue(fields);
      });
    });
  };

  // 通过地址获取地图信息
  const handleChange = (e) => {
    let _val = e.target.value;
    const _map = stateMap;
    // 创建地址解析器实例
    const newGeo = new BMap.Geocoder();
    // 根据地址获取坐标
    newGeo.getPoint(_val, function (res) {
      // console.log('c', res);
      if (res != null) {
        // 清除标注
        _map.clearOverlays();
        // 创建新标注
        const newPonit = new BMap.Point(res.lng, res.lat);
        const marker = new BMap.Marker(newPonit);
        _map.addOverlay(marker);
        // 添加新标注跳跃动画
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        // 定位到新坐标
        _map.panTo(newPonit);
        // 修改参数
        const fields = getFieldsValue();
        fields['lnglat'] = res.lng + ',' + res.lat;
        setFieldsValue(fields);
      }
    }, '佛山市');
  };

  return (
    <Form layout="vertical">
      <Row type="flex" justify="start">
        <Col span={8}>
          <FormItem label="公共服务设施名" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="输入公共服务设施名" />)}
          </FormItem>
          <FormItem label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="输入公共服务设施具体位置信息" onChange={handleChange} />)}
          </FormItem>
          <FormItem label="坐标" {...formItemLayout}>
              {getFieldDecorator('lnglat', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请从地图上选择坐标" />)}
          </FormItem>
          <FormItem label="公共服务类型" {...formItemLayout}>
            {getFieldDecorator('publicServiceType', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Cascader
              size="large"
              style={{ width: '100%' }}
              options={pType}
              placeholder="选择公共服务类型"
            />)}
          </FormItem>
          <FormItem label="办事指南" {...formItemLayout}>
            {getFieldDecorator('introduction', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <TextArea rows={2} />
            )}
          </FormItem>
          <FormItem label="电话" {...formItemLayout}>
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input placeholder="输入电话号码" />
            )}
          </FormItem>
          <FormItem label="办公时间" {...formItemLayout}>
            {getFieldDecorator('officeTime', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input placeholder="输入办公时间" />
            )}
          </FormItem>
          <FormItem label="直达链接" {...formItemLayout}>
            {getFieldDecorator('linkUrl', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input placeholder="输入直达链接" />
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <div style={{padding: 5}}>可从地图上获取地址、坐标:</div>
          <BDMap initCB={handleMap.bind(this)} />
        </Col>
      </Row>
      <Button type="primary" size="large" style={{ marginLeft: 90 }} loading={modalVisible} onClick={handleOk}>提交</Button>
    </Form>
  );
};

Imodal.propTypes = {
  pType: PropTypes.array,
  modalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Imodal);