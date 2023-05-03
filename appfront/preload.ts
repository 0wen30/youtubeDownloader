import { contextBridge, ipcRenderer } from 'electron';
import { videoFormat } from 'ytdl-core';

contextBridge.exposeInMainWorld('electronAPI', {
    obtenerInfoUrl: async (urlVideo: string) => await ipcRenderer.invoke('obtenerInfoUrl', urlVideo),
    descargar: async (info: { url: string, formato: videoFormat }) => ipcRenderer.invoke('descargar', info),
    cargarEventos: ipcRenderer.on('unir-video-finalizado', (event) => {
        console.log('Se ha descargado el video');
    }),
});