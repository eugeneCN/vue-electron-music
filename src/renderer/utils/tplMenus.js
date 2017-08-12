import store from '@/store'
import { session } from '@/utils/storage'
import { remote } from 'electron';
// const BrowserWindow = remote.BrowserWindow;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const menu = new Menu()
const appMenu = {
  init: function () {
    this.palyMenu()
  },
  palyMenu: function () {
    var taht = this;
    var settings = {
      paly: {
        label: '播放',
        click: function () {
          var audio = session.getItem('AUDIO')
          store.dispatch('setMusicList', audio)
          store.dispatch('loadMusicUrl', audio.id)
        }
      },
      addPlayList: {
        label: '添加到播放列表',
        click: function () {
          var audio = session.getItem('AUDIO')
          store.dispatch('setMusicList', audio)
        }
      },
      collect: {
        label: '收藏'
      },
      share: {
        label: '分享'
      },
      copyLink: {
        label: '复制链接'
      }
    }

    menu.append(new MenuItem(settings.paly))
    menu.append(new MenuItem(settings.addPlayList))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem(settings.collect))
    menu.append(new MenuItem(settings.share))
    menu.append(new MenuItem(settings.copyLink))
  }
}

appMenu.init();
export function settingsMenu(item) {
  menu.popup(remote.getCurrentWindow())
  window.preventDefault()
}
