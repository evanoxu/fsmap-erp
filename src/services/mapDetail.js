import { Fetch, APIPath } from '../utils';

// 1.4  详情管理接口
// 1.4.1  用户发布内容管理
  // 1.4.1.1  内容管理的展示
  /*
    data: {
      currentPage Int 是 当前第几页
      pageSize  Int 是 一页几条数据
      key String  否 搜索值
    }
   */
  export async function dataDetailList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATADETAILLIST,
      data: data,
    });
  }
  // 1.4.1.2  点击图片或点评按钮接口
  /*
    data: {
      type    查看图片type=0 或点评 type=1

      currentPage Int 是 当前第几页
      pageSize  Int 是 一页几条数据
      id  Int 是 列表中被选中的id的值
      mapType String  是 Maptype=map
    }
   */
  export async function dataDetailCommonet(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATADETAILCOMMONET + data.type,
      data: data,
    });
  }
  // 1.4.1.3  删除某张图片或某条点评接口
  /*
    data: {
      id  int 是 编辑的那条数据的id
      type    删除图片type=0   删除点评 type=1

      account String  是 当前登录账号，用于校验是不是管理员
    }
   */
  export async function dataDetailDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATADETAILDELETE + data.id + '/' + data.type,
      data: data,
    });
  }
