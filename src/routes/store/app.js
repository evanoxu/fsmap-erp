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

  // 上下架按钮
  const handleClick = (UDtype,id) => {
    dispatch({
      type: 'store/storeUpDown',
      payload: {
        type:mapType,id,UDtype,account:app.user.info.account
      },
    })
  }

  //  删除按钮
  const handleDelete = (id) => {
    dispatch({
      type: 'store/storeNeedsDelete',
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

  if(mapType==1){
    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:'10%'
      },
      {
        title: '应用/网站名',
        dataIndex: 'appName',
        width:'10%'
      },
      {
        title: '应用/网站图标',
        dataIndex: 'appPic',
        width:'10%',
        render: (text) => (
          <div>
            <img src={`${text}`}/>
          </div>  
        ),        
      },
      {
        title: '截图',
        dataIndex: 'appImgsList',
        width:'10%'
      },
      {
        title: '简介',
        dataIndex: 'appIntroduce',
        width:'10%',      
      },
      {
        title: '链接',
        dataIndex: 'appUrl',
        width:'10%',
        render: (text) => (
          <div>
            <a target="_blank" href={`${text}`}>{text}</a>
          </div>  
        ),        
      },                      
      {
        title: '创建者',
        dataIndex: 'createName',
        width:'5%'
      },  
      {
        title: '创建时间',
        dataIndex: 'createDate',
        width:'10%'
      }, 
      {
        title: '更新者',
        dataIndex: 'lastUpdateName',
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
              state==1
              ?  
              <Popconfirm title="确定下架吗?" onConfirm={handleClick.bind(null, '2',id)}>
                <Button type="danger">下架</Button>
              </Popconfirm>
              :
              <Popconfirm title="确定上架吗?" onConfirm={handleClick.bind(null, '1',id)}>
                <Button type="primary">上架</Button>
              </Popconfirm>              
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
        dataIndex: 'appName',
        width:'10%'
      },     
      {
        title: '需求说明',
        dataIndex: 'appName2',
        width:'20%'
      }, 
      {
        title: '附件',
        dataIndex: 'appName3',
        width:'10%'
      }, 
      {
        title: '图片',
        dataIndex: 'appName4',
        width:'20%'
      },                                 
      {
        title: '创建者',
        dataIndex: 'createName',
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
        render: (text,{id,uid}) => (
          <div>
            <Link to={`/store/needs/${uid}`}>查看回帖</Link>
            <Popconfirm title="确定删除吗?" onConfirm={handleDelete.bind(null, id)}>
              <Button type="danger" style={{ margin: '0 2px' }}>删除</Button>
            </Popconfirm>            
          </div>  
        ),
        width:'20%'
      },
    ]; 

  }  

  const tableProps = {
    dataSource: list,
    columns,
    loading: loading.effects['store/queryList'],
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
