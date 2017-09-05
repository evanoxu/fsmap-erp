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

  export async function dataPlateLoad() {
    return Fetch.default({
      method: 'GET',
      url: APIPath.DATAPLATELOAD
    });
  }


