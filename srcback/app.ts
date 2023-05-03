import ytdl, { filterFormats,validateURL } from 'ytdl-core';
import getInfo from './getInfo';
import { unirVideo } from './unirvideo';
import { createWriteStream } from 'fs';
import { videoFormat } from 'ytdl-core';

export const obtenerInfo = async(url:string) => {
    if (!validateURL(url)) return
    return await getInfo(url)
};
export const descargar = async(info:{url:string, formato:videoFormat}) => {
    const videoInfo = await getInfo(info.url);
    try {
        const audioFormat = filterFormats(videoInfo.formatos, 'audioonly')[0];
        const video = await Promise.all([ytdl(info.url, { format: info.formato }), ytdl(info.url, { format: audioFormat })]);
        if(!Array.isArray(video)) throw new Error("error");
        if(!video[0]|| !video[1]) throw new Error("error");
        unirVideo(videoInfo.titulo,video[0],video[1]);
    } catch (error) {
        console.log(error)
        ytdl(info.url).pipe(createWriteStream(videoInfo.titulo+'.mp4'));
    }
}
