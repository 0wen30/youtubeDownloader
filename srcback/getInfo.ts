import { getInfo, videoInfo, videoFormat } from 'ytdl-core'
import { video } from '../types/video';

export default async (url: string): Promise<video> => {
    const videoinfo: videoInfo = await getInfo(url);
    return {
        titulo: videoinfo.videoDetails.title,
        autor: videoinfo.videoDetails.author.name,
        length: videoinfo.videoDetails.lengthSeconds,
        views: videoinfo.videoDetails.viewCount,
        fecha: videoinfo.videoDetails.publishDate,
        formatos: videoinfo.formats.filter((format: videoFormat) => format.container === 'mp4'),
    }
}