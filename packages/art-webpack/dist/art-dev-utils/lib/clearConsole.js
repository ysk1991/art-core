"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clearConsole = () => {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
};
exports.default = clearConsole;
