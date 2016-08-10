'use strict';

require('babel-register');
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const ipcMain       = electron.ipcMain;

const ROOT_PATH = `file://${__dirname}`;
let mainWindow  = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

  mainWindow = new BrowserWindow({width: 800, height: 600});


  if (process.env.APP_ENV === 'development') {

    mainWindow.loadURL(`${ROOT_PATH}/app/index.html`);
    mainWindow.webContents.openDevTools();

  } else {

    mainWindow.loadURL(`${ROOT_PATH}/dist/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("event-from-application", (sender, e) => {
  console.log(e);
});

