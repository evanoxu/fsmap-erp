import { publicDataType, publicDataFind, publicDataEdit, publicDataDelete, publicDataSave } from '../services/publicManage';

import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'pub',

  state: {
    list: [],
    pageInfo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    curItem: {},
    modalVisible: false,
    // 公共服务类型
    ntype: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 查询公共服务类型
      dispatch({
        type: 'queryPublicType',
      });
      history.listen((location) => {
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
              area: areas,
              subArea: subareas,
              key: keyas,
            },
          });
        }
      });
    },
  },

  effects: {
    // 查询公共服务类型
    * queryPublicType({ payload }, { call, put }) {
      const data = yield call(publicDataType, payload)
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
              typeValue: payload.area,
              subTypeValue: payload.subArea,
              name: payload.key,
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
            area: areas,
            subArea: subareas,
            key: keyas,
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
            area: areas,
            subArea: subareas,
            key: keyas,
          },
        });
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
