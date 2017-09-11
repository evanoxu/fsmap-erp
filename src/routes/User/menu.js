import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Table, Button, Popconfirm } from 'antd';
import { classnames, Storage } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';
import Modal from './mmodal';

const userMenu = ({ user, dispatch, location, loading }) => {
  const { list, pageInfo, pmenus, otype, curItem, modalVisible } = user;

  // 查询名
  const roleSet = (id) => {
    if (id) {
      const ad = pmenus.filter((v) => {
        return v.uid === id;
      });
      if (ad.length > 0) {
        return ad[0].name;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  /* Filter */
  // 查询数据
  const filterProps = {
    pmenus,
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
    pmenus,
    item: otype === 'add' ? {} : curItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/saveMenuData'],
    title: `${otype === 'add' ? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // 根据判断分别提交处理
      if (otype === 'add') {
        dispatch({
          type: 'user/addMenuData',
          payload: data,
        });
      } else {
        dispatch({
          type: 'user/saveMenuData',
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
      type: 'user/editMenuData',
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
      type: 'user/deleteMenuData',
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
      title: '菜单名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属菜单',
      key: 'parentUid',
      render: (text, { parentUid }) => (
        <span>{ parentUid ? roleSet(parentUid) : '无' }</span>
      ),
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    }, {
      title: '路由',
      dataIndex: 'router',
      key: 'router',
    }, {
      title: '显示层级',
      // dataIndex: 'mpid',
      key: 'mpid',
      render: (text, { mpid, parentUid }) => (
        <span>{ parentUid ? (mpid === 1 ? '显示' : '不显示') : '' }</span>
      ),
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

userMenu.PropTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ user, loading }) => ({ user, loading }))(userMenu);
