// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false, // ❗ 창 크기 조절 방지
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'), // ✅ preload 위치 확인
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    },
  });

  // ✅ React 개발 서버 (로그인 페이지부터 시작)
  const devServerUrl = 'http://localhost:5173/login';
  mainWindow.loadURL(devServerUrl);

  // ✅ 개발자 도구 자동 열기 (Electron 콘솔/네트워크 확인용)
  mainWindow.webContents.openDevTools();

  // ✅ 확대/축소 방지
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1); // Ctrl + Scroll 확대 차단
    mainWindow.webContents.setZoomFactor(1); // 줌 고정
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ✅ 앱 준비되면 창 생성
app.whenReady().then(createWindow);

// ✅ 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ✅ Ctrl + = / - / 0 등 확대/축소 단축키 차단
app.on('web-contents-created', (event, contents) => {
  contents.on('before-input-event', (event, input) => {
    const blocked = (input.control || input.meta) &&
      ['=', '-', '+', '0'].includes(input.key.toLowerCase());
    if (blocked) event.preventDefault();
  });
});
