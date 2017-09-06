import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';
import Modal from './dmodal';


const TabPane = Tabs.TabPane;

const PublicDetail = ({ pub, dispatch, location, loading }) => {
  const { dlist, dpagefo, dtype, dcurItem, ntype, modalVisible } = pub;

  // 设置大小类
  const pType = ntype.map(function (t, i) {
    let das = t.typeList.map(function(tt, i) {
      const { subTypeName, subTypeValue, id } = tt;
      const datas = {
        'label': subTypeName,
        'value': subTypeValue,
        'ids': id,
      };
      return datas;
    });
    return {
      'label': t.typeName,
      'value': t.typeValue,
      'children': das,
    };
  });

  const pTypeFunc = (id) => {
    if (id) {
      const ad = pType.filter(function (v, i) {
        return v.value == id;
      });
      return ad[0].label;
    } else {
      return '无';
    }
  };
  const pSubTypeFunc = (id, ids) => {
    if (id) {
      const ad = pType.filter(function (v, i) {
        return v.value == id;
      });
      if (ids) {
        const ads = ad[0].children.filter(function (v, i) {
          return v.value == ids;
        });
        return ads[0].label;
      } else {
        return '无';
      }
    } else {
      return '无';
    }
  };
  
  // 显示弹窗数据
  const modalProps = {
    item: dcurItem,
    dtype,
    visible: modalVisible,
    confirmLoading: loading.effects['pub/detailCommonet'],
    title: `${dtype === 0 ? '查看图片' : '查看点评'}`,
    wrapClassName: 'vertical-center-modal',
    onOk() {
      dispatch({
        type: 'pub/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'pub/hideModal',
      });
    },
  };

  // 设置列表格式
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '公共服务设施名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '公共服务分类',
      // dataIndex: 'publicServiceType',
      key: 'publicServiceType',
      render: (text, {publicServiceType}) => (
        <span>{pTypeFunc(publicServiceType)}</span>
      ),
    }, {
      title: '子类',
      // dataIndex: 'publicServiceSubType',
      key: 'publicServiceSubType',
      render: (text, { publicServiceType, publicServiceSubType }) => (
        <span>{pSubTypeFunc(publicServiceType, publicServiceSubType)}</span>
      ),
    }, {
      title: '更新者',
      dataIndex: 'lastUpdateName',
      key: 'lastUpdateName',
    }, {
      title: '更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handlePhotoClick.bind(null,id)}>查看图片</Button>
          <Button type="primary" onClick={handleCommentClick.bind(null,id)}>查看点评</Button>
        </span>
      ),
    },
  ];

  // 获取图片信息
  const handlePhotoClick = (id) => {
    const data = {
      type: 0,
      pageSize: 10,
      currentPage: 1,
      mapType: 'publicService',
      id,
    };
    dispatch({
      type: 'pub/detailCommonet',
      payload: data,
    });
  };

  // 获取点评信息
  const handleCommentClick = (id) => {
    const data = {
      type: 1,
      pageSize: 10,
      currentPage: 1,
      mapType: 'publicService',
      id,
    };
    dispatch({
      type: 'pub/detailCommonet',
      payload: data,
    });
  };
  
  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: dpagefo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  const details = true;

  // 查询数据
  const filterProps = {
    pType,
    details,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...value,
          page: query.page,
          pageSize: query.pageSize,
        },
      }));
    },
  };
  return (
    <div className="content-inner">
      <Tabs defaultActiveKey="1">
        <TabPane tab="用户发布内容管理" key="1">
          <Filter {...filterProps} />
          <Table
              pagination={dpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columns}
              dataSource={dlist}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
            {modalVisible && <Modal {...modalProps} />}
        </TabPane>
      </Tabs>
    </div>
  );
};

PublicDetail.PropTypes = {
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ pub, loading }) => ({ pub, loading }))(PublicDetail);
