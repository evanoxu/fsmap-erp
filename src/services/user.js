import { Fetch, APIPath } from '../utils';

// 8.3 用户管理接口
  // 8.3.1 添加用户
    // 8.3.1.1 检测账号是否存在
      /*
        data: {
          account String  是 账号
        }
       */
      export async function userCheck(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.USERCHECK,
          data: data,
        });
      }
    // 8.3.1.2  检测昵称是否存在（role=99的用户）
      /*
        data: {
          name  String  是 昵称
        }
       */
      export async function userCheckName(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.USERCHECKNAME,
          data: data,
        });
      }
    // 8.3.1.3  展示新增页面数据（加载出角色）
      /*
        data: { }
       */
      export async function userRoleList(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.USERROLELIST,
          data: data,
        });
      }
    // 8.3.1.4  新增保存用户接口（role=99的用户）
      /*
        data: {
          name  String  是 昵称
          account String  是 用户名
          password  String  是 密码
          roleUid String  是 角色的uid
          state Int 是 0可用 1不可用
        }
       */
      export async function userAdd(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.USERADD,
          data: data,
        });
      }
  // 8.3.2  用户列表展示及搜索
    /*
      data: {
        currentPage int 是 当前第几页
        pageSize  int 是 一个几条数据
        key String  否 搜索的值
      }
     */
    export async function userList(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.USERLIST,
        data: data,
      });
    }
  // 8.3.3  展示编辑数据（记得加载出角色数据）
    /*
      data: {
        id  Int 是 · 被编辑的id
      }
     */
    export async function userEdit(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.USEREDIT + data.id,
      });
    }
  // 8.3.4  保存编辑数据
    /*
      data: {
        Id  Int 是 被编辑的id
        name  String  是 昵称
        account String  是 用户名
        password  String  是 密码
        roleUid String  是 角色的uid
        state Int 是 0可用 1不可用
      }
     */
    export async function userSave(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.USERSAVE,
        data: data,
      });
    }
  // 8.3.5  删除
    /*
      data: {
        id String  是 要被删除的id

        account String  是 当前登录账号
      }
     */
    export async function userDelete(data) {
      const { id } = data.data;
      return Fetch.default({
        method: 'POST',
        url: APIPath.USERDELETE + id,
        data: data.data,
      });
    }

// 8.4 角色管理接口
  // 8.4.1 展示角色数据列表
    /*
      data: {
        currentPage int 是 当前页数
        pageSize  int 是 一个几条数据
      }
     */
    export async function adminRoleList(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINROLELIST,
        data: data,
      });
    }
  // 8.4.2  展示编辑数据(加载出该角色拥有的菜单)
    /*
      data: {
        id  int 是 编辑的那条数据的id
      }
     */
    export async function adminRoleEdit(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINROLEEDIT + data.id,
      });
    }
  // 8.4.3  保存编辑
    /*
      data: {
        id  Int 是 被编辑的id
        roles String  是 勾选的菜单的uid的拼接，多个权限用逗号隔开
        name  String  是 角色名称
      }
     */
    export async function adminRoleSave(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINROLESAVE,
        data: data,
      });
    }
  // 8.4.4  删除角色
    /*
      data: {
        id  int 是 编辑的那条数据的id

        account String  是 当前登录人账号
      }
     */
    export async function adminRoleDelete(data) {
      const { id } = data.data;
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINROLEDELETE + id,
        data: data.data,
      });
    }
  // 8.4.5  加载出新增页面的数据（所有菜单列表）
    /*
      data: {}
     */
    export async function adminMenuRoleList(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINMENUROLELIST,
      });
    }
  // 8.4.6  检测角色名称是否存在
    /*
      data: {
        name  String  是 角色名称
      }
    */
    export async function adminRoleCheck(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINROLECHECK,
        data: data,
      });
    }
  // 8.4.7  保存新角色
    /*
      data: {
        roles String  是 勾选的菜单的uid的拼接，多个权限用逗号隔开
        name  String  是 角色名称
      }
     */
    export async function adminRoleAdd(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINROLEADD,
        data: data,
      });
    }

// 8.5 菜单管理接口
  // 8.5.1 展示菜单数据列表
    /*
      data: {
        currentPage int 是 当前第几页
        pageSize  int 是 一个几条数据
      }
     */
    export async function adminMenuList(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINMENULIST,
        data: data,
      });
    }
  // 8.5.2  展示编辑数据(记得加载出是上级的菜单)
    /*
      data: {
        id  Int 是 · 被编辑的id
      }
     */
    export async function adminMenuEdit(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINMENUEDIT + data.id,
      });
    }
  // 8.5.3  保存编辑
    /*
      data: {
        id  Int 是 菜单的id
        name  String  是 菜单名称
        parentUid String  否 上级菜单uid 当有选择上级菜单的时候则需要传值
      }
     */
    export async function adminMenuSave(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINMENUSAVE,
        data: data,
      });
    }
  // 8.5.4  删除菜单
    /*
      data: {
        id String  是 要被删除的id

        account String  是 当前登录账号
      }
     */
    export async function adminMenuDelete(data) {
      const { id } = data.data;
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINMENUDELETE + id,
        data: data.data,
      });
    }
  // 8.5.5  加载出新增页面的数据（加载出是上级菜单的数据）
    /*
      data: {}
     */
    export async function adminMenuPList(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.ADMINMENUPLIST,
      });
    }
  // 8.5.6  检测菜单名称是否存在
    /*
      data: {
        name  String  是 角色名称
      }
    */
    export async function adminMenuCheck(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINMENUCHECK,
        data: data,
      });
    }
  // 8.5.7  保存新菜单
    /*
      data: {
        name  String  是 菜单名称
        parentUid String  否 上级菜单uid 当有选择上级菜单的时候则需要传值
      }
     */
    export async function adminMenuAdd(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.ADMINMENUADD,
        data: data,
      });
    }