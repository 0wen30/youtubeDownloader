import { app, BrowserWindow, ipcMain } from "electron";
import { descargar, obtenerInfo } from './srcback/app';
import { videoFormat } from 'ytdl-core';

export default (createWindow: Function) => {
    app.whenReady().then(() => {
        createWindow();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    ipcMain.handle('obtenerInfoUrl', async(event, url: string) => await obtenerInfo(url))
    ipcMain.handle('descargar', async(event, info:{url:string, formato:videoFormat}) => await descargar(info))
} 
