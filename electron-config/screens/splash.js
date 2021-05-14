const { initSplashScreen, OfficeTemplate } = require('electron-splashscreen');
// import isDev from 'electron-is-dev';
// import { resolve } from 'app-root-path';
 const win = require('../../main');
 
const hideSplashscreen = initSplashScreen({
    win,
//   icon: isDev ? resolve('assets/icon.ico') : undefined,
  url: OfficeTemplate,
  width: 500,
  height: 300,
  brand: 'My Brand',
  productName: 'My App',
//   logo: resolve('assets/logo.svg'),
  website: 'www.my-brand.com',
  text: 'Initializing ...'
});

module.exports = hideSplashscreen;