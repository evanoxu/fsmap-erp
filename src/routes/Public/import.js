import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Upload, Button, Icon, Row, Col, message, Tabs, Table, Cascader } from 'antd';
import { classnames, APIPath } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import styles from './list.less';
import Modal from './imodal';

const TabPane = Tabs.TabPane;

const PublicImport = ({
  pub, 
  dispatch, 
  location, 
  loading, 
}) => {
  const { list, pageInfo, ntype, modalVisible } = pub;

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

  /* add */
  // 设置默认上传资料
  let propsList = {};
  // 设置上传回调数据
  const handleChange = (info) => {
    let filesList = info.file;
    if (filesList.status == 'done') {
      const { data } = filesList.response;
      propsList = {
        ...propsList,
        excelUrl: data,
      };
    }
  };
  const handleRemove = () => {
    propsList = {
      ...propsList,
      excelUrl: '',
    };
  };
  const handleUpload = (file) => {
    const isType = file.name.split('.');
    if (isType[isType.length-1] != 'xls') {
      message.error('上传文件格式有误，请重新选择');
      return false;
    } else {
      return true;
    }
  };
  // 设置公共服务类型
  const handleSChange = (value) => {
    propsList = {
      ...propsList,
      serverId: value,
    };
  };
  // 设置导入数据
  const handleClick = () => {
    if (Object.keys(propsList).length < 2) {
      message.error('请先填写相关数据');
    } else {
      dispatch({
        type: 'pub/importExcel',
        payload: propsList,
      });
    }
  };
  const propss = {
    action: APIPath.PUBLICIMPORTUPEXCEL,
    onChange: handleChange,
    beforeUpload: handleUpload,
  };

  /* list */
  // 批量基础数据
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
  // 批量基础数据参数
  const columns = [
    {
      title: '标识',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户名',
      dataIndex: 'createName',
      key: 'createName',
    }, {
      title: '总条数',
      dataIndex: 'totalNum',
      key: 'totalNum',
    }, {
      title: '已处理条数',
      dataIndex: 'successNum',
      key: 'successNum',
    }, {
      title: '失败条数',
      dataIndex: 'faildNum',
      key: 'faildNum',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '完成时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
    }, {
      title: '状态',
      key: 'state',
      render: (text, record) => (
        <span>
          { record.state < 2 ? (record.state < 1 ? '已导入' : '处理中') : '已处理完成'}
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

  /* addmodal */
  // 信息
  const modalProps = {
    pType,
    modalVisible,
    onOk(data) {
      dispatch({
        type: 'pub/addData',
        payload: data,
      });
    },
  };

  return (
    <div className="content-inner">
      <Tabs defaultActiveKey="1">
        <TabPane tab="导入基础公共服务数据" key="1">
          <Row style={{ paddingBottom: 20 }}>
            <Col span={7}>
              公共服务类别：
              <Cascader 
                style={{ width: '70%' }} 
                options={pType} 
                placeholder="选择公共服务类别" 
                onChange={handleSChange}
              />
            </Col>
            <Col span={2}>
              <Upload {...propss} onRemove={handleRemove}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Col>
            <Col span={4}>
              <Button type="primary" loading={modalVisible} onClick={handleClick}>导入</Button>
            </Col>
          </Row>
          <Table
            {...listProps}
            className={classnames({ [styles.table]: true })}
            columns={columns}
            dataSource={list}
            loading={loading.effects['pub/queryiList']}
            rowKey={record => record.id}
            getBodyWrapper={getBodyWrapper}
          />
        </TabPane>
        <TabPane tab="新增基础公共服务数据" key="2">
          <Modal {...modalProps} />
        </TabPane>
      </Tabs>
    </div>
  );
};

PublicImport.PropTypes = {
  pub: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
};


export default connect(({ pub, loading }) => ({ pub, loading }))(PublicImport);
