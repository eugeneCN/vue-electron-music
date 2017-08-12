import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  获取用户歌单
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  userPlay(param, callback) {
    ajax(`${config}/user/playlist`, param, callback)
  }
}
