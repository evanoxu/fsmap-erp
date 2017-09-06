import { Fetch, APIPath } from '../utils';

// 2.3  专题管理接口
// 2.3.1  公共服务分类
// 2.3.1.1  公共服务管理
  // 2.3.1.1.1  展示分类列表
  /*
    data: {
      currentPage int 是 当前页数
      pageSize  int 是 一个几条数据
    }
   */
  export async function publicTypeList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICTYPELIST,
      data: data,
    });
  }
  // 2.3.1.1.2  展示编辑数据
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function publicTypeEidt(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICTYPEEIDT + data.id,
    });
  }
  // 2.3.1.1.3  编辑保存
  /*
    data: {
      id  Int 是 被编辑的id
      typeName  String  是 公共类别名称
      typePic String  是 未选中图标链接
      typePicOn String  是 选择图标链接
    }
   */
  export async function publicTypeSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICTYPESAVE,
      data: data,
    });
  }
  // 2.3.1.1.4  删除
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function publicTypeDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICTYPEDELETE + data.id,
    });
  }
  // 2.3.1.2.1  检测公共类别名是否存在
  /*
    data: {
      typeName  String  是 公共类别名称
    }
   */
  export async function publicTypeCheck(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICTYPECHECK,
      data: data,
    });
  }
  // 2.3.1.2.2  新增保存
  /*
    data: {
      typeName  String  是 公共类别名称
      typePic String  是 未选中图标链接
      typePicOn String  是 选择图标链接
      subSmallPic String  否 如果该大类下面没有子类则使用该图标作为点的显示
      subBigPic String  否 如果该大类下面没有子类则使用该图标作为点的显示
    }
   */
  export async function publicTypeAdd(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICTYPEADD,
      data: data,
    });
  }

// 2.3.2  公共服务子类
// 2.3.2.1  公共服务子类管理
  // 2.3.2.1.1 展示子类分类列表
  /*
    data: {
      currentPage int 是 当前页数
      pageSize  int 是 一个几条数据
    }
   */
  export async function publicSubTypeList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICSUBTYPELIST,
      data: data,
    });
  }
  // 2.3.2.1.2  展示编辑数据
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function publicSubTypeEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICSUBTYPEEDIT + data.id,
    });
  }
  // 2.3.2.1.3  编辑保存
  /*
    data: {
      id  Int 是 被编辑的id
      typeName  String  是 公共类别名称
      typeValue Int 是 公共类别值
      subTypeName String  是 子类名称
      thematic  String  是 专题图类型
      subTypePic  String  是 标点的图片地址
      subTypePicSize  Int 是 标点的大小
    }
   */
  export async function publicSubTypeSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICSUBTYPESAVE,
      data: data,
    });
  }
  // 2.3.2.1.4  删除
  /*
    data: {
      id  int 是 编辑的那条数据的id
    }
   */
  export async function publicSubTypeDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICSUBTYPEDELETE + data.id,
    });
  }
  // 2.3.2.2.1  加载页面信息(包括公共类别下拉和标点图列表)
  /*
    data: {

    }
   */
  export async function publicTypePage() {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICTYPEPAGE,
    });
  }
  // 2.3.2.2.2  检测子类名是否存在
  /*
    data: {
      subTypeName String  是 子类名
    }
   */
  export async function publicSubTypeCheck(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICSUBTYPECHECK,
      data: data,
    });
  }
  // 2.3.2.2.3  上传添加标点图片接口
  /*
    data: {
      file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
    }
   */
  export async function publicTypeUpPic(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICTYPEUPPIC,
      data: data,
    });
  }
  // 2.3.2.2.4  仅加载图标列表信息(上传完图标之后需要刷新一下图标列表)
  /*
    data: {
  
    }
   */
  export async function publicTypePicList() {
    return Fetch.default({
      method: 'GET',
      url: APIPath.PUBLICTYPEPICLIST,
    });
  }
  // 2.3.2.2.5  新增保存
  /*
    data: {
      typeName  String  是 公共类别名称
      typeValue Int 是 公共类别值
      subTypeName String  是 子类名称
      thematic  String  是 专题图类型
      subTypePic  String  是 专题未选中的图片地址
      subTypePicOn  String  是 专题已选中的图片地址
      subTypePicSize  Int 是 标点的大小
      subSmallPic String  是 子类在地图中显示的图标
      subBigPic String  是 子类在地图中显示的图标
    }
   */
  export async function publicSubTypeAdd(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.PUBLICSUBTYPEADD,
      data: data,
    });
  }