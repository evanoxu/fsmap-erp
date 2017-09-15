import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input } from 'antd';

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
  placeholder,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // 查询按钮
  const handleSubmit = () => {
    let fields = getFieldsValue();
    onFilterChange(fields);
  };
  // 重置按钮
  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        fields[item] = undefined;
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };
  const { keys } = filter;
  return (
    <Row gutter={24}>
      <Col {...ColProps} md={{ span: 6 }}>
        {getFieldDecorator('keys', { initialValue: keys })(<Input placeholder={placeholder||'输入关键词'} size="large" />)}
      </Col>
      <Col {...TwoColProps} md={{ span: 8 }}>
        <Button type="primary" size="large" style={{ marginRight: 16 }} onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default Form.create()(Filter);
