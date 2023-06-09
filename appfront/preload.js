"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    obtenerInfoUrl: (urlVideo) => __awaiter(void 0, void 0, void 0, function* () { return yield electron_1.ipcRenderer.invoke('obtenerInfoUrl', urlVideo); }),
    descargar: (info) => __awaiter(void 0, void 0, void 0, function* () { return electron_1.ipcRenderer.invoke('descargar', info); }),
    cargarEventos: electron_1.ipcRenderer.on('unir-video-finalizado', (event) => {
        console.log('Se ha descargado el video');
    }),
});
