import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  搜索歌曲
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  search(param, callback, error) {
    ajax(`${config}/search`, param, callback, error)
  },
  loadUrl(param, callback, error) {
    ajax(`${config}/music/url`, param, callback, error)
  }
}
