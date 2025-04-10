// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false, // ❗ 크기 조절 방지
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'), // 위치 확인!
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    },
  });

  // ✅ 로그인 페이지부터 시작
  const devServerUrl = 'http://localhost:5173/login';
  mainWindow.loadURL(devServerUrl);

  // ✅ 확대 축소 방지
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1); // Ctrl+Scroll 막기
    mainWindow.webContents.setZoomFactor(1); // 줌 고정
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('web-contents-created', (event, contents) => {
  contents.on('before-input-event', (event, input) => {
    const blocked = (input.control || input.meta) &&
      ['=', '-', '+', '0'].includes(input.key.toLowerCase());
    if (blocked) event.preventDefault(); // Ctrl + +/-/0 차단
  });
});
