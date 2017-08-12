import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  登录
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  login(param, callback) {
    ajax(`${config}/login/cellphone`, param, callback)
  },
  refresh(param, callback) {
    ajax(`${config}/login/refresh`, param, callback)
  }
}
