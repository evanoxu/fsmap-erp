import { Fetch, APIPath } from '../utils';


export async function storeList(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.STORELIST+data.type,
    data: data,
  });
}

export async function storeUpDown(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.STOREUPDOWN+data.id+'/'+data.UDtype,
    data: data
  });
}



export async function storeNeedsList(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.STORENEEDSLIST+data.type,
    data: data,
  });
}

export async function storeNeedsDelete(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.STORENEEDSDELETE+data.id,
    data: data
  });
}