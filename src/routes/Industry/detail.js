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

const IndustryDetail = ({ industry, dispatch, location, loading }) => {
  const { dlist, dpagefo, ntype } = industry;

  // 设置列表格式
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    }, {
      title: '企业',
      dataIndex: 'industryName',
      key: 'industryName',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '产业类型',
      dataIndex: 'industryTypeName',
      key: 'industryTypeName',
    }, {
      title: '标注者',
      dataIndex: 'createName',
      key: 'createName',
      width: 100,
    }, {
      title: '标注时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 100,
    }, {
      title: '操作',
      key: 'operation',
      width: 140,
      render: (text, { id, showPicAndContent }) => (
        showPicAndContent === 3 ? <span><Link style={{ marginRight: 4 }} to={`/industry/detail/0/${id}`}>查看图片</Link><Link to={`/industry/detail/1/${id}`}>查看点评</Link></span> : (showPicAndContent === 2 ? <Link to={`/industry/detail/1/${id}`}>查看点评</Link> : <Link to={`/industry/detail/0/${id}`}>查看图片</Link>)
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

  const details = true;

  // 查询数据
  const filterProps = {
    ntype,
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

IndustryDetail.PropTypes = {
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ industry, loading }) => ({ industry, loading }))(IndustryDetail);
