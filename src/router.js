import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Redirect } from 'dva/router';

import App from './routes/App';


const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const Routers = ({ history, app }) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/map'));
          cb(null, { component: require('./routes/Map/manage') });
        }, 'mapmanage');
      },
      childRoutes: [
        {
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'));
              cb(null, require('./routes/Login/'));
            }, 'login');
          },
        },
        {
          path: 'map/manage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/manage'));
            }, 'mapmanage');
          },
        },
        {
          path: 'map/import',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/import'));
            }, 'mapimport');
          },
        },
        {
          path: 'map/zt',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/zt'));
            }, 'mapzt');
          },
        },
        {
          path: 'map/detail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/detail'));
            }, 'mapdetail');
          },
        },
        {
          path: 'map/detail/:type/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/details'));
            }, 'mapdetails');
          },
        },
        {
          path: 'map/plate',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/map'));
              cb(null, require('./routes/Map/plate'));
            }, 'mapplate');
          },
        },
        {
          path: 'public/manage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/public'));
              cb(null, require('./routes/Public/manage'));
            }, 'publicmanage');
          },
        },
        {
          path: 'public/import',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/public'));
              cb(null, require('./routes/Public/import'));
            }, 'publicimport');
          },
        },
        {
          path: 'public/zt',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/public'));
              cb(null, require('./routes/Public/zt'));
            }, 'publiczt');
          },
        },
        {
          path: 'public/detail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/public'));
              cb(null, require('./routes/Public/detail'));
            }, 'publicdetail');
          },
        },
        {
          path: 'public/detail/:type/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/public'));
              cb(null, require('./routes/Public/details'));
            }, 'publicdetails');
          },
        },
        {
          path: 'industry/manage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/industry'));
              cb(null, require('./routes/Industry/manage'));
            }, 'industrymanage');
          },
        },
        {
          path: 'industry/import',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/industry'));
              cb(null, require('./routes/Industry/import'));
            }, 'industryimport');
          },
        },
        {
          path: 'industry/zt',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/industry'));
              cb(null, require('./routes/Industry/zt'));
            }, 'industryzt');
          },
        },
        {
          path: 'industry/detail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/industry'));
              cb(null, require('./routes/Industry/detail'));
            }, 'industrydetail');
          },
        },
        {
          path: 'industry/detail/:type/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/industry'));
              cb(null, require('./routes/Industry/details'));
            }, 'industrydetails');
          },
        },

        // 4.智慧应用商店
        {
          path: 'store/app',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store'));
              cb(null, require('./routes/store/app'));
            }, 'store/app');
          },
        },    
        {
          path: 'store/needs',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store'));
              cb(null, require('./routes/store/app'));
            }, 'store/needs');
          },
        }, 

        {
          path: 'store/needs/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store'));
              cb(null, require('./routes/store/needs'));
            }, 'store/needs/detail');
          },
        },

        // 5.城市大数据
        {
          path: 'chart/city',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/chart'));
              cb(null, require('./routes/chart/city'));
            }, 'chart/city');
          },
        }, 


        // 6.服务评价                    
        {
          path: 'evaluate/map',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/map'));
            }, 'evaluatemap');
          },
        },
        {
          path: 'evaluate/public',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/map'));
            }, 'evaluatepublic');
          },
        },
        {
          path: 'evaluate/auth',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/auth'));
            }, 'evaluateauth');
          },
        },
        {
          path: 'evaluate/problem',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/problem'));
            }, 'evaluateproblem');
          },
        },

        // 7.消息管理
        {
          path: 'msg/login-act',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/msg'));
              cb(null, require('./routes/msg/act'));
            }, 'msg/act');
          },
        },
        {
          path: 'msg/store-act',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/msg'));
              cb(null, require('./routes/msg/act'));
            }, 'msg/act');
          },
        },                 
        {
          path: 'msg/admin',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/msg'));
              cb(null, require('./routes/msg/admin'));
            }, 'msg/admin');
          },
        }, 

        {
          path: 'user/manage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/User/manage'));
            }, 'usermanage');
          },
        },
        {
          path: 'user/role',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/User/role'));
            }, 'userrole');
          },
        },
        {
          path: 'user/menu',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/User/menu'));
            }, 'usermenu');
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
};


Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
