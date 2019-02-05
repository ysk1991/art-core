"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const env_1 = require("../utils/env");
const webpack_config_dev_1 = __importDefault(require("./webpack.config.dev"));
const webpack_config_prod_1 = __importDefault(require("./webpack.config.prod"));
exports.getWebpackConfig = () => {
    const entry = configWebpackModules_1.webpackEntries();
    const output = configWebpackModules_1.webpackOutput();
    if (!env_1.isProd()) {
        return new webpack_config_dev_1.default(entry, output);
    }
    else {
        return new webpack_config_prod_1.default(entry, output);
    }
};
