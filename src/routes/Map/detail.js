import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';
import Modal from './dmodal';


const TabPane = Tabs.TabPane;

const Mapdetail = ({ map, dispatch, location, loading }) => {
  const { dlist, dpagefo, dtype, dcurItem, modalVisible } = map;
  console.log(dpagefo)
  // 列表数据
  
  // 显示弹窗数据
  const modalProps = {
    item: dcurItem,
    dtype,
    visible: modalVisible,
    confirmLoading: loading.effects['map/detailCommonet'],
    title: `${dtype === 0 ? '查看图片' : '查看点评'}`,
    wrapClassName: 'vertical-center-modal',
    onOk() {
      dispatch({
        type: 'map/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'map/hideModal',
      });
    },
  };

  // 设置列表格式
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'tag',
      key: 'tag',
    }, {
      title: '标注时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handlePhotoClick.bind(null,id)}>查看图片</Button>
          <Button type="primary" onClick={handleCommentClick.bind(null,id)}>查看点评</Button>
        </span>
      ),
    },
  ];

  // 获取图片信息
  const handlePhotoClick = (id) => {
    const data = {
      type: 0,
      pageSize: 10,
      currentPage: 1,
      mapType: 'map',
      id,
    };
    dispatch({
      type: 'map/detailCommonet',
      payload: data,
    });
  };

  // 获取点评信息
  const handleCommentClick = (id) => {
    const data = {
      type: 1,
      pageSize: 10,
      currentPage: 1,
      mapType: 'map',
      id,
    };
    dispatch({
      type: 'map/detailCommonet',
      payload: data,
    });
  };
  
  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: dpagefo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  // 查询数据
  const filterProps = {
    hide:{
      city:true
    },    
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="用户发布内容管理" key="1">
          <Filter {...filterProps} />
          <Table
              pagination={dpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columns}
              dataSource={dlist}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
            {modalVisible && <Modal {...modalProps} />}
        </TabPane>
      </Tabs>
    </div>
  );
};

Mapdetail.PropTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ map, loading }) => ({ map, loading }))(Mapdetail);
