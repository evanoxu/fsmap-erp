import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Modal, Cascader, Row, Col } from 'antd';
import { Config, querySetParam, arrayToType } from '../../utils';
import { BDMap } from '../../components';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

// 设置地图对象
let stateMap = {};

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Modals = ({
  itype,
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
  const serverData = arrayToType(itype);

  // 提交按钮
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.areaId = data.areaId[2];
      data.servers = querySetParam(data.servers);
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

  // 地区值
  const queci = [44,6];
  queci.push(item.areaId);

  // 网络类型
  const quenet = [];
  if (item.nets != null) {
    for(let i = 0, len = item.nets.length; i<len; i++){
      let arr = item.nets[i].serverId+':'+item.nets[i].netCategoryId+'-'+item.nets[i].speedReal;
      quenet.push(arr);
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
        <FormItem label="名称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入公司名称、小区名称" />)}
        </FormItem>
        <FormItem label="地区" {...formItemLayout}>
          {getFieldDecorator('areaId', {
            initialValue: queci,
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={Config.city}
            placeholder="选择地区"
          />)}
        </FormItem>
        <FormItem label="地址" {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="输入公司、小区具体位置信息" onChange={handleChange} />)}
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
        <FormItem label="网络类型" {...formItemLayout}>
          {getFieldDecorator('servers', {
            initialValue: quenet,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <CheckboxGroup options={serverData.netops} />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

Modals.propTypes = {
  itype: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
  form: PropTypes.object.isRequired,
}

export default Form.create()(Modals);