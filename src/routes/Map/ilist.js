import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';

const List = ({ datass, location, loading, ...tableProps }) => {
  const columns = [
    {
      title: '标识',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户名',
      dataIndex: 'createName',
      key: 'createName',
    }, {
      title: '总条数',
      dataIndex: 'totalNum',
      key: 'totalNum',
    }, {
      title: '已处理条数',
      dataIndex: 'successNum',
      key: 'successNum',
    },{
      title: '失败条数',
      dataIndex: 'faildNum',
      key: 'faildNum',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '完成时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
    }, {
      title: '状态',
      key: 'state',
      render: (text, record) => (
        <span>
          { record.state < 2 ? (record.state < 1 ? '已导入' : '处理中') : '已处理完成'}
        </span>
      )
    },
  ];

  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  return (
    <div style={{paddingTop: 20}}>
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
};

export default List;
