import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Tabs } from 'antd';
import Modal from './imodal';
import List from './ilist';
import Add from './iadd';

const TabPane = Tabs.TabPane;

const Mapimport = ({ map, dispatch, location, loading }) => {
  const { ilist, ipagefo, itype, modalVisible } = map;

  // 基础宽带数据导入块
  const addProps = {
    itype,
    modalVisible,
    onImp(data) {
      dispatch({
        type: 'map/importExcel',
        payload: data,
      });
    },
  };

  // 基础宽带数据导入数据
  const listProps = {
    datass: ilist,
    pagination: ipagefo,
    loading: loading.effects['map/queryiList'],
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
  };

  // 新增单条宽带数据
  const modalProps = {
    itype,
    modalVisible,
    onOk(data) {
      dispatch({
        type: 'map/addData',
        payload: data,
      });
    },
  };

  return (
    <div className="content-inner">
      <Tabs defaultActiveKey="1">
        <TabPane tab="导入基础宽带数据" key="1">
          <Add {...addProps} />
          <List {...listProps} />
        </TabPane>
        <TabPane tab="新增基础宽带数据" key="2">
          <Modal {...modalProps} />
        </TabPane>
      </Tabs>
    </div>
  );
};

Mapimport.PropTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ map, loading }) => ({ map, loading }))(Mapimport);
