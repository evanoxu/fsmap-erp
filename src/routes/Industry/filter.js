import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Select } from 'antd';

const Option = Select.Option;
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
  ntype,
  details,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // 设置产业类型
  const selectOption = ntype.map(sels => <Option key={sels.typeName}>{sels.typeName}</Option>);
  // 查询产业类型名
  const IndustrySet = (id) => {
    if (id) {
      const ad = ntype.filter((v) => {
        return v.typeValue === id;
      });
      if (ad.length > 0) {
        return ad[0].typeName;
      } else {
        return '所有';
      }
    } else {
      return '所有';
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
  // 查询按钮
  const handleSubmit = () => {
    let fields = getFieldsValue();
    if (!details) {
      fields['area'] = IndustryFet(fields['area']);
    }
    onFilterChange(fields);
  };
  // 重置按钮
  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (item == 'area' && typeof(fields[item]) == 'string') {
          fields[item] = '所有';
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };
  const { keys, area } = filter;
  const areas = IndustrySet(area);

  return (
    <Row gutter={24}>
      { !details &&
      <Col {...ColProps} md={{ span: 4 }}>
        {getFieldDecorator('area', { initialValue: areas })(<Select size="large" style={{ width: '100%' }} placeholder="选择产业类型">{selectOption}</Select>)}
      </Col>
      }
      <Col {...ColProps} md={{ span: 6 }}>
        {getFieldDecorator('keys', { initialValue: keys })(<Search placeholder="输入要查询的企业关键词" size="large" />)}
      </Col>
      <Col {...TwoColProps} md={{ span: 8 }}>
        <Button type="primary" size="large" style={{ marginRight: 16 }} onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  ntype: PropTypes.array,
  details: PropTypes.bool,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default Form.create()(Filter);
