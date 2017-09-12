import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import { classnames } from '../../utils';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
// import styles from './list.less';

export const EVALUATIONSTATUS = {
    '-1' : {
      name : '全部评价',
      color: 'red'
    }, 
    '0' : {
      name : '待处理',
      color: '#ffebcd',
      font: '#ff9d03'
    }, 
    '1' : {
      name : '处理中',
      color: '#d6e7ff',
      font: '#3385ff'
    }, 
    '2' : {
      name : '待确定',
      color: '#d8f4ed',
      font: '#3ec8a6'
    }, 
    '3' : {
      name : '待评价',
      color: '#ffebcd',
      font: '#ff9d03'
    },
    '4' : {
      name : '待回复',
      color: 'red'
    }, 
    '5' : {
      name : '已完成',
      color: '#f8f9fb',
      font: '#333333'
    }, 
    '7' : {
      name : '用户申述',
      color: '#fdd9d9',
      font: '#f64141'
    },  
    '8' : {
      name : '运营商申述',
      color: '#fdd9d9',
      font: '#f64141'
    }                               
}

const List = ({ mapType, datass, location, loading, onDeleteItem, onEditItem, ...tableProps }) => {
  var columns
  if(mapType=='map'){
    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:'10%'
      },
      {
        title: '用户账号',
        dataIndex: 'userAccount',
        width:'10%'
      },
      {
        title: '申述地点',
        dataIndex: 'complainAddress',
        width:'10%'
      },
      {
        title: '网络类型',
        dataIndex: 'netCategoryStr',
        width:'10%'
      },
      {
        title: '问题类型',
        dataIndex: 'problemType',
        width:'10%'
      },
      {
        title: '问题描述',
        dataIndex: 'problemDescription',
        width:'10%'
      },
      {
        title: '图片',
        dataIndex: 'evaPics', 
        render: (text) => (
          <span>
          {
            text&&text.length
            ?
            text.map((k, i) => 
              (<a style={{ margin: '4px',display:'block' }} target="_blank" key={i} href={k} target="_blank"><img src={k} width="100" height="100" /></a>)
            )
            :
            '无'
          }
          </span>  
        ),
        width:'10%'          
      }, 
      {
        title: '问题状态',
        dataIndex: 'status',
        render: (text, { status }) => (
          <span>{EVALUATIONSTATUS[status]['name']}</span>
        ),
        width:'20%'      
      },               
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, { id,evaluationNo}) => (
          <span>
            <Popconfirm title="确定完成吗?" onConfirm={handleEditClick.bind(null, evaluationNo)}>
              <Button  style={{ margin: '2px' }} type="primary">完成</Button>
            </Popconfirm>          
            <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, evaluationNo)}>
              <Button style={{ margin: '2px' }} type="danger">删除</Button>
            </Popconfirm>
          </span>
        ),
        width:'10%'
      },
    ];
  }else{
    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:'10%'
      },
      {
        title: '用户账号',
        dataIndex: 'userAccount',
        width:'10%'
      },
      {
        title: '问题地点',
        dataIndex: 'complainAddress',
        width:'10%'
      },
      {
        title: '问题类型',
        dataIndex: 'problemType',
        width:'10%'
      },
      {
        title: '问题描述',
        dataIndex: 'problemDescription',
        width:'10%'
      },
      {
        title: '图片',
        dataIndex: 'evaPics', 
        render: (text) => (
          <span>
          {
            text&&text.length
            ?
            text.map((k, i) => 
              (<a style={{ margin: '4px',display:'block' }} target="_blank" key={i} href={k} target="_blank"><img src={k} width="100" height="100" /></a>)
            )
            :
            '无'
          }
          </span>  
        ),
        width:'20%'          
      },  
      {
        title: '问题状态',
        dataIndex: 'status',
        render: (text, { status }) => (
          <span>{EVALUATIONSTATUS[status]['name']}</span>
        ), 
        width:'10%'     
      },               
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, { id,evaluationNo}) => (
          <span>
            <Popconfirm title="确定完成吗?" onConfirm={handleEditClick.bind(null, evaluationNo)}>
              <Button  style={{ marginRight: 4 }} type="primary">完成</Button>
            </Popconfirm>          
            <Popconfirm title="确定删除吗?" onConfirm={handleDeleteClick.bind(null, evaluationNo)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </span>
        ),
        width:'20%'
      },
    ];   
  }


  // 获取编辑信息
  const handleEditClick = (id) => {
    onEditItem(id);
  }

  // 删除地图基础数据
  const handleDeleteClick = (id) => {
     onDeleteItem(id);
  };

  // 设置页面数据
  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };
  const getBodyWrapper = (body) => {
    return <AnimTableBody {...getBodyWrapperProps} body={body} />;
  };

  return (
    <div>
      <Table
        {...tableProps}
        // className={classnames({ [styles.table]: true })}
        columns={columns}
        dataSource={datass}
        loading={loading}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  );
};

List.propTypes = {
  datass: PropTypes.array,
  pagination: PropTypes.object,
  location: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};

export default List;
