import { Fetch, APIPath } from '../utils';

export async function login (data) {
  return Fetch.default({
    method: 'POST',
    url: APIPath.LOGIN,
    data: data,
  });
}
