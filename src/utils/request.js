import qs from 'qs';
import axios from 'axios';

const fetchPath = (options) => {
  let {
    method,
    data,
    url,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data });
    case 'post':
      return axios.post(url, qs.stringify(data));
    default:
      return axios(options);
  }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  return fetchPath(options).then((response) => {
    const { resultCode, data, resultMessage } = response.data;
    return {
      statusMsg: resultMessage,
      statusCode: resultCode,
      ...data,
    };
  }).catch((error) => {
    const { message } = error;
    return {
      statusMsg: message,
      statusCode: -1000,
    };
  });
}

