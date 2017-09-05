import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';

const List = ({ datass, location, loading, onDeleteItem, onEditItem, ...tableProps }) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '标注人',
      dataIndex: 'createName',
      key: 'createName',
    }, {
      title: '标注时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handleEditClick.bind(null,id)}>编辑</Button>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // 获取编辑信息
  const handleEditClick = (id) => {
    onEditItem(id);
  }

  // 删除地图基础数据
  const handleDeleteClick = (id) => {
     onDeleteItem(id);
  };

  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        columns={columns}
        dataSource={datass}
        loading={loading}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  );
};

List.propTypes = {
  datass: PropTypes.array,
  pagination: PropTypes.object,
  location: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};

export default List;
