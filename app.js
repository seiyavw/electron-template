'use strict';

require('babel-register');

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const ipcMain       = electron.ipcMain;
const serialPort = require('serialport');

const ROOT_PATH = `file://${__dirname}`;
let mainWindow  = null;

/* ==================
       window
 ====================*/
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

  mainWindow = new BrowserWindow({width: 1200, height: 800});
  // mainWindow.maximize();


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

/* ==================
         menu
 ====================*/
// TODO: add application menu



/* ==================
        events
 ====================*/
ipcMain.on("event-from-application", (sender, e) => {
  console.log(e);
});


/* ==================
       serials
 ====================*/

const port = new serialPort.SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 9600,
  parser:serialPort.parsers.readline("\n")
});

port.on('data', (data) => {
  console.log('data received: ' + data);
});
