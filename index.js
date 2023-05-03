"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const config_1 = require("./config/config");
const eventos_1 = __importDefault(require("./eventos"));
const createWindow = () => {
    const win = new electron_1.BrowserWindow(config_1.optionsWindow);
    win.loadFile('index.html');
};
(0, eventos_1.default)(createWindow);
