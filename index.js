const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true } });
    win.maximize();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'contacts.html'),
        protocol: 'file:',
        slashes: true
    }));
}

app.on('ready', createWindow);