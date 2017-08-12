import { ipcRenderer, remote } from 'electron';
import { renderer } from '@/utils/ipcRenderer'
import { session } from '@/utils/storage'
renderer()
export const app = {
  showMenus() {
    /**
     *  显示原生下拉菜单
     *  @param return
     */
    // settingsMenu()
    ipcRenderer.send('show-content-menu', session.getItem('CREATEPLAY'))
  },
  openDialog() {
    /**
     *  打开登录新窗口
     *  @param return
     */
    ipcRenderer.send('open-login-window', `${window.location.origin}/#/login`)
  },
  closeDialog() {
    /**
     *  关闭登录新窗口
     *  @param return
     */
    ipcRenderer.send('close-login-window')
  },
  sendUserData(data) {
    /**
     *  登录成功发送登录信息
     *  @param {Object}   登录详情
     */
    ipcRenderer.send('user-data', data)
  },
  loadUserData(callback) {
    /**
     *  登录成功接收登录信息
     *  @param {Function}   接收成功返回
     */
    remote.ipcMain.on('user-data', (event, data) => {
      callback(data)
    })
  }
}

export function isDialog(dialog) {
  if (dialog) {
    app.openDialog()
  } else {
    app.closeDialog()
  }
}
