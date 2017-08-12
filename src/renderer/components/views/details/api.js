import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  获取歌单详情
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  playDetails(param, callback) {
    ajax(`${config}/playlist/detail`, param, callback)
  }
}
