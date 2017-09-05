import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Modal, Cascader, Row, Col } from 'antd';
import { Config, querySetParam, arrayToType } from '../../utils';
import { BDMap } from '../../components';

// 设置地图对象
let stateMap = {};

const Modals = ({
  ...PlateLoadProps
}) => {
  // 获取地图信息
  const handleMap = (obj) => {
    const _map = obj;
    stateMap = _map;
  };

  return (
    <div className=""><BDMap style={{height:'600px'}} initCB={handleMap.bind(this)} /></div>
  );
};



export default Modals