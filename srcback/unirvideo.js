"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unirVideo = void 0;
const child_process_1 = require("child_process");
const electron_1 = require("electron");
const unirVideo = (filename = 'video', videoStream, audioStream) => {
    let ffmpegProcess = (0, child_process_1.spawn)('ffmpeg', [
        '-i', 'pipe:3', '-i', 'pipe:4',
        '-map', '0:a', '-map', '1:v',
        '-c', 'copy',
        '-f', 'mp4', `${filename}.mp4`
    ], {
        windowsHide: true,
        stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe']
    });
    audioStream.pipe(ffmpegProcess.stdio[3]);
    videoStream.pipe(ffmpegProcess.stdio[4]);
    ffmpegProcess.on('close', () => {
        electron_1.ipcMain.emit('unir-video-finalizado');
    });
};
exports.unirVideo = unirVideo;
