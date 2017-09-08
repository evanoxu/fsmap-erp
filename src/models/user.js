import { userCheck, userCheckName, userRoleList, userList, userAdd, userEdit, userSave, userDelete, adminRoleList, adminRoleEdit, adminRoleSave, adminRoleDelete, adminMenuRoleList, adminRoleCheck, adminRoleAdd, adminMenuList, adminMenuEdit, adminMenuSave, adminMenuDelete, adminMenuPList, adminMenuCheck, adminMenuAdd } from '../services/user';
import pathToRegexp from 'path-to-regexp';
import { queryURL, Storage } from '../utils';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'user',

  state: {
    // 列表数据
    list: [],
    pageInfo: { current: 1, pageSize: 10, key: '', total: 0, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共有 ${total} 条数据` },
    curItem: {},
    modalVisible: false,
    // 角色列表
    roles: [],
    // 菜单列表
    menus: [],
    // 上级菜单列表
    pmenus: [],
    otype: 'add',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user/manage') {
          // 查询用户角色列表
          dispatch({
            type: 'queryRoleType',
          });
          // 设置初始参数
          let pays = location.query, pages, pagesizes, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'queryList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              key: keyas,
            },
          });
        } else if (location.pathname === '/user/role') {
          // 查询菜单列表
          dispatch({
            type: 'queryMenuType',
          });
          // 设置初始参数
          let pays = location.query, pages, pagesizes, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'queryrList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              key: keyas,
            },
          });
        } else if (location.pathname === '/user/menu') {
          // 查询菜单列表
          dispatch({
            type: 'queryMenuPType',
          });
          // 设置初始参数
          let pays = location.query, pages, pagesizes, keyas;
          pages = pays.page ? Number(pays.page) : 1;
          pagesizes = pays.pageSize ? Number(pays.pageSize) : 10;
          keyas = pays.keys ? String(pays.keys) : '';
          dispatch({
            type: 'querymList',
            payload: {
              currentPage: pages,
              pageSize: pagesizes,
              key: keyas,
            },
          });
        }
      });
    },
  },

  effects: {
    /* manage */
    // 查询用户角色列表
    * queryRoleType({ payload }, { call, put }) {
      const data = yield call(userRoleList, payload);
      if (data.statusCode === 200) {
        let type = [], roles = [];
        for (let i in data) {
          if (!isNaN(Number(i))) {
            type.push(data[i]);
          }
        }
        roles = type.map(function (t, i) {
          const { uid, name } = t;
          const datas = { uid, name };
          return datas;
        });
        yield put({
          type: 'updateState',
          payload: {
            roles,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查询用户数据
    * queryList({ payload }, { call, put }) {
      const data = yield call(userList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
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
    // 获取单条用户数据
    * editUserData({ payload }, { call, put }) {
      const { otype, ids } = payload;
      const data = yield call(userEdit, { id: ids });
      if (data.statusCode === 200) {
        const { id, account, name, roleName, roleUid, state } = data.user;
        const curItem = { id, account, name, roleName, roleUid, state };
        yield put({
          type: 'showModal',
          payload: {
            otype,
            curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存单条用户数据
    * saveUserData({ payload }, { select, call, put }) {
      // 获取id
      const id = yield select(({ user }) => user.curItem.id);
      // 获取创建人
      const lastUpdateName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, id, lastUpdateName };
      const data = yield call(userSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 删除用户数据
    * deleteUserData({ payload }, { call, put }) {
      const data = yield call(userDelete, { data: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 新增用户数据
    * addUserData({ payload }, { call, put }) {
      const data = yield call(userAdd, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* role */
    // 查询菜单列表
    * queryMenuType({ payload }, { call, put }) {
      const data = yield call(adminMenuRoleList, payload);
      if (data.statusCode === 200) {
        let type = [], menus = [];
        for (let i in data) {
          if (i != 'statusMsg' && i != 'statusCode') {
            let datas;
            if (data[i].menus.length == 0) {
              datas = {
                label: data[i].name,
                value: i,
              };
            } else {
              const cdata = data[i].menus;
              let cdatas = [];
              for (let j in cdata) {
                const datass = {
                  label: cdata[j].name,
                  value: cdata[j].uid,
                };
                cdatas.push(datass);
              }
              datas = cdatas;
            }
            type.push(datas);
          }
        }
        menus = [].concat(...type);
        yield put({
          type: 'updateState',
          payload: {
            menus,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查询角色数据
    * queryrList({ payload }, { call, put }) {
      const data = yield call(adminRoleList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
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
    // 获取单条角色数据
    * editRoleData({ payload }, { call, put }) {
      const { otype, ids } = payload;
      const data = yield call(adminRoleEdit, { id: ids });
      if (data.statusCode === 200) {
        const { id, account, name, roleName, roleUid, state } = data.user;
        const curItem = { id, account, name, roleName, roleUid, state };
        yield put({
          type: 'showModal',
          payload: {
            otype,
            curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存单条角色数据
    * saveRoleData({ payload }, { select, call, put }) {
      // 获取id
      const id = yield select(({ user }) => user.curItem.id);
      // 获取创建人
      const lastUpdateName = Storage.getStorage('USERINFO').info.name;
      const newSer = { ...payload, id, lastUpdateName };
      const data = yield call(adminRoleSave, newSer);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryrList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 删除角色数据
    * deleteRoleData({ payload }, { call, put }) {
      const data = yield call(adminRoleDelete, { data: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryrList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 新增角色数据
    * addRoleData({ payload }, { call, put }) {
      const data = yield call(adminRoleAdd, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'queryrList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    /* menu */
    // 查询上级菜单列表
    * queryMenuPType({ payload }, { call, put }) {
      const data = yield call(adminMenuPList, payload);
      if (data.statusCode === 200) {
        let type = [], pmenus = [];
        for (let i in data) {
          if (!isNaN(Number(i))) {
            type.push(data[i]);
          }
        }
        pmenus = type.map(function (t, i) {
          const { uid, name } = t;
          const datas = { uid, name };
          return datas;
        });
        pmenus.push({ name: '无', uid: '' });
        yield put({
          type: 'updateState',
          payload: {
            pmenus,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 查询菜单数据
    * querymList({ payload }, { call, put }) {
      const data = yield call(adminMenuList, payload);
      if (data.statusCode === 200) {
        const { list, pageInfo } = data;
        yield put({
          type: 'updateState',
          payload: {
            list,
            pageInfo: {
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
    // 获取单条菜单数据
    * editMenuData({ payload }, { call, put }) {
      const { otype, ids } = payload;
      const data = yield call(adminMenuEdit, { id: ids });
      if (data.statusCode === 200) {
        const { id, name, uid, parentUid } = data.detail;
        const curItem = { id, name, uid, parentUid };
        yield put({
          type: 'showModal',
          payload: {
            otype,
            curItem,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 保存单条菜单数据
    * saveMenuData({ payload }, { select, call, put }) {
      // 获取id
      const id = yield select(({ user }) => user.curItem.id);
      const data = yield call(adminMenuSave, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'querymList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
        throw data.statusMsg;
      }
    },
    // 删除菜单数据
    * deleteMenuData({ payload }, { call, put }) {
      const data = yield call(adminMenuDelete, { data: payload });
      if (data.statusCode === 200) {
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'querymList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        throw data.statusMsg;
      }
    },
    // 新增菜单数据
    * addMenuData({ payload }, { call, put }) {
      const data = yield call(adminMenuAdd, payload);
      if (data.statusCode === 200) {
        yield put({ type: 'hideModal' });
        // 设置初始参数
        let queryPage = queryURL('page'), pages;
        let queryPageSize = queryURL('pageSize'), pagesizes;
        let queryKeys = queryURL('keys'), keyas;
        pages = queryPage ? Number(queryPage) : 1;
        pagesizes = queryPageSize ? Number(queryPageSize) : 10;
        keyas = queryKeys ? String(queryKeys) : '';
        // 重新请求数据
        yield put({
          type: 'querymList',
          payload: {
            currentPage: pages,
            pageSize: pagesizes,
            key: keyas,
          },
        });
      } else {
        yield put({ type: 'hideModal' });
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
