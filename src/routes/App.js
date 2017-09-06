import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Config, Storage } from '../utils';
import { Layout, Loader } from '../components';
import '../index.less';
import './App.less';
import Error from './Error';

const { Header, Bread, Footer, Sider, styles } = Layout;

const App = ({ children, app, dispatch, loading, location }) => {
	const { user, menu, navOpenKeys } = app;
  const { logo, openPages } = Config;
  let { pathname } = location;
  const current = menu.filter(item => pathToRegexp(item.router || '').exec(pathname));
  const hasPermission = current.length > 0 ? true : false;

  // Head组件 参数集
  const headerProps = {
    menu,
    user,
    logout() {
      dispatch({ type: 'app/logout' });
    },
  };

  // Sider组件 参数集
  const siderProps = {
    menu,
    changeOpenKeys(openKeys) {
      Storage.setStorage('navOpenKeys', openKeys);
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
    navOpenKeys,
  };

  // Bread组件 参数集
  const breadProps = {
    menu,
  };

  // 设置登录页独立加载
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/check']} />
      {children}
    </div>);
  }

  return (
    <div className={styles.layout}>
      <div className={styles.sider}>
        <Sider {...siderProps} />
      </div>
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread {...breadProps} />
        <div className={styles.container}>
          <div className={styles.content}>{hasPermission ? children : <Error />}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
