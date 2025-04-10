const { contextBridge } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Preload] Script loaded');
});

contextBridge.exposeInMainWorld('api', {
  sayHello: () => {
    console.log('[Preload] Hello from preload!');
  }
});
