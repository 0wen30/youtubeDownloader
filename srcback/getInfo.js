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
const ytdl_core_1 = require("ytdl-core");
exports.default = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const videoinfo = yield (0, ytdl_core_1.getInfo)(url);
    return {
        titulo: videoinfo.videoDetails.title,
        autor: videoinfo.videoDetails.author.name,
        length: videoinfo.videoDetails.lengthSeconds,
        views: videoinfo.videoDetails.viewCount,
        fecha: videoinfo.videoDetails.publishDate,
        formatos: videoinfo.formats.filter((format) => format.container === 'mp4'),
    };
});
