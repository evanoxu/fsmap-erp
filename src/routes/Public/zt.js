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
// 设置分页
const EnumStatus = {
  TYPE: 1,
  SUB: 2,
};

const Zhuanti = ({
  pub,
  dispatch,
  location,
  loading,
}) => {
  const { zlist, zpagefo, zkey, ztype, zcurItem, ntype, modalVisible } = pub;
  const { query = {}, pathname } = location;

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

  // 新增按钮
  const handleAddClick = () => {
    // 设置key值、type值为add
    let zkey;
    if ( typeof(location.query.status) === 'undefined') {
      zkey = '1';
    } else {
      zkey = location.query.status;
    }
    dispatch({
      type: 'pub/showModal',
      payload: {
        zkey,
        ztype: 'add',
      },
    });
  };

  // 编辑按钮
  const handleEditClick = (id) => {
    // 设置key值、type值为update
    let zkey;
    if (typeof(location.query.status) === 'undefined') {
      zkey = '1';
    } else {
      zkey = location.query.status;
    }
    // 根据zkey值查询相关数据
    dispatch({
      type: 'pub/editTypeData',
      payload: {
        zkey,
        ztype: 'update',
        id,
      },
    });
  };

  // 删除按钮
  const handleDeleteClick = (id) => {
    let zkey;
    if (typeof(location.query.status) === 'undefined') {
      zkey = '1';
    } else {
      zkey = location.query.status;
    }
    dispatch({
      type: 'pub/deleteTypeData',
      payload: {
        zkey,
        id,
      },
    });
  };

  // 显示弹窗数据
  const modalProps = {
    item: ztype === 'add' ? {} : zcurItem,
    zkey,
    pType,
    visible: modalVisible,
    confirmLoading: loading.effects['pub/queryzList'],
    title: `${ztype === 'add' ? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // 根据判断分别提交处理
      if (ztype === 'add') {
        dispatch({
          type: 'pub/addTypeData',
          payload: data,
        });
      } else {
        dispatch({
          type: 'pub/saveTypeData',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'pub/hideModal',
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
  // 设置公共服务子类
  const columnsl = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '公共服务分类',
      dataIndex: 'typeName',
      key: 'typeName',
    }, {
      title: '子类',
      dataIndex: 'subTypeName',
      key: 'subTypeName',
    }, {
      title: '图标(未选中)',
      key: 'subTypePic',
      render: (text, { subTypePic }) => (
        <img width="25" height="25" src={subTypePic} />
      ),
    }, {
      title: '图标(选中)',
      key: 'subTypePicOn',
      render: (text, { subTypePicOn }) => (
        <img width="25" height="25" src={subTypePicOn} />
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
      // const { query, pathname } = location;
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
      <Tabs activeKey={query.status === String(EnumStatus.SPEED) ? String(EnumStatus.SPEED) : (query.status === String(EnumStatus.SUB) ? String(EnumStatus.SUB) : String(EnumStatus.TYPE))} onTabClick={handleTabClick}>
        <TabPane tab="公共服务分类" key={String(EnumStatus.TYPE)}>
          <Table
            {...listProps}
            className={classnames({ [styles.table]: true })}
            columns={columnsn}
            dataSource={zlist}
            loading={loading.effects['pub/queryzList']}
            rowKey={record => record.id}
            getBodyWrapper={getBodyWrapper}
          />
        </TabPane>
        <TabPane tab="公共服务子类" key={String(EnumStatus.SUB)}>
          <Table
            {...listProps}
            className={classnames({ [styles.table]: true })}
            columns={columnsl}
            dataSource={zlist}
            loading={loading.effects['pub/queryzList']}
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
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ pub, loading }) => ({ pub, loading }))(Zhuanti);

