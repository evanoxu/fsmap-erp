/* global window */
import { dataList, dataEdit, dataDelete, dataSave, dataNetList } from '../services/mapManage';
import { dataNetAdd, dataImportList, dataImportExcel } from '../services/mapImport';
import { dataTypeList, dataTypeAdd, dataTypeDelete, dataTypeEdit, dataTypeSave, dataSubList, dataSubAdd, dataSubDelete, dataSubEdit, dataSubSave, dataSpeedList, dataSpeedAdd, dataSpeedDelete, dataSpeedEdit, dataSpeedSave } from '../services/mapZt';
import { dataDetailList, dataDetailCommonet, dataDetailDelete } from '../services/mapDetail';
import pathToRegexp from 'path-to-regexp';
import { queryURL, Storage, Config } from '../utils';
import { routerRedux } from 'dva/router';
import * as mapPlate from '../services/mapPlate';

export default {

  namespace: 'map',

  state: {
    // 列表数据
    list: [],
    pageInfo: { current: 1, pageSize: 10, areaId: -1, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    // 弹窗更新
    currentItem: {},
    modalVisible: false,
    // 导入数据
    ilist: [],
    ipagefo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    itype: [{ 'typeName': '中国电信', 'typeValue': 3, 'typeList': [{ 'subTypeName': '光纤入户(FTTH/O)', 'subTypeValue': 2, 'speed': 100 }, { 'subTypeName': '光纤到楼/小区(FTTB) ', 'subTypeValue': 3, 'speed': 20 }, { 'subTypeName': '传统线路 (ADSL)', 'subTypeValue': 1, 'speed': 8 }] }],
    // 专题数据
    zlist: [],
    zpagefo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    zkey: '1',
    ztype: 'add',
    zcurItem: {},
    // 详情数据
    dlist: [],
    dpagefo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    dtype: 0,
    dcurItem: {},
    // 详情内容数据
    dstype: '0',
    dsname: '',
    dslist: [],
    dspagefo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    // 板块数据
    plist: [],
    ppageInfo: { current: 1, pageSize: 10, areaId: -1, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },   
    plateLoad: [], 
    isSava:false,
    isDelete:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // 查询网络数据
        dispatch({
          type: 'queryNetList',
        });
        const path = location.pathname;
        const match = pathToRegexp('/map/detail/:type/:id').exec(location.pathname);
        switch (path){
          case '/map/manage':
            var pays = location.query, pages, pagesizes, areaids, keyas;
            pages = pays.page ? Number(pays.page) : 1;
            pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
            areaids = pays.area ? Number(pays.area) : -1;
            keyas = pays.keys ? String(pays.keys) : '';
            dispatch({
              type: 'queryList',
              payload: {
                currentPage: pages,
                pageSize: pagesizes,
                areaId: areaids,
                key: keyas,
              },
            });          
            break;
          case '/map/import':
            var pays = location.query, pages, pagesizes;
            pages = pays.page ? Number(pays.page) : 1;
            pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
            dispatch({
              type: 'queryiList',
              payload: {
                currentPage: pages,
                pageSize: pagesizes,
              },
            });          
            break;
          case '/map/zt':
            var pays = location.query, statuss, pages, pagesizes;
            statuss = pays.status ? Number(pays.status) : 1;
            pages = pays.page ? Number(pays.page) : 1;
            pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
            dispatch({
              type: 'queryzList',
              payload: {
                status: statuss,
                currentPage: pages,
                pageSize: pagesizes,
              }
            })          
            break; 
          case '/map/detail':
            var pays = location.query, pages, pagesizes, areaids, keyas;
            pages = pays.page ? Number(pays.page) : 1;
            pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
            areaids = pays.area ? Number(pays.area) : -1;
            keyas = pays.keys ? String(pays.keys) : '';
            dispatch({
              type: 'querydList',
              payload: {
                currentPage: pages,
                pageSize: pagesizes,
                key: keyas,                 
              }
            })          
            break;   
          case '/map/plate':
            var pays = location.query, pages, pagesizes, areaids, keyas;
            statuss = pays.status
            if((!statuss)||!Config.plate[statuss]){
              dispatch(routerRedux.push({
                pathname:path,
                query: {
                  status: Config.plate.list
                },
              }));
              return false
            }
            if(statuss=='list'){
              pages = pays.page ? Number(pays.page) : 1;
              pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
              areaids = pays.area ? Number(pays.area) : -1;
              keyas = pays.keys ? String(pays.keys) : '';
              dispatch({
                type: 'queryPList',
                payload: {
                  statuss: statuss,
                  currentPage: pages,
                  pageSize: pagesizes,
                  key: keyas,                
                }
              })
            }else{
              dispatch({
                type: 'plateLoad',
              })              
            }          
            break;                                        
        }
        if (match) {
          // 查看类型 0 = 图片，1 = 点评
          const type = match[1];
          // 查看id
          const id = match[2];
          // 查看类
          const mapType = 'map';
          let pays = location.query, pages, pagesizes;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          // 查询相关信息
          dispatch({
            type: 'detailCommonet',
            payload: {
              type,
              id,
              mapType,
              currentPage: pages,
              pageSize: pagesizes,
            },
          });
        }
      });
    },
  },

  effects: {
    /* manage */
    // 查询网络类型数据
    * queryNetList({}, { call, put }) {
      const data = yield call(dataNetList);
      if (data.statusCode === 200) {
        let itype = [];
        for (let i in data) {
          if (!isNaN(Number(i))) {
            itype.push(data[i]);
          }
        }
        yield put({
          type: 'updateState',
          payload: {
            itype,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查询地图基础数据
    * queryList({ payload }, { call, put }) {
      const data = yield call(dataList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              areaId: payload.areaId,
              key: payload.key,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 获取单条地图详细数据
    * editData({ payload }, { call, put }) {
      const data = yield call(dataEdit, { id: payload });
      if (data.statusCode === 200) {
        const { id, name, address, areaId, nets, lnglat } = data;
        const curItem = { id, name, address, areaId, nets, lnglat };
        yield put({
          type: 'showModal',
          payload: {
            currentItem: curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存单条地图详细数据
    * saveData({ payload }, { select, call, put }) {
      // 获取id
      const id = yield select(({ map }) => map.currentItem.id);
      // 获取创建人
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, id, createName };
      const data = yield call(dataSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areaids;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areaids = queryArea ? Number(queryArea) : -1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            areaId: areaids,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 删除地图数据
    * deleteData({ payload }, { call, put }) {
      const data = yield call(dataDelete, { ids: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areaids;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areaids = queryArea ? Number(queryArea) : -1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            areaId: areaids,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 新增单条地图详细数据
    * addData({ payload }, { call, put }) {
      yield put({ type: 'showModal' });
      // 获取创建人
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, createName };
      const data = yield call(dataNetAdd, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // yield put(routerRedux.push('/map/manage'));
        window.location.href = '/map/manage';
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* import */
    // 查询地图基础数据
    * queryiList({ payload }, { call, put }) {
      const data = yield call(dataImportList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            ilist: list,
            ipagefo: {
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
    // 导入地图数据
    * importExcel({ payload }, { call, put }) {
      yield put({ type: 'showModal' });
      const data = yield call(dataImportExcel, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 重新请求数据
        /*yield put({
          type: 'queryiList',
          payload: {
            currentPage: 1,
            pageSize: 10,
          },
        });*/
        window.location.reload();
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* zt */
    // 查询专题数据
    * queryzList({ payload }, { call, put }) {
      // console.log(payload);
      const { status, currentPage, pageSize } = payload;
      const pld = {
        currentPage,
        pageSize,
      };
      let datas;
      if (status === 1) {
        datas = yield call(dataTypeList, pld);
      } else if (status === 2) {
        datas = yield call(dataSubList, pld);
      } else {
        datas = yield call(dataSpeedList, pld);
      }
      if (datas.statusCode === 200) {
        const { list, pageInfo } = datas;
        yield put({
          type: 'upDateZsuc',
          payload: {
            zlist: list,
            zpagefo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else if (datas.statusCode === 201) {
        yield put({
          type: 'upDateZsuc',
          payload: {
            zlist: [],
            zpagefo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              total: 0,
            },
          },
        });
      } else {
        throw datas.statusMsg;
      }
    },
    // 新增专题管理数据
    * addTypeData({ payload }, { call, put }) {
      const { zkey } = payload;
      let data;
      if (zkey === '1') {
        data = yield call(dataTypeAdd, payload);
      } else if (zkey === '2') {
        data = yield call(dataSubAdd, payload);
      } else {
        data = yield call(dataSpeedAdd, payload);
      }
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/map/zt?status='+zkey));
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 获取专题管理数据
    * editTypeData({ payload }, { call, put }) {
      const { zkey, ztype } = payload;
      if (zkey === '1') {
        const data = yield call(dataTypeEdit, { id: payload.id });
        if (data.statusCode === 200) {
          const { id, typeName, typePic, typePicOn, serverType } = data;
          const curItem = { id, typeName, typePic, typePicOn, serverType };
          yield put({
            type: 'showModal',
            payload: {
              zkey,
              ztype,
              zcurItem: curItem,
            },
          });
        } else {
          throw data.statusMsg;
        }
      } else if (zkey === '2') {
        const data = yield call(dataSubEdit, { id: payload.id });
        if (data.statusCode === 200) {
          const { id, subTypeName, speed } = data;
          const curItem = { id, subTypeName, speed };
          yield put({
            type: 'showModal',
            payload: {
              zkey,
              ztype,
              zcurItem: curItem,
            },
          });
        } else {
          throw data.statusMsg;
        }
      } else {
        const data = yield call(dataSpeedEdit, { id: payload.id });
        if (data.statusCode === 200) {
          const { id, color, colorName, speed } = data;
          const curItem = { id, color, colorName, speed };
          yield put({
            type: 'showModal',
            payload: {
              zkey,
              ztype,
              zcurItem: curItem,
            },
          });
        } else {
          throw data.statusMsg;
        }
      }
    },
    // 保存专题管理数据
    * saveTypeData({ payload }, { select, call, put }) {
      const { zkey } = payload;
      // 获取id
      const id = yield select(({ map }) => map.zcurItem.id);
      const newSer = { ...payload, id };
      let data;
      if (zkey === '1') {
        data = yield call(dataTypeSave, newSer);
      } else if (zkey === '2') {
        data = yield call(dataSubSave, newSer);
      } else {
        data = yield call(dataSpeedSave, newSer);
      }
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/map/zt?status='+zkey));
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 删除专题管理数据
    * deleteTypeData({ payload }, { call, put }) {
      const { zkey } = payload;
      let data;
      if (zkey === '1') {
        data = yield call(dataTypeDelete, payload);
      } else if (zkey === '2') {
        data = yield call(dataSubDelete, payload);
      } else {
        data = yield call(dataSpeedDelete, payload);
      }
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/map/zt?status='+zkey));
      } else {
        throw data.statusMsg;
      }
    },
    /* detail */
    // 查询详情数据
    * querydList({ payload }, { call, put }) {
      const data = yield call(dataDetailList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            dlist: list,
            dpagefo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              key: payload.key,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查看图片或点评数据
    * detailCommonet({ payload }, { call, put }) {
      const data = yield call(dataDetailCommonet, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo, refName } = data;
        const dslist = list;
        const dsname = refName;
        yield put({
          type: 'showModal',
          payload: {
            dslist,
            dstype: payload.type,
            dsname,
            dspagefo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              type: payload.type,
              id: payload.id,
              mapType: payload.mapType,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 删除图片或点评数据
    * detailDelete({ payload }, { call, put }) {
      const { type, ids } = payload;
      const data = yield call(dataDetailDelete, payload);
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/map/detail/' + type + '/' + ids));
      } else {
        throw data.statusMsg;
      }
    },
    /* plate */
    * queryPList({ payload }, { call, put }) {
      const data = yield call(mapPlate.dataPlateList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            plist:list,
            ppageInfo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              areaId: payload.areaId,
              key: payload.key,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    * plateLoad({ }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          plateLoad: [],
          isSava:false,
          isDelete:false,
        },
      });      
      const data = yield call(mapPlate.dataPlateLoad);
      if (data.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            plateLoad: data.list
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    * dataPlateDrawSave({payload}, { call, put }) { 
      yield put({
        type: 'updateState',
        payload: {
          isSava:false,
          isDelete:false,
        },
      });         
      const data = yield call(mapPlate.dataPlateDrawSave,payload);
      if (data.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            isSava: data,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    * dataPlateCDelete({payload}, { call, put }) { 
      var status = queryURL('status')      
      if(status=='add'){    
        yield put({
          type: 'updateState',
          payload: {
            isSava:false,
            isDelete:false,
          },
        });         
      }
      const data = yield call(mapPlate.dataPlateCDelete,payload);
      if (data.statusCode === 200) {
        if(status=='list'){
          yield put({
            type: 'queryPList',
            payload: {
              currentPage: queryURL('page')||1,
              pageSize: queryURL('pageSize')||10,
              key: queryURL('keys')||'',
            },
          });          
        }else{
          yield put({
            type: 'updateState',
            payload: {
              isDelete: true,
            },
          });
        }
      } else {
        throw data.statusMsg;
      }
    },     

  },

  reducers: {
    // 更新宽带基础数据到state
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    // 显示弹出层
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },

    // 隐藏弹出层
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },

    // 更新覆盖专题数据
    upDateZsuc(state, { payload }) {
      // console.log(payload)
      const { zlist, zpagefo } = payload;
      return {
        ...state,
        zlist,
        zpagefo: {
          ...state.zpagefo,
          ...zpagefo,
        },
      };
    },
  },

};
