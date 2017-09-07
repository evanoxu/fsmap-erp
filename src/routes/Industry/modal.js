import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select, Row, Col } from 'antd';
import { BDMap } from '../../components';

const FormItem = Form.Item;

const Option = Select.Option;

const { TextArea } = Input;

// 设置地图对象
let stateMap = {};

const cityarea = [
  {
    value: 1,
    label: '顺德区',
  },
  {
    value: 2,
    label: '高明区',
  },
  {
    value: 3,
    label: '三水区',
  },
  {
    value: 4,
    label: '南海区',
  },
  {
    value: 5,
    label: '禅城区',
  },
];

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Modals = ({
  ntype,
  item,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  // 设置产业类型
  const selectOption = ntype.map(sels => <Option key={sels.typeName}>{sels.typeName}</Option>);
  // 设置城区
  const areaOption = cityarea.map(area => <Option key={area.label}>{area.label}</Option>);

  // 设置城区名
  const AreaSet = (id) => {
    if (id) {
      const ad = cityarea.filter((v) => {
        return v.value === id;
      });
      if (ad.length > 0) {
        return ad[0].label;
      } else {
        return '所有';
      }
    } else {
      return '所有';
    }
  };
  // 设置城区值
  const AreaFet = (name) => {
    if (name) {
      const ad = cityarea.filter((v) => {
        return v.label === name;
      });
      if (ad.length > 0) {
        return ad[0].value;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  };
  // 查询产业类型值
  const IndustryFet = (name) => {
    if (name) {
      const ad = ntype.filter((v) => {
        return v.typeName === name;
      });
      if (ad.length > 0) {
        return ad[0].typeValue;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  };
  const areas = AreaSet(item.areaId);

  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.areaId = AreaFet(data.areaId);
      data.industryType = IndustryFet(data.industryTypeName);
      // console.log('提交',data);
      onOk(data);
    });
  };

  // 获取地图信息
  const handleMap = (obj) => {
    const _map = obj;
    stateMap = _map;

    if (item.lnglat != null) {
      const ips = item.lnglat.split(',');
      // 清除标注
      _map.clearOverlays();
      // 设置标注
      const poit = new BMap.Point(ips[0],ips[1]);
      const mks = new BMap.Marker(poit);
      _map.addOverlay(mks);
      // 添加新标注跳跃动画
      mks.setAnimation(BMAP_ANIMATION_BOUNCE);
      // 定位到坐标
      _map.panTo(poit);
    }
    
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

  // 封装父层数据
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="企业" {...formItemLayout}>
          {getFieldDecorator('industryName', {
            initialValue: item.industryName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入企业名字" />)}
        </FormItem>
        <FormItem label="地区" {...formItemLayout}>
          {getFieldDecorator('areaId', {
            initialValue: areas,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select size="large" style={{ width: '100%' }} placeholder="选择地区">{areaOption}</Select>)}
        </FormItem>
        <FormItem label="地址" {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入企业具体位置信息" onChange={handleChange} />)}
        </FormItem>
        <FormItem label="坐标" {...formItemLayout}>
            {getFieldDecorator('lnglat', {
              initialValue: item.lnglat,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="请从地图上选择坐标" />)}
        </FormItem>
        <Row type="flex" justify="center" style={{ marginBottom: 24 }}>
          <Col span={20}>
            可从地图上获取地址、坐标:
            <BDMap initCB={handleMap.bind(this)} />
          </Col>
        </Row>
        <FormItem label="产业类型" {...formItemLayout}>
          {getFieldDecorator('industryTypeName', {
            initialValue: item.industryTypeName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select size="large" style={{ width: '100%' }} placeholder="选择产业类型">{selectOption}</Select>)}
        </FormItem>
        <FormItem label="组织机构代码" {...formItemLayout}>
          {getFieldDecorator('orgCode', {
            initialValue: item.orgCode,
          })(
            <Input placeholder="输入组织机构代码" />
          )}
        </FormItem>
        <FormItem label="注册号" {...formItemLayout}>
          {getFieldDecorator('registNum', {
            initialValue: item.registNum,
          })(
            <Input placeholder="输入注册号" />
          )}
        </FormItem>
        <FormItem label="注册资金" {...formItemLayout}>
          {getFieldDecorator('registMoney', {
            initialValue: item.registMoney,
          })(
            <Input placeholder="输入注册资金" />
          )}
        </FormItem>
        <FormItem label="登记状态" {...formItemLayout}>
          {getFieldDecorator('registState', {
            initialValue: item.registState,
          })(
            <Input placeholder="输入登记状态" />
          )}
        </FormItem>
        <FormItem label="联系电话" {...formItemLayout}>
          {getFieldDecorator('phoneNum', {
            initialValue: item.phoneNum,
          })(
            <Input placeholder="输入联系电话" />
          )}
        </FormItem>
        <FormItem label="简介" {...formItemLayout}>
          {getFieldDecorator('introduction', {
            initialValue: item.introduction,
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
        <FormItem label="成立时间" {...formItemLayout}>
          {getFieldDecorator('setupTime', {
            initialValue: item.setupTime,
          })(
            <Input placeholder="输入成立时间" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

Modals.propTypes = {
  ntype: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(Modals);
