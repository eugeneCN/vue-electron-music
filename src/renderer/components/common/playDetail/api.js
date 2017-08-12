import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'
/**
 *  获取歌词
 *  @param {Object}       param     参数
 *  @param {Function}     callback  返回函数
 *  @param return
 */
export default {
  loadLyric(param, callback) {
    ajax(`${config}/lyric`, param, callback)
  }
}
