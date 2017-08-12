import os from 'os'
import request from 'request'
import _ from 'lodash'
const platform = os.platform()
const color = 'color:rgb(66, 185, 131)'
/**
 *  获取Dom元素
 *  @param return
 */
export const $ = document.querySelector.bind(document)

/**
 *  获取平台信息
 *  @param {String}     types           win32(windows) || darwin(mac)
 *  @param return
 */
export function platforms(types) {
  if (types === 'darwin' || types === 'win32') {
    return platform === types
  }
  return undefined
}

/**
 *  判断对象是否为空
 *  @param {Object}     obj           对象
 *  @param return
 */
export function isNullObject(obj) {
  for (let i in obj) {
    return false
  }
  return true
}

/**
 *  封装ajax
 *  @param {String} 		url             请求地址
 *  @param {Object} 		param           请求参数
 *  @param {Function} 	callback      	请求成功后，服务器返回数据
 *  @param {Function} 	err      	      错误处理
 *  @param return
 */
export function ajax(url, param, callback, err) {
  console.log('%c接口: ' + url, color)
  console.log('%c参数: ' + JSON.stringify(param), color)
  var options = {
    method: 'GET',
    url: url,
    qs: param,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  console.log('request参数=> ', [options])
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // 返回json字符串 `{}`，最好做个判断
      if (body.startsWith('{') && body.endsWith('}')) {
        body = JSON.parse(body)
        console.log('成功返回=>', body)
        callback(body)
      } else {
        console.error(body)
      }
    } else {
      console.log('错误返回=>', error)
      if (_.isFunction(err)) err()
    }
  })
}
