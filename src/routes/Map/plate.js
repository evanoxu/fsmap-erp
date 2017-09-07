import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Filter from './filter';
import PlateList from './platelist';
import PlateLoad from './plateLoad';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { Config } from '../../utils';

const MapManage = ({ map, dispatch, location, loading }) => {
  const { plist, ppageInfo, plateLoad, isSava, isDelete } = map;
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
    onEdit(id) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          status: Config.plate.add,
          edit: id,
        },
      }));
      // window.location.href = 'http://localhost:3004/map/plate?edit=3667&status=add'
      // dispatch(routerRedux.push({
      //   pathname,
      //   query: {
      //     status: 'add',
      //   },
      // }));      
    },    
    deletePlate(id) {
      dispatch({
        type: 'map/dataPlateCDelete',
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
    isSava,
    isDelete,
    list:plateLoad,
    location,
    savaPlate(id) {
      dispatch({
        type: 'map/dataPlateDrawSave',
        payload: id,
      });
    },
    deletePlate(id) {
      dispatch({
        type: 'map/dataPlateCDelete',
        payload: id,
      });
    }, 
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
      <Tabs activeKey={keys} onTabClick={handleTabClick}>
        <TabPane tab="板块管理" key={Config.plate.list}>
          {
            keys==Config.plate.list &&
            <div>
              <Filter {...filterProps} />
              <PlateList {...listProps} />            
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
