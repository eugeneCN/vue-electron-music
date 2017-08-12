'use strict'

import { app, BrowserWindow } from 'electron'
import { command } from './command'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  const win = new BrowserWindow({
    height: 670,
    minHieght: 670,
    width: 1000,
    minWidth: 1000,
    useContentSize: true,
    transparent: false,
    frame: false,
    darkTheme: true,
    backgroundColor: '#FFFFFFFF'
  })

  win.loadURL(winURL)

  win.on('closed', () => {
    mainWindow = null
  })

  return win
}

app.on('ready', () => {
  mainWindow = createWindow()
  command(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
