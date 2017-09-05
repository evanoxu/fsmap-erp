import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Filter from './filter';
import List from './list';
import Modal from './modal';

const MapManage = ({ map, dispatch, location, loading }) => {
  const { list, pageInfo, itype, currentItem, modalVisible } = map;

  // 列表数据
  const listProps = {
    datass: list,
    loading: loading.effects['map/queryList'],
    pagination: pageInfo,
    location,
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
    onEditItem(id) {
      dispatch({
        type: 'map/editData',
        payload: id,
      });
    },
    onDeleteItem(id) {
      dispatch({
        type: 'map/deleteData',
        payload: id,
      });
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
          page: query.page,
          pageSize: query.pageSize,
        },
      }));
    },
  };
  // 显示单条编辑数据
  const modalProps = {
    itype,
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['map/saveData'],
    title: '编辑',
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'map/saveData',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'map/hideModal',
      });
    },
  }

	return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
	);
};

MapManage.PropTypes = {
	map: PropTypes.object,
	dispatch: PropTypes.func,
  location: PropTypes.object,
	loading: PropTypes.object,
};


export default connect(({ map, loading }) => ({ map, loading }))(MapManage);
