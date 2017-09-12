import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Table, Button, Popconfirm } from 'antd';
import { classnames, Storage } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';
import Modal from './modal';

const userManage = ({ user, dispatch, location, loading }) => {
  const { list, pageInfo, roles, otype, curItem, modalVisible } = user;

  /* Filter */
  // 查询数据
  const filterProps = {
    roles,
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
    onAdd(type) {
      const otype = type;
      dispatch({
        type: 'user/showModal',
        payload: {
          otype,
        },
      });
    },
  };

  /* ShowData */
  // 显示单条编辑数据
  const modalProps = {
    roles,
    item: otype === 'add' ? {} : curItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/saveUserData'],
    title: `${otype === 'add' ? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // 根据判断分别提交处理
      if (otype === 'add') {
        dispatch({
          type: 'user/addUserData',
          payload: data,
        });
      } else {
        dispatch({
          type: 'user/saveUserData',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      });
    },
  };
  // 获取编辑信息
  const handleEditClick = (id) => {
    const ids = id;
    dispatch({
      type: 'user/editUserData',
      payload: {
        otype: 'update',
        ids,
      },
    });
  };
  // 删除基础数据
  const handleDeleteClick = (id) => {
    const account = Storage.getStorage('USERINFO').info.account;
    const data = {
      id,
      account,
    };
    dispatch({
      type: 'user/deleteUserData',
      payload: data,
    });
  };

  /* List */
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '用户名',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属角色',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '状态',
      key: 'state',
      render: (text, { state }) => (
        <span>{ state === 1 ? '不可用' : '可用' }</span>
      ),
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 140,
    }, {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime',
      width: 140,
    }, {
      title: '操作',
      width: 140,
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Button type="primary" style={{ marginRight: 4 }} onClick={handleEditClick.bind(null, id)}>编辑</Button>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
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
        loading={loading.effects['user/queryList']}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

userManage.PropTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ user, loading }) => ({ user, loading }))(userManage);
