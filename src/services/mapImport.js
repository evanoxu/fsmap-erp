import { Fetch, APIPath } from '../utils';

// 1.2  宽带基础数据导入接口
// 1.2.1.1  历史数据展示
/*
  data: {
    currentPage int 是 当前第几页
    pageSize  int 是 一个几条数据
  }
 */
export async function dataImportList(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATAIMPORTLIST,
    data: data,
  });
}
// 1.2.1.2  上传文件接口:（导入之前应该先上传文件）
/*
  data: {
    file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
  }
 */
export async function dataImportUpExcel(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATAIMPORTUPEXCEL,
    data: data,
  });
}
// 1.2.1.3  导入数据接口:(具体处理在ImportExcel类中)
/*
  data: {
    serverId  int 是 导入的是哪个运营商数据，根据运营商下拉框来传值
    excelUrl  String  是 上传成功的excel的路径
  }
 */
export async function dataImportExcel(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATAIMPORTEXCEL,
    data: data,
  });
}
// 1.2.2.1 展示新增页面的网络类型数据
export async function dataNetList() {
  return Fetch.default({
    method: 'GET',
    url: APIPath.DATANETLIST,
  });
}
// 1.2.2.2  新增保存数据
/*
  data: {
    servers String  是 用以存放网络类型（那个运营商、哪种宽带类型、宽带类型的速率）例：1:1-8|5-1;2:3-20|4-1;3:2-100;4:5-1|6-1;5:1-8   运营商和宽带类型用冒号分开，宽带类型和速率用-分开，多个宽带类型用|分开，如有多个运营商则用分号分开
    address String  是 地址
    name  String  是 名称
    lnglat  String  否 该地址的坐标
    areaId  Int 是 该地址属于哪个区  1顺德  2高明  3三水  4南海  5禅城 
    createName  String  是  创建者昵称
  }
 */
export async function dataNetAdd(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATANETADD,
    data: data,
  });
}

