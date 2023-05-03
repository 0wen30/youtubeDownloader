import { videoFormat } from 'ytdl-core';

export type video = {
    titulo: string,
    autor: string,
    length: string,
    views: string,
    fecha: string,
    formatos: videoFormat[],
};