"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descargar = exports.obtenerInfo = void 0;
const ytdl_core_1 = __importStar(require("ytdl-core"));
const getInfo_1 = __importDefault(require("./getInfo"));
const unirvideo_1 = require("./unirvideo");
const fs_1 = require("fs");
const obtenerInfo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, ytdl_core_1.validateURL)(url))
        return;
    return yield (0, getInfo_1.default)(url);
});
exports.obtenerInfo = obtenerInfo;
const descargar = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const videoInfo = yield (0, getInfo_1.default)(info.url);
    try {
        const audioFormat = (0, ytdl_core_1.filterFormats)(videoInfo.formatos, 'audioonly')[0];
        const video = yield Promise.all([(0, ytdl_core_1.default)(info.url, { format: info.formato }), (0, ytdl_core_1.default)(info.url, { format: audioFormat })]);
        if (!Array.isArray(video))
            throw new Error("error");
        if (!video[0] || !video[1])
            throw new Error("error");
        (0, unirvideo_1.unirVideo)(videoInfo.titulo, video[0], video[1]);
    }
    catch (error) {
        console.log(error);
        (0, ytdl_core_1.default)(info.url).pipe((0, fs_1.createWriteStream)(videoInfo.titulo + '.mp4'));
    }
});
exports.descargar = descargar;
