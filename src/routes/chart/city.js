import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
import Filter from './filter';

const MapManage = ({ app, chart ,dispatch, location, loading }) => {
  const { list, pageInfo, editInfo, modalVisible } = chart;
  const { pathname } = location;

  // 上下按钮
  const handleClick = (type,id) => {
    dispatch({
      type: 'chart/chartUpDown',
      payload: {
        type,id,account:app.user.info.account
      },
    })
  }

  const handleDelete = (id) => {
    dispatch({
      type: 'chart/chartDelete',
      payload: {
        id,account:app.user.info.account
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
      width:'5%'
    },
    {
      title: '标题',
      dataIndex: 'name',
      width:'20%'
    },
    {
      title: '文件',
      dataIndex: 'imgUrl',
      width:'20%',
      render: (text) => (
        <div>
          <a style={{ margin: '4px',display:'block' }} target="_blank" href={text} target="_blank"><img src={text} width="100" height="100" /></a>
        </div> 
      ),        
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
    {
      title: '操作',
      key: 'operation',
      render: (text,{state,id}) => (
        <div>
          {
            state==1
            ?  
            <Popconfirm title="确定下架吗?" onConfirm={handleClick.bind(null, '2',id)}>
              <Button type="" style={{ margin: '2px' }}>下架</Button>
            </Popconfirm>
            :
            <Popconfirm title="确定上架吗?" onConfirm={handleClick.bind(null, '1',id)}>
              <Button type="primary" style={{ margin: '2px' }}>上架</Button>
            </Popconfirm>              
          }
          <Popconfirm title="确定删除吗?" onConfirm={handleDelete.bind(null,id)}>
            <Button type="danger" style={{ margin: '2px' }}>删除</Button>
          </Popconfirm>               
        </div>         
      ),
      width:'10%'
    },
  ]; 

  const tableProps = {
    dataSource: list,
    columns,
    loading: loading.effects['chart/queryList'],
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
    placeholder:'请输入你要搜索的标题',
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

export default connect(({ app,chart,loading }) => ({ app,chart,loading }))(MapManage);
