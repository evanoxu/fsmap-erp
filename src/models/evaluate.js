

import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

import * as services from '../services/evaluate';

export default {

  namespace: 'evaluate',

  state: {
    //评价列表
    list: [],
    pageInfo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    //问题分类
    prolist:[],
    propageInfo:{ current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    editInfo:null,
    modalVisible: false,
    //用户权限
    authlist:[],
    authpageInfo:{ current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    uper: [],
    menus: [],
    menusId: [],
    open: []
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
          case '/evaluate/auth':
            dispatch({
              type: 'evaUserTop',
            });  
            dispatch({
              type: 'evaUsermenus',
            });                    
            var currentPage, pageSize;
            currentPage = Number(query.page) || 1;
            pageSize = Number(query.pageSize) || 10;
            dispatch({
              type: 'evaUserList',
              payload: {
                currentPage,pageSize
              },
            });          
          break;           
          case '/evaluate/problem':
            var currentPage, pageSize;
            currentPage = Number(query.page) || 1;
            pageSize = Number(query.pageSize) || 10;
            dispatch({
              type: 'queryProList',
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

    * queryProList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          prolist:[]
        },
      });      
      const data = yield call(services.evaProbList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            prolist:list,
            propageInfo: {
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


    * evaProbEdit({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          editInfo:null
        },
      });      
      const data = yield call(services.evaProbEdit, payload);
      if (data.statusCode === 200) {
        const {mapType,id,subTypeName} = data
        var query = {
          mapType,id,subTypeName
        }
        yield put({
          type: 'updateState',
          payload: {
            editInfo:query,
            modalVisible: true
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * evaProbSave({ payload }, { call, put }) {     
      const data = yield call(services.evaProbSave, payload);
      if (data.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible:false,
            editInfo:null
          },
        }); 
        var currentPage, pageSize;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryProList',
          payload: {
            currentPage,pageSize
          },
        }); 
      } else {
        throw data.statusMsg;
      }
    },

    * evaProbDelete({ payload }, { call, put }) {     
      const data = yield call(services.evaProbDelete, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'queryProList',
          payload: {
            currentPage,pageSize
          },
        }); 
      } else {
        throw data.statusMsg;
      }
    },

    
    * evaUserTop({}, { call, put }) {
      const data = yield call(services.evaUserTop);
      if (data.statusCode === 200) {
        const { list } = data;
        yield put({
          type: 'updateState',
          payload: {
            uper:list
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * evaUsermenus({}, { call, put }) {
      const data = yield call(services.evaUsermenus);
      if (data.statusCode === 200) {
        const { ditu,gonggong } = data;
        var menus = []
        var menusId = {}
        var map = [];
        var open = [];
        const loop = data => data.map((item) => {
          map.push({
            name: item.typeName,
            id : item.id
          })
          menusId[item.id] = item.typeName
        });
        loop(ditu)

        menus[0] = {
          typeName: '宽带地图',
          id : '-1',
          childList: ditu
        }
        open.push('-1')

        var pub = []
        const looppub = data => data.map((item,i) => {
          if (item.childList&&item.childList.length) {
            looppub(item.childList)
            open.push(String(item.id))
          }else{
            menusId[item.id] = item.typeName||item.subTypeName
          }
        });

        looppub(gonggong)

        menus[1] = {
          typeName: '公共服务评价',
          id : '-2',
          childList: gonggong
        }

        open.push('-2')

        yield put({
          type: 'updateState',
          payload: {
            menus:menus,
            menusId:menusId,
            open:open,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },


    * evaUserList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          authlist:[]
        },
      });      
      const data = yield call(services.evaUserList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            authlist:list,
            authpageInfo: {
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


    * evaUserEdit({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          editInfo:null
        },
      });      
      const data = yield call(services.evaUserEdit, payload);
      if (data.statusCode === 200) {
        const {id,account,password,name,telphone,state,isUperManage,uperManageAccount,menus,hasMyMap} = data.userMsg
        var query = {
          id,account,password,name,telphone,state,isUperManage,uperManageAccount,menus,hasMyMap
        }
        yield put({
          type: 'updateState',
          payload: {
            editInfo:query,
            modalVisible: true
          },
        });
      } else {
        throw data.statusMsg;
      }
    },

    * evaUserSave({ payload }, { call, put }) {     
      const data = yield call(services.evaUserSave, payload);
      if (data.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible:false,
            editInfo:null
          },
        }); 
        var currentPage, pageSize;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'evaUserList',
          payload: {
            currentPage,pageSize
          },
        }); 
      } else {
        throw data.statusMsg;
      }
    },

    * evaUserDelete({ payload }, { call, put }) {     
      const data = yield call(services.evaUserDelete, payload);
      if (data.statusCode === 200) {
        var currentPage, pageSize;
        currentPage = Number(queryURL('page') || 1)
        pageSize = Number(queryURL('pageSize') || 10)
        yield put({
          type: 'evaUserList',
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
