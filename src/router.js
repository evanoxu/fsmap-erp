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
