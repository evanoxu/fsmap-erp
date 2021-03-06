/* global window */
import { logout, userMenus } from '../services/app';
import { Storage, Config } from '../utils';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'app',
  state: {
    user: {},
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: '宽带地图',
      },
    ],
    navOpenKeys: Storage.getStorage('navOpenKeys') || [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // 设置导航展开值
    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
  effects: {
    // 判断是否登录
    * check({ payload }, { put }) {
      const users = Storage.getStorage('USERINFO');
      if (users !== null) {
        const user = users;
        yield put({
          type: 'updateState',
          payload: {
            user,
          },
        });
        yield put({
          type: 'selectMenus',
          payload: {
            account: user.info.account,
          },
        });
        // 判断访问页面 如果是'/'，跳转。
        if (location.pathname === '/') {
          yield put(routerRedux.push({
            pathname: '/map/manage',
          }));
        }
      } else if (Config.openPages && Config.openPages.indexOf(location.pathname) < 0) {
        let from = location.pathname;
        window.location = `${location.origin}/login?from=${from}`;
      }
    },
    // 根据用户名获取菜单
    * selectMenus({ payload }, { call, put }) {
      const data = yield call(userMenus, payload);
      if (data.statusCode === 200) {
        const { menus } = data;
        const menu = menus.map((m) => {
          if (!m.parentUid) {
            return {
              id: m.id,
              icon: m.icon,
              name: m.menuName,
            };
          } else {
            if (m.mpid === 1) {
              return {
                id: m.id,
                bpid: m.parentUid,
                mpid: m.parentUid,
                icon: m.icon,
                name: m.menuName,
                router: m.router,
              };
            } else {
              return {
                id: m.id,
                bpid: m.parentUid,
                mpid: m.mpid,
                icon: m.icon,
                name: m.menuName,
                router: m.router,
              };
            }
          }
        });
        yield put({
          type: 'updateState',
          payload: {
            menu,
          },
        });
      }
    },
    // 退出登录
    * logout({ payload }, { call, put }) {
      const data = yield call(logout);
      if (data.statusCode === 200) {
        Storage.removeStorage('USERINFO');
        yield put({ type: 'check' });
      } else {
        throw data.statusMsg;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname !== '/login') {
          // 页面默认执行 判断是否登录
          dispatch({ type: 'check' });
        }
      });
    },
  },
};
