/* global window */
import { logout } from '../services/app';
import { Storage, Config } from '../utils';

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
      }
    },
  },
  effects: {
    // 判断是否登录
    * check({ payload }, { put }) {
      const users = Storage.getStorage('USERINFO');
      if (users !== null) {
        let menu = Config.menus;
        let user = users;
        yield put({
          type: 'updateState',
          payload: {
            user,
            menu,
          },
        });
      } else if (Config.openPages && Config.openPages.indexOf(location.pathname) < 0) {
        // let from = location.pathname;
        window.location = `${location.origin}/login?from=/map/manage`;
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
