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

const IndustryManage = ({ industry, dispatch, location, loading }) => {
  const { list, pageInfo, ntype, curItem, modalVisible } = industry;

  /* Filter */
  // 查询数据
  const filterProps = {
    ntype,
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

  /* ShowData */
  // 显示单条编辑数据
  const modalProps = {
    ntype,
    item: curItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['industry/saveData'],
    title: '编辑',
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'industry/saveData',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'industry/hideModal',
      });
    },
  };
  // 获取编辑信息
  const handleEditClick = (id) => {
    dispatch({
      type: 'industry/editData',
      payload: id,
    });
  };
  // 删除基础数据
  const handleDeleteClick = (id) => {
    dispatch({
      type: 'industry/deleteData',
      payload: id,
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
      title: '企业',
      dataIndex: 'industryName',
      key: 'industryName',
      width: 100,
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 100,
    }, {
      title: '产业类型',
      dataIndex: 'industryTypeName',
      key: 'industryTypeName',
      width: 100,
    }, {
      title: '电话',
      dataIndex: 'introduction',
      key: 'introduction',
      width: 310,
    }, {
      title: '最后更新者',
      dataIndex: 'lastUpdateName',
      key: 'lastUpdateName',
      width: 100,
    }, {
      title: '最后更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
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
        loading={loading.effects['industry/queryList']}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

IndustryManage.PropTypes = {
  industry: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ industry, loading }) => ({ industry, loading }))(IndustryManage);
