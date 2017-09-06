import { Fetch, APIPath } from '../utils';

// 2.2 公共服务基础数据导入接口
// 2.2.1 页面内容展示
/*
  data: {
    currentPage int 是 当前第几页
    pageSize  int 是 一个几条数据
  }
 */
export async function publicImportLogList(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.PUBLICIMPORTLOGLIST,
    data: data,
  });
}
// 2.2.2  上传excel
/*
  data: {
    file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
  }
 */
export async function publicImportUpExcel(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.PUBLICIMPORTUPEXCEL,
    data: data,
  });
}
// 2.2.3  导入excel（需先上传后导入）
/*
  data: {
    excelUrl  String  是 上传完的excel的路径
  }
 */
export async function publicImportExcel(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.PUBLICIMPORTEXCEL,
    data: data,
  });
}
// 2.2.4 新增公共服务数据
// 2.2.4.2  新增和编辑的保存
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