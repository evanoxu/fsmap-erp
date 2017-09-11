import * as Config from './config';
import * as Storage from './Storage';
import * as APIPath from './APIPath';
import * as Fetch from './request';
import * as City from './city';
import lodash from 'lodash';
import classnames from 'classnames';

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组格式转参数结构
 * @param   {array}     sourceArr
 * @return  {Array}
 */
const querySetParam = (sourceArr) => {
  let typeArr = [], finArr = [];
  for (let i = 0; i < sourceArr.length; i++) {
    let source = sourceArr[i].split(':');
    let type = source[0];
    let sour = source[1];
    if (typeArr.indexOf(type) == -1) {
      typeArr.push(type);
      finArr.push(sourceArr[i]);
    } else {
      let j = typeArr.indexOf(type);
      let arr = finArr[j] + '|' + sour;
      finArr.splice(j, 1, arr);
    }
  }
  return finArr.join(';');
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 网络类型数组拆分
 * @param   {array}     sourceData
 * @return  {object}    servers,netops
 */
const arrayToType = (sourceData) => {
  const servers = sourceData.map(function (item, index) {
    return {
      'label': item.typeName,
      'value': item.typeValue,
    };
  });
  const types = sourceData.map(function (item, index) {
    return item.typeList.map(function (k, i) {
      const servers_label = servers[index].label;
      const servers_value = servers[index].value;
      return {
        'label': servers_label + '-' + k.subTypeName,
        'value': servers_value + ':' + k.subTypeValue + '-' + k.speed,
      };
    });
  });
  const tagData = [].concat(...types);
  return {
    'servers': servers,
    'netops': tagData,
  };
}

/**
 * 动态加载script
 * @param   {String}    url
 * @param   {Func}      callback
 * @param   {String}    opt
 */
const loadScript = (url, callback, opt) => {
      var script = document.createElement("script");
      var opt = opt || {};
      script.type = "text/javascript";
      if (opt.charset) {
          script.charset = opt.charset;
      }
      if (opt.id) {
          script.id = opt.id;
      }

      if (script.readyState) {
          script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              if(callback) callback();
          }
      };
      } else {
            script.onload = function () {
              if(callback) callback();
            };
      }
      script.src = url;
      document.head.appendChild(script);
}
/**
 * 动态卸载script
 * @param   {String}    id
 */
const DelScript = (id) => {
    var box = document.getElementById(id);
    if(box){
      if(box.tagName=='SCRIPT'){
          document.head.removeChild(box);
      }else{
          document.body.removeChild(box);
      }
    }
}

export {
	Config,
	Storage,
	APIPath,
	Fetch,
  City,
	queryURL,
	queryArray,
	arrayToTree,
  querySetParam,
  arrayToType,
  loadScript,
  DelScript,
	classnames,
}