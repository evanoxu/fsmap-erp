import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon, Select, Row, Col, message } from 'antd';
import { APIPath, arrayToType } from '../../utils';

const Option = Select.Option;

const Uploadbar = ({
  itype,
  modalVisible,
  onImp,
}) => {

  const serverData = arrayToType(itype);
  
  // 设置默认上传资料
  let propsList = {};

  // 设置运营商
  const serverOptions = serverData.servers.map(servers => <Option key={servers.value}>{servers.label}</Option>);

  // 设置上传回调数据
  const handleChange = (info) => {
    let filesList = info.file;
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      propsList = {
        ...propsList,
        excelUrl: data,
      }
    }
  }
  const handleRemove = () => {
    propsList = {
      ...propsList,
      excelUrl: '',
    }
  }
  const handleUpload = (file) => {
    const isType = file.name.split('.');
    if (isType[isType.length-1] != 'xls') {
      message.error('上传文件格式有误，请重新选择');
      return false;
    } else {
      return true;
    }
  }

  // 设置运营商数据
  const handleSChange = (value) => {
    propsList = {
      ...propsList,
      serverId:value,
    }
  }

  // 设置导入数据
  const handleClick = () => {
    if (Object.keys(propsList).length < 2) {
      message.error('请先填写相关数据');
    } else {
      onImp(propsList);
    }
  }

  const propss = {
    action: APIPath.DATAIMPORTUPEXCEL,
    onChange: handleChange,
    beforeUpload: handleUpload,
  }

  return (
    <Row>
      <Col span={3}>
        运营商：
        <Select style={{ width: 90 }} onChange={handleSChange} placeholder="选择运营商">
          {serverOptions}
        </Select>
      </Col>
      <Col style={{marginLeft: 15}} span={2}>
        <Upload {...propss} onRemove={handleRemove}>
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        </Upload>
      </Col>
      <Col span={4}>
        <Button type="primary" loading={modalVisible} onClick={handleClick}>导入</Button>
      </Col>
    </Row>
  );
};

Uploadbar.PropTypes = {
  itype: PropTypes.array,
  onImp: PropTypes.func,
  modalVisible: PropTypes.bool,
}

export default Uploadbar;