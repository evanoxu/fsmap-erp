import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
import Modal from './authModal';

const mapType = {
  map: '宽带地图',
  publicService: '公共服务评价'
}

const MapManage = ({ app, evaluate,dispatch, location, loading }) => {
  const { authlist, authpageInfo, editInfo, modalVisible, uper, menus,open} = evaluate;
  const { pathname } = location;
  // 编辑按钮
  const handleEditClick = (obj) => {
    if(obj){
      dispatch({
        type: 'evaluate/updateState',
        payload: {
          editInfo:obj,
          modalVisible:true
        },
      }); 
    }else{
      dispatch({
        type: 'evaluate/updateState',
        payload: {
          editInfo:null,
          modalVisible:true
        },
      });      
    }
  };

  // 删除按钮
  const handleDeleteClick = (id) => {
    dispatch({
      type: 'evaluate/evaUserDelete',
      payload: {
        id,
      },
    })
  }

  // 显示弹窗数据
  const modalProps = {
    open,
    uper,
    menus,
    editInfo,
    visible: modalVisible,
    confirmLoading: loading.effects['evaluate/evaUserSave'],
    title: `${!editInfo? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      console.log(data)
      return false;
      dispatch({
        type: 'evaluate/evaUserSave',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'evaluate/updateState',
        payload: {
          modalVisible:false
        },
      }); 
    },
  };

  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: authpageInfo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  // 设置宽带分类
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width:'5%'
    },
    {
      title: '用户名',
      dataIndex: 'account',
      width:'5%'
    },
    {
      title: '昵称',
      dataIndex: 'name',
      width:'10%'
    },
    {
      title: '联系电话',
      dataIndex: 'telphone',
      width:'10%'
    },
    {
      title: '状态',
      dataIndex: 'state',
      width:'10%',
      render: (text) => (
        <span>{text?'不可用':'可用'}</span>
      ),       
    },
    {
      title: '是否为主管部门',
      dataIndex: 'isUperManage',
      width:'10%',
      render: (text) => (
        <span>{Number(text)?'是':'否'}</span>
      ), 

    },    
    {
      title: '自定义地图权限',
      dataIndex: 'hasMyMap',
      width:'10%',
      render: (text) => (
        <span>{Number(text)?'是':'否'}</span>
      ), 

    },                  
    {
      title: '所属主管部门',
      dataIndex: 'uperManageAccount',
      width:'10%'
    },  
    {
      title: '用户权限',
      dataIndex: 'menus',
      width:'10%'
    },      
    {
      title: '更新时间',
      dataIndex: 'createTime',
      width:'10%',
      render: (text, { lastUpdateDate,createDate }) => (
        <span>
        {lastUpdateDate||createDate}
        </span>
      ),      
    },     
    {
      title: '操作',
      key: 'operation',
      render: (text,obj) => (
        <div>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handleEditClick.bind(null, obj)}>编辑</Button>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, obj.id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </div>
      ),
      width:'10%'
    },
  ];   

	return (
    <div className="content-inner">
      {modalVisible && <Modal {...modalProps} />}    
      <div style={{paddingBottom:'10px',textAlign:'left'}}><Button className="content-btn" type="primary" onClick={handleEditClick.bind(null, null)}>新增</Button></div>
      <Table
        pagination={authpageInfo}
        columns={columns}
        dataSource={authlist}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      /> 
    </div>
	);
};

export default connect(({ app,evaluate,loading }) => ({ app,evaluate,loading }))(MapManage);
