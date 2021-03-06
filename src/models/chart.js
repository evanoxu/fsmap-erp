

import { queryURL, Storage, Config } from '../utils';
import { routerRedux } from 'dva/router';
import * as services from '../services/chart';

const pagepack = Config.pagepack

export default {

  namespace: 'chart',

  state: {
    list: [],
    pageInfo: pagepack,
    editInfo:null,
    modalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, query} = location;
        switch (pathname){
          case '/chart/city':
            var currentPage, pageSize, keys;
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            keys = query.keys || '';
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize,key:keys
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
      const data = yield call(services.chartList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
              ...pagepack,
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



    * chartUpDown({ payload }, { call, put }) {
      const data = yield call(services.chartUpDown, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        keys = queryURL('keys') || '';
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize,key:keys
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * chartDelete({ payload }, { call, put }) {
      const data = yield call(services.chartDelete, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        keys = queryURL('keys') || '';
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize,key:keys
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
