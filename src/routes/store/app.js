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

  var mapType = '1'
  if(location.pathname=='/store/needs') mapType = '2'

  const loadingList = loading.effects['store/queryList']

  // 删除按钮
  const handleClick = (type,id) => {
    dispatch({
      type: 'store/storeUpDown',
      payload: {
        type,id,account:app.user.info.account
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

  if(mapType==1){
    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:'10%'
      },
      {
        title: '应用/网站名',
        dataIndex: 'account',
        width:'10%'
      },
      {
        title: '应用/网站图标',
        dataIndex: 'name',
        width:'10%'
      },
      {
        title: '截图',
        dataIndex: 'telphone',
        width:'10%'
      },
      {
        title: '简介',
        dataIndex: 'state',
        width:'10%',      
      },
      {
        title: '链接',
        dataIndex: 'isUperManage',
        width:'10%',
      },                      
      {
        title: '创建者',
        dataIndex: 'uperManageAccount',
        width:'5%'
      },  
      {
        title: '创建时间',
        dataIndex: 'createDate',
        width:'10%'
      }, 
      {
        title: '更新者',
        dataIndex: 'updateAccount',
        width:'5%'
      },  
      {
        title: '更新时间',
        dataIndex: 'lastUpdateDate',
        width:'10%'
      },                
      {
        title: '操作',
        key: 'operation',
        render: (text,{state,id}) => (
          <div>
            {
              state
              ?  
              <Popconfirm title="确定上架吗?" onConfirm={handleClick.bind(null, '1',id)}>
                <Button type="danger">上架</Button>
              </Popconfirm>
              :
              <Popconfirm title="确定下架吗?" onConfirm={handleClick.bind(null, '2',id)}>
                <Button type="danger">下架</Button>
              </Popconfirm>
            }
            {
              <Link to={`/store/needs/${id}`}>查看详情</Link>
            }
          </div>  
        ),
        width:'10%'
      },
    ]; 
  }else{

    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:'10%'
      },
      {
        title: '标题名',
        dataIndex: 'account',
        width:'20%'
      },
      {
        title: '状态',
        dataIndex: 'name',
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
        width:'20%'
      },                 
      {
        title: '操作',
        key: 'operation',
        render: (text,{state}) => (
          <div>
            {
              state
              ?  
              <Popconfirm title="确定上架吗?" onConfirm={handleClick.bind(null, '1')}>
                <Button type="danger">上架</Button>
              </Popconfirm>
              :
              <Popconfirm title="确定下架吗?" onConfirm={handleClick.bind(null, '2')}>
                <Button type="danger">下架</Button>
              </Popconfirm>
            }
          </div>  
        ),
        width:'30%'
      },
    ]; 

  }  

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

export default connect(({ app,store,loading }) => ({ app,store,loading }))(MapManage);
