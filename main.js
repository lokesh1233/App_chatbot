"use strict";
/**
 * @description Main configuration file for application. 
 * build files path must be relative to the folder in angular.json file
 * @since
 * @author
 */
const { app, BrowserWindow, ipcMain, Menu, Tray, screen, nativeImage, nativeTheme } = require('electron'),
  url = require("url"),
  path = require("path"),
  // hideSplashscreen = require("./electron-config/screens/splash"),
  devMenus = require("./electron-config/menu/dev-menu"),
  mainMenus = require("./electron-config/menu/main-menu"),
  autoUpdater = require("./electron-config/updater/auto-update"),
  CookieService = require("./electron-config/storage/cookie");
const Store = require('electron-store'); 
const store = new Store();

let win;
let debug = false;
let tray = null;
let splashWindow = null;
let appIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/images/', 'received.jpg'));

/**
 * @description
 */
const setApplicationMenu = () => {
  const menus = [];
  if (debug !== false) {
    menus.push(devMenus);
  }
  //push other menus 
  menus.push(mainMenus);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};
/**
 * @description create a window
 */
const createWindow = () => {
  setApplicationMenu();
  // win.setMenu(null);// win.setAutoHideMenuBar(false);// win.setMenuBarVisibility(false);

  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;
  console.log("Height : " + height, " Width : " + width); // Height : 768  Width : 1366
  //create a main window
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 500,
    height: 600,
    x: width - 500,
    y: height - 630,
    frame: false,  // hide titlebar and menu
    closable: true,
    webPreferences: {
      nodeIntegration: true,
      // devTools: false
      webSecurity: false,
      allowRunningInsecureContent: true
    },
    // backgroundColor: '#fff',
    icon: appIcon, //`file://${__dirname}/dist/favicon.ico`
    type: 'dock',
    show: false // don't show the main window
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);

  openSplashScreen();
  // Don't show until we are fully ready and loaded
  win.once('ready-to-show', () => {
    splashWindow.hasShadow = true;
    splashWindow.destroy();
    // splashWindow.hide(); splashWindow.close(); 
    win.show();
    // Open the DevTools
    if (debug) win.webContents.openDevTools()
  });
  win.on('closed', function () {
    win = null
  });
  /**
   * @description using session 
   */
  const ses = win.webContents.session;
  console.log("=========User Session ", ses.getUserAgent())
  if(debug){
    // autoUpdater.checkForUpdates(); 
    // autoUpdater.checkForUpdatesAndNotify();
  }
};
/**
 * @description create browser window on ready
 */
app.on('ready', createWindow);

app.whenReady().then(() => {
  tray = new Tray("dist/favicon.ico");
  tray.setTitle('HR CHAT BOT');
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
app.on('activate', function () {
  if (win === null) createWindow()
});

/**
 * @description IPC communication
 * @since
 * @author
 */
const openModal = () => {
  let modal = new BrowserWindow({ parent: win, modal: true, show: false })
  modal.loadURL('https://www.google.com')
  modal.once('ready-to-show', () => {
    modal.show()
  });
}
// IPC message listeners
ipcMain.on('openModal', (event, arg) => {
  openModal()
});
/**
 * @description custom operation
 */
const doLogout = ((err, data) => {
  console.log(store.get('unicorn'));
  const id = store.get('id');
  console.log(id, " : Logout : " + data);

  const cookie = { url: 'http://www.github.com', name: 'github', value: 'sprint' };
  CookieService.set(cookie);
  CookieService.get().then((cookies) => {
    console.log("========Cookie Storage : ", cookies)
  }).catch((error) => {
    console.log(error)
  });
});

/**
 * @description Spalsh screen
 */
const openSplashScreen = () => {
  splashWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    type: 'splash',
    parent: win, modal: true, show: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    },
  });

  splashWindow.loadURL(`file://${__dirname}/dist/assets/app-loader.html`)
  splashWindow.once('ready-to-show', () => {
    splashWindow.show()
  });

  // create splash window
  /* 
  splashWindow.on('ready', () => {
  
    splashWindow.loadURL(`file://${__dirname}/dist/assets/app-loader.html`);
    // splashWindow.show();
    splashWindow.webContents.openDevTools();
    // let displays = screen.getAllDisplays()
    // let externalDisplay = displays.find((display) => {
    //   return display.bounds.x !== 0 || display.bounds.y !== 0
    // })
    
    // if (externalDisplay) {
    //   win = new BrowserWindow({
    //     x: externalDisplay.bounds.x + 50,
    //     y: externalDisplay.bounds.y + 50
    //   })
    //   win.loadURL('https://github.com')
    // }
  });
  */



}
// mainWindow.webContents.on('new-window', function(e, url) {
//   e.preventDefault();
//   require('electron').shell.openExternal(url);
// });
/**
 * @description hot reload application
 */
// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules/.bin/electron.cmd'),
//   hardResetMethod: 'exit'
// });
module.exports = win;
