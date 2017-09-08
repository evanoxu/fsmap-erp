

import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

import * as services from '../services/evaluate';

export default {

  namespace: 'evaluate',

  state: {
    list: [],
    pageInfo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, query} = location;
        switch (pathname){
          case '/evaluate/map':
            var currentPage, pageSize,mapType='map'
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize,mapType
              },
            });          
          break;
          case '/evaluate/public':
            var currentPage, pageSize,mapType='publicService'
            currentPage = Number(query.page) || 1;
            pageSize = Number(query.pageSize) || 10;
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize,mapType
              },
            });          
          break;         
        }        
      })
    },
  },

  effects: {
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          list:[]
        },
      });      
      const data = yield call(services.evaList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    * evaSetend({ payload }, { call, put }) {
      const data = yield call(services.evaSetend, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize,mapType=payload.mapType;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize,mapType
          },
        });

      } else {
        throw data.statusMsg;
      }
    },    

    * evaDelete({ payload }, { call, put }) {
      const data = yield call(services.evaDelete, payload);
      console
      if (data.statusCode === 200) {
        var currentPage, pageSize,mapType=payload.mapType;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize,mapType
          },
        });
      } else {
        throw data.statusMsg;
      }
    }, 

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
