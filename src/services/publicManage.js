import { Fetch, APIPath } from '../utils';

// 2.1 公共服务基础数据管理接口
// 2.1.1 加载公共类别，再根据公共类别加载出子类
/*
  data: {
    publicServiceType int 是 当加载公共类别时不传该参数，当加载子类时需要传该值
  }
 */
export async function publicDataType(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.PUBLICDATATYPE,
    data: data,
  });
}
// 2.1.2  页面内容展示及搜索
/*
  data: {
    currentPage Int 是 一页显示几条数据
    pageSize  Int 是 当前第几页
    name  String  否 搜索的值,搜索设施名称
    typeValue int 否 大类的值
    subTypeValue  int 否 子类的值
  }
 */
export async function publicDataFind(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.PUBLICDATAFIND,
    data: data,
  });
}
// 2.1.3  显示编辑数据
/*
  data: {
    id  Int 是 · 被编辑的id
  }
 */
export async function publicDataEdit(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.PUBLICDATAEDIT + data.id,
  });
}
// 2.1.4  删除接口
/*
  data: {
    id String  是 要被删除的id
  }
 */
export async function publicDataDelete(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.PUBLICDATADELETE + data.id,
  });
}
// 2.1.5  导出接口（可直接作为链接访问）
/*
  data: {
    type  int 二者必须传一个 大类别
    subType int 二者必须传一个 小类别
  }
 */
/*
export async function publicDataExport(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.PUBLICDATAEXPORT,
    data: data,
  });
}
*/
// 2.1.6 新增和编辑的保存
/*
  data: {
    Id  Int 是 当编辑时需要传该参数
    name  String  是 名称
    address String  是 地址
    publicServiceType Int 是 大类的值
    publicServiceSubType  int 是 子类的值
    introduction  String  否 简介
    phoneNumber String  否 联系电话
    officeTime  String  否 办公时间
    linkUrl String  否 直接链接
    lnglat  String  否 经纬度
    createName  String  是 创建者昵称
  }
 */
export async function publicDataSave(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.PUBLICDATASAVE,
    data: data,
  });
}