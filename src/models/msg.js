

import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';
import * as services from '../services/msg';

export default {

  namespace: 'msg',

  state: {
    list: [],
    pageInfo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    editInfo:null,
    modalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, query} = location;
        switch (pathname){
          case '/msg/admin':
            var currentPage, pageSize
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize
              },
            });          
          break;
          case '/msg/act':
            var currentPage, pageSize
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            dispatch({
              type: 'actList',
              payload: {
                currentPage,pageSize
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
      const data = yield call(services.msgList, payload);
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

    * msgSave({ payload }, { call, put }) {
      const data = yield call(services.msgSave, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * msgDelete({ payload }, { call, put }) {
      const data = yield call(services.msgDelete, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    

    * actList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          list:[]
        },
      });      
      const data = yield call(services.actList, payload);
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

    * actSave({ payload }, { call, put }) {
      const data = yield call(services.actSave, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'actList',
          payload: {
            currentPage,pageSize
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * actDelete({ payload }, { call, put }) {
      const data = yield call(services.actDelete, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'actList',
          payload: {
            currentPage,pageSize
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
