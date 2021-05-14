"use strict";
const {autoUpdater} = require("electron-updater");
const  electronLog  = require("electron-log");


autoUpdater.logger = electronLog;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "" };
autoUpdater.autoDownload = true;
autoUpdater.currentVersion = "0.0.0"; //each time you publish new version, it will be updated

// autoUpdater.setFeedURL({
//   "provider":"gitlab",
//   "owner":"uday",
//   "repo": "electron-updater",
//   "token":"",
//   "url":"https://gitlab.com/<owner>/electron-updater/releases/${platform}/${version}"
// });
  
// process.env.GH_TOKEN = "";
  
// const sendStatusToWindow = (message)=>{
//     if(mainWindow){
//         mainWindow.webContents.send("message",message)
//     }
// };

autoUpdater.on('checking-for-update',()=>{
    console.log('checking for update');
  });
  
  autoUpdater.on('update-available', () =>{
    console.log('update is available');
    // # confirm install or not to user
    var index = dialog.showMessageBox(mainWindow, {
        type: 'info',
        buttons: ['Ok'],
        title: "HR BOT",
        message: 'A new version of this app is getting downloaded.'
    });
  
    if(index === 1){
        return;
    }
  
    autoUpdater.on('update-downloaded', function (event,releaseName) {
  
        // # confirm install or not to user
        var index = dialog.showMessageBox(mainWindow, {
            type: 'info',
            buttons: ['Restart','Later'],
            title: "HR CHAT BOT ",
            message: 'New version has been downloaded. Please restart the application to apply the updates.',
            detail: releaseName
        });
  
        if (index === 1) {
            return;
        }
  
        // # restart app, then update will be applied
        autoUpdater.quitAndInstall();
    });
  
  });
  
  autoUpdater.on('update-not-available', () =>{
    console.log('update not available');
    return;
  });
  autoUpdater.on('download-progress', (progress) =>{
    let log_message = "Download speed: " + progress.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progress.percent + '%';
    log_message = log_message + ' (' + progress.transferred + "/" + progress.total + ')';
    console.log('Download progress ==>' , log_message);
    // sendStatusToWindow(`Download progress`);
    return;
  });
  autoUpdater.on('error', () => {
    console.log('error occured');
    return;
  })
module.exports = autoUpdater;
// var electronInstaller = require('electron-winstaller');
// resultPromise = electronInstaller.createWindowsInstaller({
//     appDirectory: '\Company-win32-ia32',
//     outputDirectory: 'C:/release32',
//     loadingGif: './loader.gif',
//     authors: '',
//     exe: 'Comany.exe',
//     description: '',
//     certificateFile: './Cert/xyz.pfx',
//     certificatePassword: 'iamnotidiot',
//     setupIcon: './icon.ico',
//     iconUrl: 'https://company.in/favicon/favicon.ico',
//     setupExe: 'CompanyApp.exe',
//     noMsi: true,
//     remoteReleases: 'https://s3-us-west-2.amazonaws.com/vcompany/desktop/',

// });
// resultPromise.then(() => console.log("It worked!"), (e) => console.log("Not worked"));