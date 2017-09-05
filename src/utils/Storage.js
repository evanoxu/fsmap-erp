/**
 * [setStorage 设置本地存储,避免多次调用JSON.stringify方法，并对数据类型做了判断，避免字符串数据的多次转化]
 * @param {[String]} key  [key识别]
 * @param {[Unknown]} data [存储的数据]
 */
export const setStorage = ( key, data) => {
  var toString = Object.prototype.toString,
    notString = toString.call(data) !== '[object String]'
    // console.log(data)
  // estimate the type of data
  if (notString) {
    localStorage.setItem(key, JSON.stringify(data))
  }else {
    localStorage.setItem(key, data)
  }
}

/**
 * [getStorage 获取本地存储]
 * @param  {[String]} key [key识别]
 * @return {[type]}     [description]
 */
export const getStorage = (key) => {
  var data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

/**
 * [removeStorage]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
export const removeStorage = (key) => {
  key && localStorage.removeItem(key)
}