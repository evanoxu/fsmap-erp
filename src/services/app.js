import { Fetch, APIPath } from '../utils';

export async function logout() {
  return Fetch.default({
    method: 'POST',
    url: APIPath.LOGOUT,
  });
}

// 8.2  根据用户名获取菜单权限接口
/*
  data: {
    account String  是 用户名
  }
 */
export async function userMenus(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.USERMENUS,
    data: data,
  });
}