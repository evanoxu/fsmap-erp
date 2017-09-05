import { Fetch, APIPath } from '../utils';

// 1.1  宽带基础数据管理接口
// 1.1.1.1  展示详细信息和按条件或者关键字搜索接口
/*
  data: {
    currentPage int 是 当前属于第几页
    pageSize  int 是 一页多少条数据
    areaId  int 是 顺德区1 高明区2 三水区3 南海区4 禅城区5 所有<-1
    key String  否 搜索值
  }
 */
export async function dataList(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATALIST,
    data: data,
  });
}
// 1.1.1.2  查看编辑接口
/*
  data: {
    id  int 是 当前数据的id
  }
 */
export async function dataEdit(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.DATAEDIT + data.id,
  });
}
// 1.1.1.3  编辑后保存接口
/*
  data: {
    id  Int 是 · 被编辑的id
    servers String  是 用以存放网络类型（那个运营商、哪种宽带类型、宽带类型的速率）例：1:1-8|5-1;2:3-20|4-1;3:2-100;4:5-1|6-1;5:1-8 运营商和宽带类型用冒号分开，宽带类型和速率用-分开，多个宽带类型用|分开，如有多个运营商则用分号分开
    address String  是 地址
    name  String  是 名称
    lnglat  String  是 该地址的坐标
    areaId  Int 是 该地址属于哪个区  1顺德  2高明  3三水  4南海  5禅城
    createName  String  是  创建者昵称
  }
 */
export async function dataSave(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.DATASAVE,
    data: data,
  });
}
// 1.1.1.4  删除接口
/*
  data: {
    ids String  是 要被删除的id   例：12,13,14一个的时候直接传整数就好
  }
 */
export async function dataDelete(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.DATADELETE + data.ids,
  });
}
// 1.1.1.5  导出接口（可直接作为链接访问）
/*
  data: {
    serverId  int 是 运营商类型：1代表移动；2代表联通；3代表电信；4代表广电；5代表长城
  }
 */
/*
export async function dataExport(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.DATAEXPORT + data.serverId,
  });
}
*/

// 1.2.2.1 展示新增页面的网络类型数据
export async function dataNetList() {
  return Fetch.default({
    method: 'GET',
    url: APIPath.DATANETLIST,
  });
}

