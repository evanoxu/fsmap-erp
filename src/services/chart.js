import { Fetch, APIPath } from '../utils';


export async function chartList(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.CHARTLIST,
    data: data,
  });
}

export async function chartUpDown(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.CHARTUPDOWN+data.id+'/'+data.type,
    data: data
  });
}

export async function chartDelete(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.CHARTDELETE+data.id,
    data: data
  });
}