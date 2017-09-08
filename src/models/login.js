import { routerRedux } from 'dva/router';
import { login } from '../services/login';
import { queryURL, Storage } from '../utils';

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },
  effects: {
    * login({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      const data = yield call(login, payload);
      console.log(data);
      yield put({ type: 'hideLoginLoading' });
      if (data.statusCode === 200) {
        const token = new Date().getTime() + 24*60*60*1000;
        Storage.setStorage('USERINFO', {info:{'account':data.account,'name':data.name},token});
        const from = queryURL('from');
        if (from) {
          yield put(routerRedux.push(from));
        } else {
          yield put(routerRedux.push('/map/manage'));
        }
      } else {
        throw data.statusMsg;
      }
    },

    * check({
      payload
    }, { put }) {
      const users = Storage.getStorage('USERINFO');
      if (users !== null) {
        yield put(routerRedux.push('/map/manage'));
      }
    },

  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'check' });
    }
  }
};
