import { ChildProcess, spawn } from "child_process";
import { ipcMain } from "electron";
import { Readable, Writable } from "stream";

export const unirVideo = (filename = 'video', videoStream: Readable, audioStream: Readable) => {
    let ffmpegProcess: ChildProcess = spawn('ffmpeg', [
        '-i', 'pipe:3', '-i', 'pipe:4',
        '-map', '0:a', '-map', '1:v',
        '-c', 'copy',
        '-f', 'mp4', `${filename}.mp4`
    ], {
        windowsHide: true,
        stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe']
    });
    audioStream.pipe(ffmpegProcess.stdio[3] as Writable);
    videoStream.pipe(ffmpegProcess.stdio[4] as Writable);
    ffmpegProcess.on('close', () => {
        ipcMain.emit('unir-video-finalizado');
    });
}