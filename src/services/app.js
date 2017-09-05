import { Fetch, APIPath } from '../utils';

export async function logout () {
	return Fetch.default({
		method: 'POST',
		url: APIPath.LOGOUT,
	})
}
