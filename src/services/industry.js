import { Fetch, APIPath } from '../utils';

// 3.1 产业基础数据管理接口
  // 3.1.1 产业基础数据列表展示及其搜索
    /*
      data: {
        currentPage Int 是 当前第几页
        pageSize  Int 是 一页几条数据
        key String  否 搜索的值
        industryType  Int 是 默认为 -1查询全部
      }
     */
    export async function industryDataFind(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.INDUSTRYDATAFIND,
        data: data,
      });
    }
  // 3.1.2  展示编辑数据
    /*
      data: {
        id  Int 是 · 被编辑的id
      }
     */
    export async function industryDataEdit(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.INDUSTRYDATAEDIT + data.id,
      });
    }
  // 3.1.3  产业基础数据列表编辑保存
    /*
      data: {
        Id  Int 是 被编辑的id
        address String  是 地址
        areaId  Int 是 顺德区1 ;高明区2；三水区3；南海区4；禅城区5
        lnglat  String  否 经纬度
        createName  String  是 当前登录用户的昵称
        industryName  String  是 企业名称
        industryType  Int 是 产业类型值 根据加载出来的值传至后台
        industryTypeName  String  是 产业类型名称
        orgCode String  否 组织机构代码
        registNum String  否 注册号
        registMoney String  否 注册资金
        registState String  否 登记状态
        phoneNum  String  否 联系电话
        introduction  String  否 简介
        setupTime String  否 成立时间
      }
     */
    export async function industryDataSave(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.INDUSTRYDATASAVE,
        data: data,
      });
    }
  // 3.1.4  产业基础数据列表展删除
    /*
      data: {
        id String  是 要被删除的id
      }
     */
    export async function industryDataDelete(data) {
      return Fetch.default({
        method: 'POST',
        url: APIPath.INDUSTRYDATADELETE + data.id,
      });
    }
  // 3.1.5  导出接口（可直接作为链接访问）
    /*
      data: {
        industryType  Int 是 所属产业类型值
      }
     */
    /*
    export async function industryDataExport(data) {
      return Fetch.default({
        method: 'GET',
        url: APIPath.INDUSTRYDATAEXPORT,
        data: data,
      });
    }
    */

// 3.2 产业基础数据导入接口
  // 3.2.1 导入基础公共服务数据
    // 3.2.1.1 历史数据展示
      /*
        data: {
          currentPage int 是 当前第几页
          pageSize  int 是 一个几条数据
        }
       */
      export async function industryImportLogList(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYIMPORTLOGLIST,
          data: data,
        });
      }
    // 3.2.1.2  上传excel接口
      /*
        data: {
          file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
        }
       */
      export async function industryImportUpExcel(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYIMPORTUPEXCEL,
          data: data,
        });
      }
    // 3.2.1.3  导入接口（需先上传后导入）
      /*
        data: {
          excelUrl  String  是 上传完的excel的路径
        }
       */
      export async function industryImportExcel(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYIMPORTEXCEL,
          data: data,
        });
      }
  // 3.2.2 新增公共服务数据
    // 3.2.2.1 加载界面信息(加载出产业类别)
      /*
        data: {}
      */
      export async function industryTypePage(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.INDUSTRYTYPEPAGE,
          data: data,
        });
      }
    // 3.2.2.2  保存新增数据
      /*
        data: {
          address String  是 地址
          areaId  Int 是 顺德区1 ;高明区2；三水区3；南海区4；禅城区5
          lnglat  String  否 经纬度
          createName  String  是 当前登录用户的昵称
          industryName  String  是 企业名称
          industryType  Int 是 产业类型值 根据加载出来的值传至后台
          industryTypeName  String  是 产业类型名称
          orgCode String  否 组织机构代码
          registNum String  否 注册号
          registMoney String  否 注册资金
          registState String  否 登记状态
          phoneNum  String  否 联系电话
          introduction  String  否 简介
          setupTime String  否 成立时间
        }
       */
      export async function industryDataAdd(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYDATAADD,
          data: data,
        });
      }

// 3.3 专题管理接口
  // 3.3.1 产业专题管理
    // 3.3.1.1 列表展示
      /*
        data: {
          currentPage int 是 当前页数
          pageSize  int 是 一个几条数据
        }
       */
      export async function industryTypeList(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.INDUSTRYTYPELIST,
          data: data,
        });
      }
    // 3.3.1.2  展示编辑数据
      /*
        data: {
          id  int 是 编辑的那条数据的id
        }
       */
      export async function industryTypeEidt(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.INDUSTRYTYPEEIDT + data.id,
        });
      }
    // 3.3.1.3  编辑后保存
      /*
        data: {
          id  Int 是 被编辑的id
          typeName  String  是 专题名称
          typePic String  是 未选中图标链接
          typePicOn String  是 选择图标链接
        }
       */
      export async function industryTypeSave(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYTYPESAVE,
          data: data,
        });
      }
    // 3.3.1.4  删除
      /*
        data: {
          id  int 是 编辑的那条数据的id
        }
       */
      export async function industryTypeDelete(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYTYPEDELETE + data.id,
        });
      }
  // 3.3.2 新增
    // 3.3.2.1 检测产业类别的唯一性
      /*
        data: {
          typeName  String  是 公共类别名称
        }
       */
      export async function industryTypeCheck(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYTYPECHECK,
          data: data,
        });
      }
    // 3.3.2.2 上传图片接口
      /*
        data: {
          file  MultipartFile 是 要上传的文件类型框的  name的值应该填写为file
        }
       */
      export async function industryTypeUpPic(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYTYPEUPPIC,
          data: data,
        });
      }
    // 3.3.2.3  保存新增专题接口
      /*
        data: {
          typeName  String  是 专题名称
          typePic String  是 未选中图标链接
          typePicOn String  是 选择图标链接
          subSmallPic String  是 点在地图中显示的图标
          subBigPic String  是 点在地图中显示的图标
        }
       */
      export async function industryTypeAdd(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYTYPEADD,
          data: data,
        });
      }

// 3.4 产业详情管理接口
  // 3.4.1 用户发布内容管理
    // 3.4.1.1 加载出页面数据及搜索接口
      /*
        data: {
          currentPage Int 是 当前第几页
          pageSize  Int 是 一页几条数据
          key String  否 搜索值
        }
       */
      export async function industryDetailList(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.INDUSTRYDETAILLIST,
          data: data,
        });
      }
    // 3.4.1.2  点击图片或点评按钮接口
      /*
        data: {
          type    查看图片type=0 或点评 type=1

          currentPage Int 是 当前第几页
          pageSize  Int 是 一页几条数据
          id  Int 是 列表中被选中的id的值
          mapType String  是 Maptype=industry
        }
       */
      export async function industryDetailComment(data) {
        return Fetch.default({
          method: 'GET',
          url: APIPath.INDUSTRYDETAILCOMMENT + data.type,
          data: data,
        });
      }
    // 3.4.1.3 删除某张图片或某条点评接口
      /*
        data: {
          id  int 是 编辑的那条数据的id
          type    删除图片type=0   删除点评 type=1

          account String  是 当前登录账号，用于校验是不是管理员
        }
       */
      export async function industryDetailDelete(data) {
        return Fetch.default({
          method: 'POST',
          url: APIPath.INDUSTRYDETAILDELETE + data.id + '/' + data.type,
          data: data,
        });
      }
