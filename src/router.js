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
        {
          path: 'evaluate/map/',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/map'));
            }, 'evaluatemap');
          },
        },
        {
          path: 'evaluate/public/',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/public'));
            }, 'evaluatepublic');
          },
        },
        {
          path: 'evaluate/auth/',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/auth'));
            }, 'evaluateauth');
          },
        },
        {
          path: 'evaluate/problem/',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/evaluate'));
              cb(null, require('./routes/evaluate/problem'));
            }, 'evaluateproblem');
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
