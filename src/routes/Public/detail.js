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

const PublicDetail = ({ pub, dispatch, location, loading }) => {
  const { dlist, dpagefo, ntype } = pub;

  // 设置大小类
  const pType = ntype.map(function (t) {
    let das = t.typeList.map(function (tt) {
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
  // 显示公共服务分类
  const pTypeFunc = (id) => {
    if (id) {
      const ad = pType.filter(function (v, i) {
        return v.value == id;
      });
      if (ad.length > 0) {
        return ad[0].label;
      }
    } else {
      return '无';
    }
  };
  // 显示公共服务子类
  const pSubTypeFunc = (id, ids) => {
    if (id) {
      const ad = pType.filter(function (v, i) {
        return v.value == id;
      });
      if (ad.length > 0 && ids) {
        const ads = ad[0].children.filter(function (v, i) {
          return v.value == ids;
        });
        if (ads.length > 0) {
          return ads[0].label;
        }
      } else {
        return '无';
      }
    } else {
      return '无';
    }
  };

  // 设置列表格式
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    }, {
      title: '公共服务设施名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '公共服务分类',
      key: 'publicServiceType',
      width: 100,
      render: (text, { publicServiceType }) => (
        <span>{pTypeFunc(publicServiceType)}</span>
      ),
    }, {
      title: '子类',
      key: 'publicServiceSubType',
      width: 100,
      render: (text, { publicServiceType, publicServiceSubType }) => (
        <span>{pSubTypeFunc(publicServiceType, publicServiceSubType)}</span>
      ),
    }, {
      title: '操作',
      key: 'operation',
      width: 140,
      render: (text, { id, showPicAndContent }) => (
        showPicAndContent === 3 ? <span><Link style={{ marginRight: 4 }} to={`/public/detail/0/${id}`}>查看图片</Link><Link to={`/public/detail/1/${id}`}>查看点评</Link></span> : (showPicAndContent === 2 ? <Link to={`/public/detail/1/${id}`}>查看点评</Link> : <Link to={`/public/detail/0/${id}`}>查看图片</Link>)
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
    pType,
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

PublicDetail.PropTypes = {
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ pub, loading }) => ({ pub, loading }))(PublicDetail);
