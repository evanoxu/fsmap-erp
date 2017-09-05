import { Fetch, APIPath } from '../utils';

// 1.3  专题管理接口
// 1.3.1  宽带专题
  // 1.3.1.1  宽带专题的展示
  /*
    data: {
      currentPage int 是 当前页数
      pageSize  int 是 一个几条数据
    }
   */
  export async function dataPlateList(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATAPLATELIST,
      data: data,
    });
  }
  // 1.3.1.2  宽带专题的数据获取
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataTypeEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATATYPEEDIT + data.id,
    });
  }
  // 1.3.1.3  宽带专题的编辑保存
  /*
    data: {
      id  int 是 编辑的那条数据的id
      typeName  String  是 专题名
      typePic String  是 上传专题图标的路径
      typePicOn String  是 上传已选中的专题图标的路径
      serverType  Int 是 如果选择了是民资运营商 设置为1，没有选择则设置为0
    }
   */
  export async function dataTypeSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATATYPESAVE,
      data: data,
    });
  }
  // 1.3.1.4  宽带专题的删除
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataTypeDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATATYPEDELETE + data.id,
    });
  }
  // 1.3.1.5  宽带专题的检测
  /*
    data: {
      typeName  String  是 专题名称
    }
   */
  export async function dataTypeCheck(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATATYPECHECK,
      data: data,
    });
  }
  // 1.3.1.6  宽带专题的新增
  /*
    data: {
      typeName  String  是 专题名
      typePic String  是 上传专题图标的路径
      typePicOn String  是 上传已选中的专题图标的路径
      serverType  Int 是 如果选择了是民资运营商 设置为1，没有选择则设置为0
    }
   */
  export async function dataTypeAdd(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATATYPEADD,
      data: data,
    });
  }
  // 1.3.1.7  宽带专题的图标上传
  /*
    data: {
      file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
    }
   */
  export async function dataTypeUpPic(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATATYPEUPPIC,
      data: data,
    });
  }

// 1.3.2  连接方式
  // 1.3.2.1  连接方式的展示
  /*
    data: {
      currentPage int 是 当前页数
      pageSize  int 是 一个几条数据
    }
   */
  export async function dataSubList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATASUBLIST,
      data: data,
    });
  }
  // 1.3.2.2  连接方式的数据获取
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataSubEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATASUBEDIT + data.id,
    });
  }
  // 1.3.2.3  连接方式的编辑保存
  /*
    data: {
      id  int 是 编辑的那条数据的id
      subTypeName String  是 连接方式名称
      speed Int   是 连接方式的速率
    }
   */
  export async function dataSubSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASUBSAVE,
      data: data,
    });
  }
  // 1.3.2.4  连接方式的删除
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataSubDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASUBDELETE + data.id,
    });
  }
  // 1.3.2.5  连接方式的检测
  /*
    data: {
      subTypeName String  是 连接方式名称
    }
   */
  export async function dataSubCheck(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASUBCHECK,
      data: data,
    });
  }
  // 1.3.2.6  连接方式的新增
  /*
    data: {
      subTypeName String  是 连接方式名称
      speed Int 是 连接方式的速率
    }
   */
  export async function dataSubAdd(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASUBADD,
      data: data,
    });
  }
  // 1.3.2.7  连接方式的图标上传
  /*
    data: {
      file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
    }
   */
  export async function dataSubUpPic(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASUBUPPIC,
      data: data,
    });
  }

// 1.3.3  宽带速率
  // 1.3.3.1  宽带速率的检测
  /*
    data: {
      colorName String  是 被检测的宽带速率名称
    }
   */
  export async function dataSpeedCheck(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASPEEDCHECK,
      data: data,
    });
  }
  // 1.3.3.2  宽带速率的展示
  /*
    data: {
      currentPage int 是 当前页数
      pageSize  int 是 一个几条数据
    }
   */
  export async function dataSpeedList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATASPEEDLIST,
      data: data,
    });
  }
  // 1.3.3.3  宽带速率的新增
  /*
    data: {
      colorName String  是 名称
      speed String  是 宽带速率
      color String  是 颜色值 例  #333333
    }
   */
  export async function dataSpeedAdd(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASPEEDADD,
      data: data,
    });
  }
  // 1.3.3.4  宽带速率的数据获取
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataSpeedEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATASPEEDEDIT + data.id,
    });
  }
  // 1.3.3.5  宽带速率的编辑保存
  /*
    data: {
      id  int 是 被编辑数据的id
      colorName String  是 名称
      speed String  是 宽带速率
      color String  是 颜色值 例  #333333
    }
   */
  export async function dataSpeedSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASPEEDSAVE,
      data: data,
    });
  }
  // 1.3.3.6  宽带速率的删除
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function dataSpeedDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.DATASPEEDDELETE + data.id,
    });
  }
