import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Table } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Filter from './filter';

const TabPane = Tabs.TabPane;

const Mapdetail = ({ map, dispatch, location, loading }) => {
  const { dlist, dpagefo } = map;

  // 设置列表格式
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'tag',
      key: 'tag',
    }, {
      title: '可显示级别',
      dataIndex: 'levels',
      key: 'levels',
    }, {
      title: '操作',
      key: 'operation',
      width: 140,
      render: (text, { id, showPicAndContent }) => (
        showPicAndContent === 3 ? <span><Link style={{ marginRight: 4 }} to={`/map/detail/0/${id}`}>查看图片</Link><Link to={`/map/detail/1/${id}`}>查看点评</Link></span> : (showPicAndContent === 2 ? <Link to={`/map/detail/1/${id}`}>查看点评</Link> : <Link to={`/map/detail/0/${id}`}>查看图片</Link>)
      ),
    },
  ];
  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: dpagefo.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };
  const listProps = {
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

  // 查询数据
  const filterProps = {
    hide:{
      city:true
    },    
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...value,
          page: 1,
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
              {...listProps}
              pagination={dpagefo}
              className={classnames({ [styles.table]: true })}
              columns={columns}
              dataSource={dlist}
              loading={loading.effects['pub/querydList']}
              rowKey={record => record.id}
              getBodyWrapper={getBodyWrapper}
            />
        </TabPane>
      </Tabs>
    </div>
  );
};

Mapdetail.PropTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ map, loading }) => ({ map, loading }))(Mapdetail);
