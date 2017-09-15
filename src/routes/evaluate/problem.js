import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';
import Filter from './filter';
import Modal from './problemModal';

const mapType = {
  map: '宽带地图',
  publicService: '公共服务评价'
}

const MapManage = ({ app, evaluate,dispatch, location, loading }) => {
  const { prolist, propageInfo, editInfo, modalVisible } = evaluate;
  const { pathname } = location;

  // 编辑按钮
  const handleEditClick = (id) => {
    if(id){
      dispatch({
        type: 'evaluate/evaProbEdit',
        payload: {
          id,
        },
      });
    }else{
      dispatch({
        type: 'evaluate/updateState',
        payload: {
          modalVisible:true
        },
      });      
    }
  };

  // 删除按钮
  const handleDeleteClick = (id) => {
    dispatch({
      type: 'evaluate/evaProbDelete',
      payload: {
        id,
      },
    })
  }

  // 显示弹窗数据
  const modalProps = {
    editInfo,
    visible: modalVisible,
    confirmLoading: loading.effects['evaluate/evaProbSave'],
    title: `${!editInfo? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'evaluate/evaProbSave',
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
    current: propageInfo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  // 设置宽带分类
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width:'10%'
    },
    {
      title: '所属板块',
      dataIndex: 'mapType',
      width:'10%',
      render: (text) => (
        <span>
        {
          mapType[text]
        }
        </span>
      ),       
    },
    {
      title: '问题类型',
      dataIndex: 'subTypeName',
      width:'20%'
    },   
    {
      title: '更新账号',
      dataIndex: 'createName',
      width:'20%',
      render: (text, { lastUpdateName }) => (
        <span>
        {lastUpdateName||text}
        </span>
      ),      
    },       
    {
      title: '更新时间',
      dataIndex: 'createDate',
      width:'20%',
      render: (text, { lastUpdateDate }) => (
        <span>
        {lastUpdateDate||text}
        </span>
      ),      
    }, 
    {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <div>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handleEditClick.bind(null, id)}>编辑</Button>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </div>
      ),
      width:'25%'
    },
  ];   
  //查询数据
  const filterProps = {
    placeholder:'请输入你要搜索的问题类型',
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
      handleEditClick()
    },       
  };



	return (
    <div className="content-inner">
      {modalVisible && <Modal {...modalProps} />}    
      <Filter {...filterProps}/>
      <Table
        pagination={propageInfo}
        columns={columns}
        dataSource={prolist}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      /> 
    </div>
	);
};

export default connect(({ app,evaluate,loading }) => ({ app,evaluate,loading }))(MapManage);
