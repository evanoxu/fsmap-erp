import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Cascader } from 'antd';

// 引入搜索框
const Search = Input.Search;

// 引入样式
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};
const TwoColProps = {
  ...ColProps,
  xl: 96,
};

const Filter = ({
  pType,
  details,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue();
    if (details) {
      fields['area'] = fields['area'][1];
    } else {
      fields['subArea'] = fields['area'][1];
      fields['area'] = fields['area'][0];
    }
    onFilterChange(fields);
  };
  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [1,1];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };
  const { keys, area, subArea } = filter;
  let areas = [];
  if (area) {
    areas.push(parseInt(area));
  } else {
    areas.push(1);
  }
  if (subArea) {
    areas.push(parseInt(subArea));
  } else {
    areas.push(1);
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} md={{ span: 6 }}>
        {getFieldDecorator('area', { initialValue: areas })(<Cascader 
          size="large" 
          style={{ width: '100%' }} 
          options={pType} 
          placeholder="选择公共服务类别" 
        />)}
      </Col>
      <Col {...ColProps} md={{ span: 6 }}>
        {getFieldDecorator('keys', { initialValue: keys })(<Search placeholder="输入要查询的关键词" size="large" />)}
      </Col>
      <Col {...TwoColProps} md={{ span: 8 }}>
        <Button type="primary" size="large" style={{ marginRight: 16 }} onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  pType: PropTypes.array,
  details: PropTypes.bool,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default Form.create()(Filter);
