import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Modal from './zmodal';

const TabPane = Tabs.TabPane;

const Zhuanti = ({
  industry,
  dispatch,
  location,
  loading,
}) => {
  const { zlist, zpagefo, ztype, zcurItem, ntype, modalVisible } = industry;
  const { query = {}, pathname } = location;

  // 新增按钮
  const handleAddClick = () => {
    dispatch({
      type: 'industry/showModal',
      payload: {
        ztype: 'add',
      },
    });
  };

  // 编辑按钮
  const handleEditClick = (id) => {
    dispatch({
      type: 'industry/editTypeData',
      payload: {
        ztype: 'update',
        id,
      },
    });
  };

  // 删除按钮
  const handleDeleteClick = (id) => {
    dispatch({
      type: 'industry/deleteTypeData',
      payload: {
        id,
      },
    });
  };

  // 显示弹窗数据
  const modalProps = {
    item: ztype === 'add' ? {} : zcurItem,
    ntype,
    visible: modalVisible,
    confirmLoading: loading.effects['industry/queryzList'],
    title: `${ztype === 'add' ? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // 根据判断分别提交处理
      if (ztype === 'add') {
        dispatch({
          type: 'industry/addTypeData',
          payload: data,
        });
      } else {
        dispatch({
          type: 'industry/saveTypeData',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'industry/hideModal',
      });
    },
  };

  // 切换
  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        status: key,
      },
    }));
  };

  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: zpagefo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  // 设置公共服务分类
  const columnsn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '公共服务分类',
      dataIndex: 'typeName',
      key: 'typeName',
    }, {
      title: '图标（未选中）',
      key: 'typePic',
      render: (text, { typePic }) => (
        <img width="25" height="25" src={typePic} />
      ),
    }, {
      title: '图标（选中）',
      key: 'typePicOn',
      render: (text, { typePicOn }) => (
        <img width="25" height="25" src={typePicOn} />
      ),
    }, {
      title: '定位图标(小)',
      key: 'subSmallPic',
      render: (text, { subSmallPic }) => (
        <img width="32" height="46" src={subSmallPic} />
      ),
    }, {
      title: '定位图标(大)',
      key: 'subBigPic',
      render: (text, { subBigPic }) => (
        <img width="42" height="58" src={subBigPic} />
      ),
    }, {
      title: '创建者',
      dataIndex: 'createName',
      key: 'createName',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
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
      width: 140,
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

  const listProps = {
    pagination: zpagefo,
    onChange(page) {
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

  return (
    <div className="content-inner">
      <Button className="content-btn" type="primary" onClick={handleAddClick}>新增</Button>
      <Tabs activeKey="1" onTabClick={handleTabClick}>
        <TabPane tab="产业类型分类" key="1">
          <Table
            {...listProps}
            className={classnames({ [styles.table]: true })}
            columns={columnsn}
            dataSource={zlist}
            loading={loading.effects['industry/queryzList']}
            rowKey={record => record.id}
            getBodyWrapper={getBodyWrapper}
          />
        </TabPane>
      </Tabs>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

Zhuanti.PropTypes = {
  industry: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ industry, loading }) => ({ industry, loading }))(Zhuanti);

