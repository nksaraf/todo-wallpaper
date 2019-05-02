import { app, BrowserWindow, ipcMain, Tray } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
// import { enableLiveReload } from 'electron-compile';
import path from 'path';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  //enableLiveReload({ strategy: 'react-hmr' });
  require('electron-reload')(__dirname);
}



const createTray = () => {
  tray = new Tray(path.join(__dirname, 'logo.png'));
  // tray.setHighlightMode('never');

  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', function (event) {
    toggleWindow();

    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({mode: 'detach'});
    }
  });
};

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 10);
  return {x: x, y: y};
};

const toggleWindow = () => {
  mainWindow.isVisible() ? mainWindow.hide() : showWindow();
};

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
};

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 360,
    height: 600,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTray();
  createWindow();
});

ipcMain.on('show-window', () => {
  showWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
