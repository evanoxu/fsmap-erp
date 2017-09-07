import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Tabs, Table, Button, Popconfirm } from 'antd';
import { classnames, Storage } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';

const TabPane = Tabs.TabPane;

const Mapdetails = ({ map, dispatch, location, loading }) => {
  const { dslist, dspagefo, dstype, dsname } = map;

  // 设置图片列表格式
  const columnp = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    }, {
      title: '图片',
      // dataIndex: 'imgList',
      key: 'imgList',
      render: (text, { imgList }) => (
        <span>{imgList.map((k, i) => (<img key={i} src={k} width="100" height="100" />))}</span>
      ),
    }, {
      title: '创建者',
      dataIndex: 'createName',
      key: 'createName',
      width: 100,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
          <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  // 设置点评列表格式
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '创建者',
      dataIndex: 'createName',
      key: 'createName',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, { id }) => (
        <span>
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
    current: dspagefo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };
  // 设置标题
  const typeName = dstype === '0' ? `${dsname} - 图片管理` : `${dsname} - 点评管理`;
  // 设置参数
  const column = dstype === '0' ? columnp : columns;

  // 删除数据
  const handleDeleteClick = (id) => {
    const account = Storage.getStorage('USERINFO').info.account;
    const data = {
      id,
      ids: dspagefo.id,
      type: dstype,
      account,
    };
    console.log('删除', data);
    dispatch({
      type: 'map/detailDelete',
      payload: data,
    });
  };

  return (
    <div className="content-inner">
      <Tabs defaultActiveKey="1">
        <TabPane tab={typeName} key="1">
          <Table
              pagination={dspagefo}
              className={classnames({ [styles.table]: true })}
              columns={column}
              dataSource={dslist}
              loading={loading.effects['map/detailCommonet']}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
        </TabPane>
      </Tabs>
    </div>
  );
};

Mapdetails.PropTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ map, loading }) => ({ map, loading }))(Mapdetails);
