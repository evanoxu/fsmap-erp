import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Filter from './filter';
import List from './platelist';
import PlateLoad from './plateLoad';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { Config } from '../../utils';


const MapManage = ({ map, dispatch, location, loading }) => {
  const { plist, ppageInfo, plateLoad } = map;
  const { query = {}, pathname } = location;
  const keys = query.status;
  // 列表数据
  const listProps = {
    datass: plist,
    loading: loading.effects['map/queryPList'],
    pagination: ppageInfo,
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
          status: query.status,
        },
      }));
    },
  };

  const PlateLoadProps = {
    list:plateLoad
  }
  // 切换
  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        status: key,
      },
    }));
  }
  return (
    <div className="content-inner">
      <Tabs defaultActiveKey={keys} onTabClick={handleTabClick}>
        <TabPane tab="板块管理" key={Config.plate.list}>
          {
            keys==Config.plate.list &&
            <div>
              <Filter {...filterProps} />
              <List {...listProps} />            
            </div>
          }
        </TabPane>
        <TabPane tab="划分板块" key={Config.plate.add}>
          {
            keys==Config.plate.add &&
            <div>
              <PlateLoad {...PlateLoadProps} />          
            </div>
          }        
        </TabPane>
      </Tabs>
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
