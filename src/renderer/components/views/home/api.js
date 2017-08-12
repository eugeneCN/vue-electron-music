import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  获取banner
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  banner(param, callback) {
    ajax(`${config}/banner`, param, callback)
  }
}
