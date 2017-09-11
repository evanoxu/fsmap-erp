import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Row, Col, Radio, Upload, message,Select,Switch,Tree } from 'antd';

import { APIPath } from '../../utils';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

// var state = {
//     expandedKeys: ['0-0-0', '0-0-1'],
//     autoExpandParent: true,
//     checkedKeys: ['0-0-0'],
//     selectedKeys: [],
//   }

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

// const Modals = ({
//   uper,
//   menus,  
//   editInfo,
//   onOk,
//   form: {
//     getFieldDecorator,
//     validateFields,
//     getFieldsValue,
//     setFieldsValue,
//   },
//   ...modalProps
// }) => {
//   var init = {
//     id:'',
//     account: '',
//     password: '',
//     name: '',
//     telphone: '',
//     state: '0',
//     isUperManage: false,
//     uperManageAccount: [],
//     menus: ['0-0-0'],
//     hasMyMap: false,
//   }  
//   if(editInfo){
//     init = {
//       id:editInfo.id,
//       account: editInfo.account,
//       password: editInfo.password,
//       name: editInfo.name,
//       telphone: editInfo.telphone,
//       state: editInfo.state,
//       isUperManage: Number(editInfo.isUperManage)?true:false,
//       uperManageAccount: editInfo.uperManageAccount?editInfo.uperManageAccount.split(','):[],
//       menus: editInfo.menus,
//       hasMyMap: Number(editInfo.hasMyMap)?true:false,
//     }    
//   }  
//   // console.log(init);
//   // 提交按钮
//   // console.log(Modals)

//   onExpand = (expandedKeys) => {
//     console.log('onExpand', arguments);
//     // if not set autoExpandParent to false, if children expanded, parent can not collapse.
//     // or, you can remove all expanded children keys.
//     this.setState({
//       expandedKeys,
//       autoExpandParent: false,
//     });
//     // state
//   }
//   onCheck = (checkedKeys) => {
//     this.setState({
//       checkedKeys,
//       selectedKeys: ['0-3', '0-4'],
//     });
//   }
//   onSelect = (selectedKeys, info) => {
//     this.state.selectedKeys = selectedKeys
//   }

//   const handleOk = () => {
//     validateFields((errors) => {
//       if (errors) {
//         return ;
//       }
//       var  data = {
//         ...getFieldsValue(),
//       };
//       data.isUperManage = data.isUperManage?1:0;
//       data.hasMyMap = data.hasMyMap?1:0;
//       if(init.id)  data.id = init.id
//       onOk(data);
//     });
//   };

//   // 封装父层数据
//   const modalOpts = {
//     ...modalProps,
//     onOk: handleOk,
//   };


//   const loop = data => data.map((item) => {
//     if (item.children) {
//       return (
//         <TreeNode key={item.key} title={item.key}>
//           {loop(item.children)}
//         </TreeNode>
//       );
//     }
//     return <TreeNode key={item.key} title={item.key} />;
//   });

//   return (
//     <Modal {...modalOpts}>
//       <Form layout="horizontal">
//         <FormItem label="用户名" {...formItemLayout}>
//           {getFieldDecorator('account', {
//             initialValue: init.account,
//             rules: [
//               {
//                 required: true,
//               },
//             ],
//           })(<Input />)}
//         </FormItem>
//         <FormItem label="新密码" {...formItemLayout}>
//           {getFieldDecorator('password', {
//             initialValue: '',
//           })(<Input placeholder="输入您要设置的新密码"/>)}
//         </FormItem>
//         <FormItem label="昵称" {...formItemLayout}>
//           {getFieldDecorator('name', {
//             initialValue: init.name,
//             rules: [
//               {
//                 required: true,
//               },
//             ],
//           })(<Input />)}
//         </FormItem>
//         <FormItem label="电话" {...formItemLayout}>
//           {getFieldDecorator('telphone', {
//             initialValue: init.telphone,
//             rules: [
//               {
//                 required: true,
//               },
//             ],
//           })(<Input />)}
//         </FormItem>                              
//         <FormItem label="账号状态" {...formItemLayout}>
//           {getFieldDecorator('state', {
//             initialValue: String(init.state),
//             rules: [
//               {
//                 required: true,
//               },
//             ],
//           })(
//           <Select
//             >
//               <Option value="0">可用</Option>
//               <Option value="1">不可用</Option>
//             </Select>
//           )}
//         </FormItem>       
//         <FormItem
//           {...formItemLayout}
//           label="是否为主管部门"
//         >
//           {getFieldDecorator('isUperManage', {
//             initialValue: init.isUperManage,
//             valuePropName: 'checked' 
//           })(
//             <Switch />
//           )}
//         </FormItem>
//         <FormItem
//           {...formItemLayout}
//           label="上级部门"
//         >
//           {getFieldDecorator('uperManageAccount', {
//             initialValue: init.uperManageAccount,
//           })(
//             <Select
//               mode="multiple"
//               style={{ width: '100%' }}
//               placeholder="请选择一个或者多个"
//             >
//               {children}
//             </Select>
//           )}
//         </FormItem>        
//         <FormItem
//           {...formItemLayout}
//           label="自定义地图权限"
//         >
//           {getFieldDecorator('hasMyMap', {
//             initialValue: init.hasMyMap,
//             valuePropName: 'checked' 
//           })(
//             <Switch />
//           )}          
//         </FormItem> 
//         <Tree
//           checkable
//           onExpand={onExpand}
//           expandedKeys={state.expandedKeys}
//           autoExpandParent={state.autoExpandParent}
//           onCheck={onCheck}
//           checkedKeys={state.checkedKeys}
//           // onSelect={this.onSelect}
//           selectedKeys={state.selectedKeys}
//         >
//           {loop(gData)}
//         </Tree>             
//       </Form>
//     </Modal>
//   )

