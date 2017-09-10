import { Fetch, APIPath } from '../utils';

export async function msgList(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.MSGLIST,
    data: data,
  });
}

export async function msgSave(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.MSGSAVE,
    data: data
  });
}


export async function msgDelete(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.MSGDELETE,
    data: data,
  });
}




export async function actList(data) {
  return Fetch.default({
    method: 'GET',
    url: APIPath.ACTLIST,
    data: data,
  });
}

export async function actSave(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.ACTSAVE,
    data: data
  });
}


export async function actDelete(data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.ACTDELETE+data.id,
    data: data,
  });
}
