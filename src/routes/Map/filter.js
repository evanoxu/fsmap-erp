import React from 'react';
import PropTypes from 'prop-types';
import { FilterItem } from '../../components';
import { Form, Button, Row, Col, Input, Cascader } from 'antd';
import { Config } from '../../utils';

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
    fields['area'] = fields['area'][2];
    onFilterChange(fields);
  }
  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit();
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue();
    fields[key] = values[2];
    onFilterChange(fields);
  }
  const { keys, area } = filter;

	return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('area', { initialValue: [44, 6, -1] })(<Cascader
          size="large"
          style={{ width: '100%' }}
          options={Config.city}
          placeholder="请选择城市区域"
          onChange={handleChange.bind(null, 'area')}
        />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
        {getFieldDecorator('keys', { initialValue: keys })(<Input placeholder="请输入你要查询的地址" size="large" />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 4 }} md={{ span: 8 }} sm={{ span: 8 }}>
        <Button type="primary" size="large" style={{marginRight: 16}} onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  );
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)