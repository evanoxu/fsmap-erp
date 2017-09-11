import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
import Filter from './filter';
import Modal from './actModal';

const MapManage = ({ app, msg ,dispatch, location, loading }) => {
  const { list, pageInfo, editInfo, modalVisible } = msg;
  const { pathname } = location;

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

  // 打开弹窗 
  const handleSave = (obj) => {
    if(obj){
      dispatch({
        type: 'msg/updateState',
        payload: {
          editInfo:obj,
          modalVisible:true
        },
      }); 
    }else{
      dispatch({
        type: 'msg/updateState',
        payload: {
          editInfo:null,
          modalVisible:true
        },
      });      
    }
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
      title: '图片',
      dataIndex: 'imgUrl',
      width:'20%',
      render: (text) => (
        <div>
          <img src={`${text}`}/>
        </div>  
      ),       
    },
    {
      title: '图片URL',
      dataIndex: 'linkUrl',
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
      width:'10%'
    },  
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width:'10%'
    },               
    {
      title: '更新者',
      dataIndex: 'lastUpdateName',
      width:'10%'
    },  
    {
      title: '更新时间',
      dataIndex: 'lastUpdateDate',
      width:'10%'
    },                 
    {
      title: '操作',
      key: 'operation',
      render: (text,obj) => (
        <div>
            <Button type="primary" style={{ margin: '0 2px' }} onClick={handleSave.bind(null, obj)}>编辑</Button>
            <Popconfirm title="确定删除吗?" onConfirm={handleClick.bind(null, obj.id)}>
              <Button type="danger" style={{ margin: '0 2px' }}>删除</Button>
            </Popconfirm>
        </div>
      ),
      width:'20%'
    },
  ]; 

  // 显示弹窗数据
  const modalProps = {
    editInfo,
    visible: modalVisible,
    confirmLoading: loading.effects['msg/actSave'],
    title: `${!editInfo? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      console.log(data)
      return false;
      dispatch({
        type: 'msg/actSave',
        payload: {
          uid:id,
          account:app.user.info.account
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'msg/updateState',
        payload: {
          modalVisible:false
        },
      }); 
    },
  };

  //查询数据
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
    onAdd() {
      handleSave()
    },    
  };

  const tableProps = {
    dataSource: list,
    columns,
    loading: loading.effects['msg/actList'],
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

  return (
    <div className="content-inner">  
      {modalVisible && <Modal {...modalProps} />}    
      <Filter {...filterProps}/>
      <Table
        { ...tableProps }
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      /> 
    </div>
  );
};

export default connect(({ app,msg,loading }) => ({ app,msg,loading }))(MapManage);
