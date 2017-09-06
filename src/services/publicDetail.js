import { Fetch, APIPath } from '../utils';

// 2.4 公共服务详情管理接口
// 2.4.1 用户发布内容管理
  // 2.4.1.1 加载出页面数据及搜索接口（条件的加载仅加载子类信息）
  /*
    data: {
      currentPage Int 是 一页显示几条数据
      pageSize  Int 是 当前第几页
      evaluationNo  String  否 搜索的值
      subTypeValue  int 否 子类的值，大类的值不需要传
    }
   */
  export async function publicDetailList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICDETAILLIST,
      data: data,
    });
  }
  // 2.4.1.2  点击图片或点评按钮接口
  /*
    data: {
      type    查看图片type=0 或点评 type=1

      currentPage Int 是 当前第几页
      pageSize  Int 是 一页几条数据
      id  Int 是 列表中被选中的id的值
      mapType String  是 Maptype=publicService
    }
   */
  export async function publicDetailComment(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICDETAILCOMMENT + data.type,
      data: data,
    });
  }
  // 2.4.1.3  删除某张图片或某条点评接口
  /*
    data: {
      id  int 是 编辑的那条数据的id
      type    删除图片type=0   删除点评 type=1

      account String  是 当前登录账号，用于校验是不是管理员
    }
   */
  export async function publicDetailDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICDETAILDELETE + data.id + '/' + data.type,
      data: data,
    });
  }
