import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
// import Filter from './filter';

const MapManage = ({ app, msg ,dispatch, location, loading }) => {
  const { list, pageInfo, editInfo, modalVisible } = msg;
  const { pathname } = location;

  const loadingList = loading.effects['msg/actList']

  // 删除按钮
  const handleClick = (id) => {
    dispatch({
      type: 'msg/actDelete',
      payload: {
        uid:id,
        account:app.user.info.account
      },
    })
  }


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
      title: 'banner',
      dataIndex: 'account',
      width:'20%'
    },
    {
      title: '状态',
      dataIndex: 'name',
      width:'10%'
    },
    {
      title: '文件',
      dataIndex: 'telphone',
      width:'10%'
    },                     
    {
      title: '创建者',
      dataIndex: 'uperManageAccount',
      width:'10%'
    },  
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width:'10%'
    },                
    {
      title: '操作',
      key: 'operation',
      render: (text,{state,id}) => (
        <div>
 
            <Popconfirm title="确定删除吗?" onConfirm={handleClick.bind(null, id)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
        </div>  
      ),
      width:'20%'
    },
  ]; 

  // 查询数据
  // const filterProps = {
  //   filter: {
  //     ...location.query,
  //   },
  //   onFilterChange(value) {
  //     const { query, pathname } = location;
  //     dispatch(routerRedux.push({
  //       pathname,
  //       query: {
  //         ...value,
  //         page: 1,
  //         pageSize: query.pageSize,
  //       },
  //     }));
  //   },
  // };

  return (
    <div className="content-inner">  
      <Table
        pagination={pageInfo}
        loading={loadingList}
        columns={columns}
        dataSource={list}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      /> 
    </div>
  );
};

export default connect(({ app,msg,loading }) => ({ app,msg,loading }))(MapManage);
