import { industryTypePage, industryDataFind, industryDataAdd, industryDataEdit, industryDataSave, industryDataDelete, industryImportLogList, industryImportExcel, industryTypeList, industryTypeAdd, industryTypeEidt, industryTypeSave, industryTypeDelete, industryDetailList, industryDetailComment, industryDetailDelete } from '../services/industry';
import pathToRegexp from 'path-to-regexp';
import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'industry',

  state: {
    // 列表数据
    list: [],
    pageInfo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    curItem: {},
    modalVisible: false,
    // 产业类型
    ntype: [],
    // 专题类别
    zlist: [],
    zpagefo: { current: 1, pageSize: 10, total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
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
        // 查询产业类别
        dispatch({
          type: 'queryIndustryType',
        });
        const match = pathToRegexp('/industry/detail/:type/:id').exec(location.pathname);
        if (location.pathname === '/industry/manage') {
          // 设置初始参数
          let pays = location.query, pages, pagesizes, areas, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          areas = pays.area ? Number(pays.area) : -1;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'queryList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              industryType: areas,
              key: keyas,
            },
          });
        } else if (location.pathname === '/industry/import') {
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
        } else if (location.pathname === '/industry/zt') {
          // 设置初始参数
          let pays = location.query, pages, pagesizes;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          dispatch({
            type: 'queryzList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
            },
          });
        } else if (location.pathname === '/industry/detail') {
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
          const mapType = 'industry';
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
    // 查询产业类别
    * queryIndustryType({ payload }, { call, put }) {
      const data = yield call(industryTypePage, payload);
      if (data.statusCode === 200) {
        let type = [], ntype = [];
        for (let i in data) {
          if (!isNaN(Number(i))) {
            type.push(data[i]);
          }
        }
        ntype = type.map(function (t, i) {
          const { typeName, typeValue } = t;
          const datas = { typeName, typeValue };
          return datas;
        });
        ntype.push({typeName: '所有', typeValue: -1});
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
    /* manage */
    // 查询基础数据
    * queryList({ payload }, { call, put }) {
      const data = yield call(industryDataFind, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data.pageList;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              industryType: payload.industryType,
              key: payload.key,
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
      const data = yield call(industryDataEdit, { id: payload });
      if (data.statusCode === 200) {
        const { id, address, areaId, industryName, lnglat, industryType, industryTypeName, orgCode, registNum, registMoney, registState, phoneNum, introduction, setupTime } = data;
        const curItem = { id, address, areaId, industryName, lnglat, industryType, industryTypeName, orgCode, registNum, registMoney, registState, phoneNum, introduction, setupTime };
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
      const id = yield select(({ industry }) => industry.curItem.id);
      // 获取创建人
      const lastUpdateName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, id, lastUpdateName };
      const data = yield call(industryDataSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areas;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areas = queryArea ? Number(queryArea) : -1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            industryType: areas,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 删除基础数据
    * deleteData({ payload }, { call, put }) {
      const data = yield call(industryDataDelete, { id: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryArea = queryURL('area'), areas;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        areas = queryArea ? Number(queryArea) : -1;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            industryType: areas,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    /* import */
    // 查询批量导入基础数据
    * queryiList({ payload }, { call, put }) {
      const data = yield call(industryImportLogList, payload);
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
      const data = yield call(industryImportExcel, payload);
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
      const data = yield call(industryDataAdd, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        window.location.href = '/industry/manage';
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* zt */
    // 查询专题数据
    * queryzList({ payload }, { call, put }) {
      const datas = yield call(industryTypeList, payload);
      if (datas.statusCode === 200) {
        const { list, pageInfo } = datas;
        yield put({
          type: 'updateState',
          payload: {
            zlist: list,
            zpagefo: {
              current: payload.currentPage,
              pageSize: payload.pageSize,
              total: pageInfo.totalRecords,
            },
          },
        });
      } else {
        throw datas.statusMsg;
      }
    },
    // 新增专题管理数据
    * addTypeData({ payload }, { call, put }) {
      const createName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, createName };
      const data = yield call(industryTypeAdd, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/industry/zt'));
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 获取专题管理数据
    * editTypeData({ payload }, { call, put }) {
      const { ztype } = payload;
      const data = yield call(industryTypeEidt, { id: payload.id });
      if (data.statusCode === 200) {
        const { id, typeName, typePic, typePicOn, subSmallPic, subBigPic } = data;
        const curItem = { id, typeName, typePic, typePicOn, subSmallPic, subBigPic };
        yield put({
          type: 'showModal',
          payload: {
            ztype,
            zcurItem: curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存专题管理数据
    * saveTypeData({ payload }, { select, call, put }) {
      const lastUpdateName = Storage.getStorage('USERINFO').info.name;
      // 获取id
      const id = yield select(({ industry }) => industry.zcurItem.id);
      const newSer = { ...payload, id, lastUpdateName };
      const data = yield call(industryTypeSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        yield put(routerRedux.push('/industry/zt'));
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 删除专题管理数据
    * deleteTypeData({ payload }, { call, put }) {
      const data = yield call(industryTypeDelete, payload);
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/industry/zt'));
      } else {
        throw data.statusMsg;
      }
    },
    /* detail */
    // 查询详情数据
    * querydList({ payload }, { call, put }) {
      const data = yield call(industryDetailList, payload);
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
      const data = yield call(industryDetailComment, payload);
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
      const data = yield call(industryDetailDelete, payload);
      if (data.statusCode === 200) {
        yield put(routerRedux.push('/industry/detail/' + type + '/' + ids));
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
