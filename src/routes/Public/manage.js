import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';
import Modal from './modal';

const PublicManage = ({ pub, dispatch, location, loading }) => {
  const { list, pageInfo, ntype, curItem, modalVisible } = pub;

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

  // 查询数据
  const filterProps = {
    pType,
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

  // 显示单条编辑数据
  const modalProps = {
    pType,
    item: curItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['pub/saveData'],
    title: '编辑',
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'pub/saveData',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'pub/hideModal',
      });
    },
  };

  // 列表数据
  const listProps = {
    pagination: pageInfo,
    onChange(page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
  };
  // 设置列表参数
  const columns = [
    {
      title: '自动编号',
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
      title: '办事指南',
      dataIndex: 'introduction',
      key: 'introduction',
    }, {
      title: '电话',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    }, {
      title: '办公时间',
      dataIndex: 'officeTime',
      key: 'officeTime',
    }, {
      title: '直达链接',
      dataIndex: 'linkUrl',
      key: 'linkUrl',
    }, {
      title: '最后更新者',
      dataIndex: 'lastUpdateName',
      key: 'lastUpdateName',
    }, {
      title: '最后更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handleEditClick.bind(null,id)}>编辑</Button>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  // 获取编辑信息
  const handleEditClick = (id) => {
    dispatch({
      type: 'pub/editData',
      payload: id,
    });
  };
  // 删除基础数据
  const handleDeleteClick = (id) => {
    dispatch({
      type: 'pub/deleteData',
      payload: id,
    });
  };
  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: pageInfo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <Table
        {...listProps}
        className={classnames({ [styles.table]: true })}
        columns={columns}
        dataSource={list}
        loading={loading.effects['pub/queryList']}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

PublicManage.PropTypes = {
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ pub, loading }) => ({ pub, loading }))(PublicManage);