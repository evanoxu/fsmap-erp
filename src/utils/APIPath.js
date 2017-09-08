/*
  封装数据请求API
 */

let URL_API = {};

// 本地接口
let ROOT_URL = 'http://192.168.2.113:8080';

// API接口
let API = {
  // 1.宽带地图
  //    基础数据管理
  dataList: 'merchant/admin/netlistJson',
  dataEdit: 'merchant/admin/net/editJson/',
  dataSave: 'merchant/admin/net',
  dataDelete: 'merchant/admin/net/delete/',
  dataExport: 'merchant/admin/net/export/server/',
  //    基础数据导入
  dataImportList: 'importlog/admin/importloglist/map',
  dataImportUpExcel: 'upload/uploadExcel',
  dataImportExcel: 'merchant/admin/importExcel',
  dataNetList: 'merchant/adminPageData',
  dataNetAdd: 'merchant/admin/net',
  //    专题管理
  dataTypeList: 'type/mapList',
  dataTypeAdd: 'type/saveMapType',
  dataTypeEdit: 'type/mapEdit/',
  dataTypeSave: 'type/saveMapType',
  dataTypeDelete: 'type/mapDelete/',
  dataTypeCheck: 'type/findMapType',
  dataTypeUpPic: 'upload/uploadTypePic',
  dataSubList: 'type/mapSubList',
  dataSubAdd: 'type/saveMapSubType',
  dataSubEdit: 'type/mapEdit/',
  dataSubSave: 'type/saveMapSubType',
  dataSubDelete: 'type/mapDelete/',
  dataSubCheck: 'type/findMapType',
  dataSubUpPic: 'upload/uploadTypePic',
  dataSpeedCheck: 'type/checkSpeedColorName',
  dataSpeedList: 'type/mapSpeedColorList',
  dataSpeedAdd: 'type/saveSpeedColor',
  dataSpeedEdit: 'type/mapSpeedColorEdit/',
  dataSpeedSave: 'type/saveSpeedColor',
  dataSpeedDelete: 'type/mapSpeedColorDelete/',
  //    详情管理
  dataDetailList: 'plate/commentList',
  dataDetailCommonet: 'plate/commentDetail/',
  dataDetailDelete: 'plate/deleteComment/',
  //    版块管理
  dataPlateLoad: 'plate/admin/load/',
  dataPlateSearch: 'plate/admin/find',
  dataPlateDrawSave: 'plate/admin/draw/newsave',
  dataPlateCDelete: 'plate/admin/delete/',
  dataPlateReload: 'plate/admin/load2map',
  dataPlateList: 'plate/admin/platelists',
  dataPlateEdit: 'plate/admin/editPlate/',
  dataPlateDelete: 'plate/admin/deletePlate/',
  dataPlateSpeedData: 'platespeed/pageDataHavePlate',
  dataPlateSpeedAdd: 'platespeed/admin/save',
  dataPlateSpeedList: 'platespeed/admin/speedList',
  dataPlateSpeedEdit: 'platespeed/admin/speedEdit/',
  dataPlateSpeedSave: 'platespeed/admin/admin/editSave',
  dataPlateSpeedDelete: 'platespeed/admin/delete/',
  // 2.公共服务地图
  publicDataType: 'publicService/allPublicTypes',
  //    基础数据管理
  publicDataFind: 'publicService/findPsData',
  publicDataEdit: 'publicService/showEidtData/',
  publicDataDelete: 'publicService/deletePs/',
  publicDataSave: 'publicService/savePsData',
  publicDataExport: 'publicService/export',
  //    基础数据导入
  publicImportLogList: 'importlog/admin/importloglist/publicService',
  publicImportUpExcel: 'upload/uploadExcel',
  publicImportExcel: 'merchant/admin/publicService/importExcel',
  //    专题管理
  publicTypeList: 'type/publicSerrviceTypeList',
  publicTypeAdd: 'type/savePublicServiceType',
  publicTypeEidt: 'type/publicSerrviceEdit/',
  publicTypeSave: 'type/savePublicServiceType',
  publicTypeDelete: 'type/publicSerrviceDelete/',
  publicTypeCheck: 'type/findPublicServiceType',
  publicSubTypeList: 'type/publicSerrviceSubTypeList',
  publicSubTypeAdd: 'type/savePublicServiceSubType',
  publicSubTypeEdit: 'type/publicSerrviceEdit/',
  publicSubTypeSave: 'type/savePublicServiceSubType',
  publicSubTypeDelete: 'type/publicSerrviceDelete/',
  publicSubTypeCheck: 'type/checkPublicServiceSubName',
  publicTypePage: 'type/publicServicePageData',
  publicTypeUpPic: 'uploads/publicServicePic',
  publicTypePicList: 'type/publicServicePicList',
  //    详情管理
  publicDetailList: 'publicService/detailPageList',
  publicDetailComment: 'plate/commentDetail/',
  publicDetailDelete: 'plate/deleteComment/',
  // 3.产业地图
  industryTypePage: 'type/ajaxIndustry',
  //    基础数据管理
  industryDataFind: 'industry/findList',
  industryDataAdd: 'industry/adminAddIndustry',
  industryDataEdit: 'industry/editById/',
  industryDataSave: 'industry/adminAddIndustry',
  industryDataDelete: 'industry/delById/',
  industryDataExport: 'industry/export',
  //    基础数据导入
  industryImportLogList: 'importlog/admin/importloglist/industry',
  industryImportUpExcel: 'upload/uploadExcel',
  industryImportExcel: 'merchant/admin/industry/importExcel',
  //    专题管理
  industryTypeList: 'type/industryTypeList',
  industryTypeAdd: 'type/saveIndustry',
  industryTypeEidt: 'type/industryEdit/',
  industryTypeSave: 'type/saveIndustry',
  industryTypeDelete: 'type/publicSerrviceDelete/',
  industryTypeCheck: 'type/checkIndustryTypeName',
  industryTypeUpPic: 'upload/uploadTypePic',
  //    详情管理
  industryDetailList: 'industry/commentList',
  industryDetailComment: 'plate/commentDetail/',
  industryDetailDelete: 'plate/deleteComment/',


  // 4.服务评价
  evaList:'evaluation/adminEvaList/',
  evaSetend:'evaluation/setEvaEnd',
  evaDelete:'evaluation/adminEvaDele/',

  evaUserList: 'evauser/userList',
  evaUserAuth: 'evauser/userMenuList/',
  evaUserEdit: 'evauser/userEdit/',
  evaUserSave: 'evauser/saveUser/',
  evaUserDelete: 'evauser/userDelete/',
  evaUsercheckAccount: 'evauser/checkAccount/',
  evaUsercheckName: 'evauser/checkName/',
  evaUsercheckTelPhone: 'evauser/checkTelPhone/',
  evaUserTop: 'evauser/uperManagerList/',

  evaProbList: 'type/mapProblemList',
  evaProbEdit: 'type/mapProblemEdit/',
  evaProbDelete: 'type/mapDelete/',
  evaProbSave: 'type/saveProblem',
  evaProbCheck: 'type/findMapType',


  
  // 5.用户管理
  login: 'system/user/adminLogin',
  logout: 'newuser/logout',
};

for (let key in API) {
  if (API.hasOwnProperty(key)) {
    const KEY = key.toUpperCase();
    URL_API[KEY] = `${ROOT_URL}/${API[key]}`;
  }
}

export default URL_API;
