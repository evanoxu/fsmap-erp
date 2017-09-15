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
  SPEED: 3,
}

const Zhuanti = ({
  map,
  dispatch,
  location,
  loading,
}) => {
  const { zlist, zpagefo, zkey, ztype, zcurItem, modalVisible } = map;
  const { query = {}, pathname } = location;

  // console.log(map);

  // 新增按钮
  const handleAddClick = () => {
    // 设置key值、type值为add
    let zkey;
    if (typeof(location.query.status) === 'undefined') {
      zkey = '1';
    } else {
      zkey = location.query.status;
    }
    dispatch({
      type: 'map/showModal',
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
      type: 'map/editTypeData',
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
      type: 'map/deleteTypeData',
      payload: {
        zkey,
        id,
      },
    })
  }

  // 显示弹窗数据
  const modalProps = {
    item: ztype === 'add' ? {} : zcurItem,
    zkey,
    visible: modalVisible,
    confirmLoading: loading.effects['map/queryzList'],
    title: `${ztype === 'add' ? '新增' : '编辑'}`,
    okText: '提交',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      // 根据判断分别提交处理
      if (ztype === 'add') {
        //console.log('新增');
        dispatch({
          type: 'map/addTypeData',
          payload: data,
        });
      } else {
        //console.log('编辑');
        dispatch({
          type: 'map/saveTypeData',
          payload: data,
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'map/hideModal',
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

  // 设置宽带分类
  const columnsn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '专题名',
      dataIndex: 'typeName',
      key: 'typeName',
    }, {
      title: '图标（未选中）',
      // dataIndex: 'typePic',
      key: 'typePic',
      render: (text, { typePic }) => (
        <img width="25" height="25" src={typePic} />
      ),
    }, {
      title: '图标（选中）',
      // dataIndex: 'typePicOn',
      key: 'typePicOn',
      render: (text, { typePicOn }) => (
        <img width="25" height="25" src={typePicOn} />
      ),
    }, {
      title: '民资运营商',
      // dataIndex: 'serverType',
      key: 'serverType',
      render: (text, { serverType }) => (
        <span>{ serverType ? '是' : '否' }</span>
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
  // 设置连接分类
  const columnsl = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '连接方式',
      dataIndex: 'subTypeName',
      key: 'subTypeName',
    }, {
      title: '连接速率',
      dataIndex: 'speed',
      key: 'speed',
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
  // 设置速率分类
  const columnss = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '名称',
      dataIndex: 'colorName',
      key: 'colorName',
    }, {
      title: '宽带速率',
      dataIndex: 'speed',
      key: 'speed',
    }, {
      title: '颜色',
      // dataIndex: 'color',
      key: 'color',
      render: (text, {color}) => (
        <div style={{ width: 20, height: 20, backgroundColor: `#${color}` }}></div>
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

  return (
    <div className="content-inner">
      <Button className="content-btn" type="primary" onClick={handleAddClick}>新增</Button>
      <Tabs activeKey={query.status === String(EnumStatus.SPEED) ? String(EnumStatus.SPEED) : (query.status === String(EnumStatus.SUB) ? String(EnumStatus.SUB) : String(EnumStatus.TYPE))} onTabClick={handleTabClick}>
        <TabPane tab="宽带专题" key={String(EnumStatus.TYPE)}>
            <Table
              pagination={zpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columnsn}
              dataSource={zlist}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
        </TabPane>
        <TabPane tab="连接方式" key={String(EnumStatus.SUB)}>
            <Table
              pagination={zpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columnsl}
              dataSource={zlist}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
        </TabPane>
        <TabPane tab="宽带速率" key={String(EnumStatus.SPEED)}>
            <Table
              pagination={zpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columnss}
              dataSource={zlist}
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
  map: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
  form: PropTypes.object.isRequired,
};

export default connect(({ map, loading }) => ({ map, loading }))(Zhuanti);

