import { publicDataType, publicDataFind, publicDataEdit, publicDataDelete, publicDataSave } from '../services/publicManage';
import { publicImportLogList, publicImportExcel } from '../services/publicImport';
import { publicTypeList, publicTypeEidt, publicTypeSave, publicTypeDelete, publicTypeCheck, publicTypeAdd, publicTypeUpPic, publicSubTypeList, publicSubTypeEdit, publicSubTypeSave, publicSubTypeDelete, publicTypePage, publicSubTypeCheck, publicTypePicList, publicSubTypeAdd } from '../services/publicZt';
import { publicDetailList, publicDetailComment, publicDetailDelete } from '../services/publicDetail';
import pathToRegexp from 'path-to-regexp';
import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'pub',

  state: {
    // 列表数据
    list: [],
    pageInfo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    curItem: {},
    modalVisible: false,
    // 公共服务类型
    ntype: [],
    // 专题类别
    zlist: [],
    zpagefo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    zkey: '1',
    ztype: 'add',
    zcurItem: {},
    // 详情数据
    dlist: [],
    dpagefo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    dcurItem: {},
    // 详情内容数据
    dstype: '0',
    dsname: '',
    dslist: [],
    dspagefo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // 查询公共服务类型
        dispatch({
          type: 'queryPublicType',
        });
        const match = pathToRegexp('/public/detail/:type/:id').exec(location.pathname);
        if (location.pathname === '/public/manage') {
          // 设置初始参数
          let pays = location.query, pages, pagesizes, areas, subareas, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          areas = pays.area ? Number(pays.area) : 1;
          subareas = pays.subArea ? Number(pays.subArea) : 1;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'queryList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              typeValue: areas,
              subTypeValue: subareas,
              name: keyas,
            },
          });
        } else if (location.pathname === '/public/import') {
          // 设置初始参数
          let pays = location.query, pages, pagesizes;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          dispatch({
            type: 'queryiList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
            },
          });
        } else if (location.pathname === '/public/zt') {
          // 设置初始参数
          let pays = location.query, statuss, pages, pagesizes;
          statuss = pays.status ? Number(pays.status) : 1;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          dispatch({
            type: 'queryzList',
            payload: {
              status: statuss,
              currentPage: pages,
              pageSize: pagesizes,
            },
          });
        } else if (location.pathname === '/public/detail') {
          // 设置初始参数
          let pays = location.query, pages, pagesizes, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'querydList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              key: keyas,
            },
          });
        } else if (match) {
          // 查看类型 0 = 图片，1 = 点评
          const type = match[1];
          // 查看id
          const id = match[2];
          // 查看类
          const mapType = 'publicService';
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
    // 查询公共服务类型
    * queryPublicType({ payload }, { call, put }) {
      const data = yield call(publicDataType, payload);
      if (data.statusCode === 200) {
        let type = [], ntype = [];
        for (let i in data) {
          if (!isNaN(Number(i))) {
            type.push(data[i]);
          }
        }
        ntype = type.map(function (t, i) {
          const { typeName, typeValue, typeList } = t;
          const datas = { typeName, typeValue, typeList };
          return datas;
        });
        yield put({
          type: 'updateState',
          payload: {
            ntype,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查询基础数据
    * queryList({ payload }, { call, put }) {
      const data = yield call(publicDataFind, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data.pageList;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              typeValue: payload.typeValue,
              subTypeValue: payload.subTypeValue,
              name: payload.name,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 获取单条基础数据
    * editData({ payload }, { call, put }) {
      const data = yield call(publicDataEdit, { id: payload });
      if (data.statusCode === 200) {
        const { id, name, address, publicServiceType, publicServiceSubType, introduction, phoneNumber, officeTime, linkUrl, lnglat } = data;
        const curItem = { id, name, address, publicServiceType, publicServiceSubType, introduction, phoneNumber, officeTime, linkUrl, lnglat };
        yield put({
          type: 'showModal',
          payload: {
            curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存单条基础数据
    * saveData({ payload }, { select, call, put }) {
      // 获取id
      const id = yield select(({ pub }) => pub.curItem.id);
      // 获取创建人
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, id, createName };
      const data = yield call(publicDataSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areas;
        let querySubArea = queryURL('subArea'), subareas;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areas = queryArea ? Number(queryArea) : 1;
        subareas = querySubArea ? Number(querySubArea) : 1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            typeValue: areas,
            subTypeValue: subareas,
            name: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 删除基础数据
    * deleteData({ payload }, { call, put }) {
      const data = yield call(publicDataDelete, { id: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areas;
        let querySubArea = queryURL('subArea'), subareas;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areas = queryArea ? Number(queryArea) : 1;
        subareas = querySubArea ? Number(querySubArea) : 1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            typeValue: areas,
            subTypeValue: subareas,
            name: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    /* import */
    // 查询批量导入基础数据
    * queryiList({ payload }, { call, put }) {
      const data = yield call(publicImportLogList, payload);
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
    // 批量导入基础数据
    * importExcel({ payload }, { call, put }) {
      yield put({ type: 'showModal' });
      const data = yield call(publicImportExcel, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 重新请求数据
        window.location.reload();
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 新增单条地图详细数据
    * addData({ payload }, { call, put }) {
      yield put({ type: 'showModal' });
      // 获取创建人
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, createName };
      const data = yield call(publicDataSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        window.location.href = '/public/manage';
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* zt */
    // 查询专题数据
    * queryzList({ payload }, { call, put }) {
      const { status, currentPage, pageSize } = payload;
      const pld = {
        currentPage,
        pageSize,
      };
      let datas;
      if (status === 1) {
        datas = yield call(publicTypeList, pld);
      } else if (status === 2) {
        datas = yield call(publicSubTypeList, pld);
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
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, createName };
      let data;
      if (zkey === '1') {
        data = yield call(publicTypeAdd, newSer);
      } else if (zkey === '2') {
        data = yield call(publicSubTypeAdd, newSer);
      }
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/public/zt?status='+zkey));
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 获取专题管理数据
    * editTypeData({ payload }, { call, put }) {
      const { zkey, ztype } = payload;
      if (zkey === '1') {
        const data = yield call(publicTypeEidt, { id: payload.id });
        if (data.statusCode === 200) {
          const { id, typeName, typePic, typePicOn, subSmallPic, subBigPic } = data;
          const curItem = { id, typeName, typePic, typePicOn, subSmallPic, subBigPic };
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
        const data = yield call(publicSubTypeEdit, { id: payload.id });
        if (data.statusCode === 200) {
          const { id, typeName, typeValue, subTypeName, subTypePic, subTypePicOn, subSmallPic, subBigPic } = data;
          const curItem = { id, typeName, typeValue, subTypeName, subTypePic, subTypePicOn, subSmallPic, subBigPic };
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
      const lastUpdateName = Storage.getStorage('USERINFO').info.name;
      // 获取id
      const id = yield select(({ pub }) => pub.zcurItem.id);
      const newSer = { ...payload, id, lastUpdateName };
      let data;
      if (zkey === '1') {
        data = yield call(publicTypeSave, newSer);
      } else if (zkey === '2') {
        data = yield call(publicSubTypeSave, newSer);
      }
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/public/zt?status='+zkey));
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
        data = yield call(publicTypeDelete, payload);
      } else if (zkey === '2') {
        data = yield call(publicSubTypeDelete, payload);
      }
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/public/zt?status='+zkey));
      } else {
        throw data.statusMsg;
      }
    },
    /* detail */
    // 查询详情数据
    * querydList({ payload }, { call, put }) {
      const data = yield call(publicDetailList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        const dlist = list;
        yield put({
          type: 'updateState',
          payload: {
            dlist,
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
      const data = yield call(publicDetailComment, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo, refName } = data;
        const dslist = list;
        const dsname = refName;
        yield put({
          type: 'updateState',
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
      const data = yield call(publicDetailDelete, payload);
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/public/detail/' + type + '/' + ids));
      } else {
        throw data.statusMsg;
      }
    },
  },

  reducers: {
    // 更新基础数据到state
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    // 更新覆盖专题数据
    upDateZsuc(state, { payload }) {
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
  },

};