// };


        // <FormItem
        //   {...formItemLayout}
        //   label="管理权限"
        // >
        //   {getFieldDecorator('menus', {
        //     initialValue: init.menus,
        //     valuePropName: 'checkedKeys' 
        //   })(
        //     <Tree

        //       checkable 
        //       defaultExpandAll
        //       // expandedKeys={['0-0-0', '0-0-1']}
        //       // selectedKeys={['0-0-0', '0-0-1']}
        //       // checkedKeys={['0-0-0']}
        //     >
        //       <TreeNode title="parent 1" key="0-0">
        //         <TreeNode title="parent 1-0" key="0-0-0">
        //           <TreeNode title="leaf" key="0-0-0-0" />
        //           <TreeNode title="leaf" key="0-0-0-1" />
        //         </TreeNode>
        //         <TreeNode title="parent 1-1" key="0-0-1">
        //           <TreeNode title="sss" key="0-0-1-0" />
        //         </TreeNode>
        //       </TreeNode>
        //     </Tree>
        //   )}          
        // </FormItem> 
// Modals.propTypes = {
//   item: PropTypes.object,
//   zkey: PropTypes.string,
//   onOk: PropTypes.func,
//   form: PropTypes.object.isRequired,
// }

// export default Form.create()(Modals);


class Modals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys: [],
    }
  } 

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
    console.log(expandedKeys)
  }
  onCheck = (checkedKeys) => {
    console.log(checkedKeys)
    this.setState({
      checkedKeys,
    });
  }
  onSelect = (selectedKeys, info) => {
    this.state.selectedKeys = selectedKeys
  }

  handleOk = () => {
    const { validateFields,getFieldsValue,getFieldValue } = this.props.form
    console.log(getFieldValue('menus'))
    validateFields((errors) => {
      if (errors) {
        return ;
      }
      var  data = {
        ...getFieldsValue(),
      };
      data.isUperManage = data.isUperManage?1:0;
      data.hasMyMap = data.hasMyMap?1:0;
      if(this.props.editInfo)  data.id = this.props.editInfo.id
      console.log(data);
      return false;        
      onOk(data);
    });
  };
  componentWillMount(){
    this.setState({
      expandedKeys: this.props.open        
    })   
  }

  render () {
    const {
      uper,
      menus, 
      open, 
      editInfo,
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      },
      ...modalProps
    } = this.props
    const modalOpts = {
      ...modalProps,
      onOk: this.handleOk,
    };

    var init = {
      id:'',
      account: '',
      password: '',
      name: '',
      telphone: '',
      state: '0',
      isUperManage: false,
      uperManageAccount: [],
      menus: [],
      hasMyMap: false,
    }  
    if(editInfo){
      init = {
        id:editInfo.id,
        account: editInfo.account,
        password: editInfo.password,
        name: editInfo.name,
        telphone: editInfo.telphone,
        state: editInfo.state,
        isUperManage: Number(editInfo.isUperManage)?true:false,
        uperManageAccount: editInfo.uperManageAccount?editInfo.uperManageAccount.split(','):[],
        menus: editInfo.menus?editInfo.menus.split(','):[],
        hasMyMap: Number(editInfo.hasMyMap)?true:false,
      }    
    }    
    console.log(init)
    const loop = data => data.map((item) => {
      if (item.childList&&item.childList.length) {
        return (
          <TreeNode key={item.id} title={item.typeName||item.subTypeName}>
            {loop(item.childList)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.typeName||item.subTypeName} />;
    });
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }   
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="用户名" {...formItemLayout}>
            {getFieldDecorator('account', {
              initialValue: init.account,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="新密码" {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: '',
            })(<Input placeholder="输入您要设置的新密码"/>)}
          </FormItem>
          <FormItem label="昵称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: init.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="电话" {...formItemLayout}>
            {getFieldDecorator('telphone', {
              initialValue: init.telphone,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>                              
          <FormItem label="账号状态" {...formItemLayout}>
            {getFieldDecorator('state', {
              initialValue: String(init.state),
              rules: [
                {
                  required: true,
                },
              ],
            })(
            <Select
              >
                <Option value="0">可用</Option>
                <Option value="1">不可用</Option>
              </Select>
            )}
          </FormItem>       
          <FormItem
            {...formItemLayout}
            label="是否为主管部门"
          >
            {getFieldDecorator('isUperManage', {
              initialValue: init.isUperManage,
              valuePropName: 'checked' 
            })(
              <Switch />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上级部门"
          >
            {getFieldDecorator('uperManageAccount', {
              initialValue: init.uperManageAccount,
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择一个或者多个"
              >
                {children}
              </Select>
            )}
          </FormItem>        
          <FormItem
            {...formItemLayout}
            label="自定义地图权限"
          >
            {getFieldDecorator('hasMyMap', {
              initialValue: init.hasMyMap,
              valuePropName: 'checked' 
            })(
              <Switch />
            )}          
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="管理权限"
          >
            {getFieldDecorator('menus', {
              initialValue: init.menus,
              valuePropName: 'selectedKeys' 
            })(
              <Tree
                checkable
                defaultExpandAll
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                onCheck={this.onCheck}
                // selectedKeys={this.state.selectedKeys}
              >
                {loop(menus)}
              </Tree>
            )}          
          </FormItem>            
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Modals);