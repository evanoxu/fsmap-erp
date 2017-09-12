import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './list';
import Filter from './filter';

const mapType = 'map'

const MapManage = ({ app,evaluate,dispatch, location, loading }) => {
  const { list, pageInfo } = evaluate;

  var mapType = 'map'
  if(location.pathname=='/evaluate/public') mapType = 'publicService'
  // 列表数据
  const listProps = {
  	mapType,
    datass: list,
    loading: loading.effects['evaluate/queryList'],
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
        type: 'evaluate/evaSetend',
        payload: {
        	evaNo:id,
        	account:app.user.info.account,
        	mapType
        }
      });
    },
    onDeleteItem(id) {
      dispatch({
        type: 'evaluate/evaDelete',
        payload: {
        	evaNo:id,
        	account:app.user.info.account,
        	mapType        	
        },
      });
    },
  };

  //查询数据
  const filterProps = {
    placeholder:'请输入你要搜索的问题描述',
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
        <Filter {...filterProps}/>
        <List {...listProps} />
    </div>
	);
};

export default connect(({ app,evaluate,loading }) => ({ app,evaluate,loading }))(MapManage);
