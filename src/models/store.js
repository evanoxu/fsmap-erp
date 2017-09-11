
import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';
import * as services from '../services/store';
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'store',

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
        const match = pathToRegexp('/store/needs/:id').exec(pathname);
        switch (pathname){
          case '/store/app':
            var currentPage, pageSize, keys, type = 1
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            keys = query.keys || '';
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize,type,key:keys
              },
            });          
          break;
          case '/store/needs':
            var currentPage, pageSize, keys, type = 2
            currentPage = Number(query.page || 1);
            pageSize = Number(query.pageSize || 10);
            keys = query.keys || '';
            dispatch({
              type: 'queryList',
              payload: {
                currentPage,pageSize,type,key:keys
              },
            });         
          break;                   
        } 

        if (match) {
          var currentPage, pageSize, keys, uid = match[1], type = 2;
          currentPage = Number(query.page || 1);
          pageSize = Number(query.pageSize || 10);
          keys = query.keys || '';
          dispatch({
            type: 'storeNeedsList',
            payload: {
              currentPage,pageSize,type,uid,key:keys
            },
          }); 
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
      const data = yield call(services.storeList, payload);
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



    * storeUpDown({ payload }, { call, put }) {
      const data = yield call(services.storeUpDown, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys, type=payload.type;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        keys = queryURL(keys) || '';
        yield put({
          type: 'queryList',
          payload: {
            currentPage,pageSize,type,key:keys
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * storeNeedsList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          list:[]
        },
      });      
      const data = yield call(services.storeNeedsList, payload);
      if (data.statusCode === 200) {

        const { communicate } = data;
        const { list, pageInfo } = communicate;
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


    * storeNeedsDelete({ storeNeedsDelete }, { call, put }) {
      const data = yield call(services.storeUpDown, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize, keys;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        keys = queryURL(keys) || '';
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
