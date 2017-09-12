import { Fetch, APIPath } from '../utils';
  // evaList:'evaluation/adminEvaList/',
  // evaSetend:'evaluation/setEvaEnd',
  // evaDelete:'evaluation/adminEvaDele/',

  export async function evaList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVALIST+data.mapType,
      data: data,
    });
  }

  export async function evaSetend(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVASETEND,
      data: data
    });
  }


  export async function evaDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVADELETE,
      data: data,
    });
  }



  // evaUserList: 'evauser/userList',
  // evaUserAuth: 'evauser/userMenuList/',
  // evaUserEdit: 'evauser/userEdit/',
  // evaUserSave: 'evauser/saveUser/',
  // evaUserDelete: 'evauser/userDelete/',
  // evaUserTop: 'evauser/uperManagerList/',

  // evaUsercheckAccount: 'evauser/checkAccount/',
  // evaUsercheckName: 'evauser/checkName/',
  // evaUsercheckTelPhone: 'evauser/checkTelPhone/',

  export async function evaUserList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAUSERLIST,
      data: data,
    });
  }

  export async function evaUserAuth(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAUSERAUTH+data.id,
    });
  }

  export async function evaUserEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAUSEREDIT+data.id,
    });
  }


  export async function evaUserSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVAUSERSAVE,
      data: data,
    });
  }

  export async function evaUserDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVAUSERDELETE+data.id,
    });
  }

  export async function evaUserTop(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAUSERTOP,
    });
  }

  export async function evaUsermenus(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAUSERMENUS,
    });
  }



  // evaProbList: 'type/mapProblemList',
  // evaProbEdit: 'type/mapProblemEdit',
  // evaProbDelete: 'type/mapDelete/',
  // evaProbSave: 'type/saveProblem',

  // evaProbCheck: 'type/findMapType',


  export async function evaProbList(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAPROBLIST,
      data: data,
    });
  }


  export async function evaProbEdit(data) {
    return Fetch.default({
      method: 'GET',
      url: APIPath.EVAPROBEDIT+data.id,
    });
  }

  export async function evaProbDelete(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVAPROBDELETE+data.id,
    });
  }


  export async function evaProbSave(data) {
    return Fetch.default({
      method: 'POST',
      url: APIPath.EVAPROBSAVE,
      data: data,
    });
  }




