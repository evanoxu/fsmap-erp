import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const MapManage = ({ dispatch, location, loading }) => {

	return (
    <div className="content-inner">
        auth
    </div>
	);
};

export default connect(({ loading }) => ({ loading }))(MapManage);
