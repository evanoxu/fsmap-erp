import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
import Filter from './filter';

const MapManage = ({ app, store ,dispatch, location, loading }) => {
  const { list, pageInfo, editInfo, modalVisible } = store;
  const { pathname } = location;


  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: pageInfo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  // 设置宽带分类
  let columns;

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width:'10%'
    },
    {
      title: '内容',
      dataIndex: 'content',
      width:'60%'
    },                   
    {
      title: '创建者',
      dataIndex: 'createName',
      width:'10%'
    },  
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width:'20%'
    },    
  ]; 
 
  const tableProps = {
    dataSource: list,
    columns,
    loading: loading.effects['store/storeNeedsList'],
    pagination: pageInfo,
    onChange(page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
  };

  // 查询数据
  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...value,
          page: 1,
          pageSize: query.pageSize,
        },
      }));
    },
  };

  return (
    <div className="content-inner">  
      <Filter {...filterProps} />
      <Table
        { ...tableProps }
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      /> 
    </div>
  );
};

export default connect(({ app,store,loading }) => ({ app,store,loading }))(MapManage);
