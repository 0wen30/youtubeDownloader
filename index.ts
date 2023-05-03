import { BrowserWindow } from 'electron';
import { optionsWindow } from './config/config';
import eventos from './eventos';

const createWindow = () => {
    const win = new BrowserWindow(optionsWindow)
    win.loadFile('index.html');
}

eventos(createWindow);
