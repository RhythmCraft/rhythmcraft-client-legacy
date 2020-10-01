const { app, BrowserWindow } = require('electron');


function createWindow() {
    let win = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: __dirname + '/icon.ico'
    });

    win.loadURL('https://rhythmcraft.hyonsu.com?isClient=true');
    win.setMenuBarVisibility(false);
    win.setFullScreen(true);
    win.setFullScreenable(false);

    const connection_timeout = setTimeout(() => {
        win.loadFile('./page/connect_failed.html');
    }, 3000);

    win.webContents.once('dom-ready', () => {
        clearTimeout(connection_timeout);
    });
}

app.whenReady().then(createWindow);

const client = require('discord-rich-presence')('760848542935154718');

global.globalVars = {};

global.globalVars.RichPresence = {
    details: '로그인',
    state: '로그인 중입니다.',
    startTimestamp: Date.now(),
    largeImageKey: 'main',
    smallImageKey: 'main',
    instance: true
}

client.updatePresence(global.globalVars.RichPresence);

let before_rich;
setInterval(() => {
    if(before_rich == global.globalVars.RichPresence) return;
    client.updatePresence(global.globalVars.RichPresence);
    before_rich = global.globalVars.RichPresence;
}, 1);
setInterval(() => {
    client.updatePresence(global.globalVars.RichPresence);
}, 15000);