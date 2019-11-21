#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var run_1 = require("./run");
var path_1 = require("path");
var typescript_1 = require("typescript");
var fs_1 = require("fs");
var pkg = require('../package.json');
commander_1.default.version(pkg.version)
    .option("-w, --watch", '监听文件变化')
    .option("-o, --output [path]", '输出文件')
    .parse(process.argv);
var root = process.cwd();
var packageJson = require(path_1.join(root, 'package.json'));
var defaultConfig = typescript_1.findConfigFile(process.cwd(), function (file) {
    return fs_1.existsSync(file);
}) || path_1.join(process.cwd(), 'tsconfig.json');
var output = path_1.join(commander_1.default.output || 'dist', packageJson.name);
var options = {
    src: process.cwd(),
    output: output,
    types: output,
    tsconfig: defaultConfig,
    watch: !!commander_1.default.watch
};
try {
    run_1.run(options);
}
catch (e) {
    throw e;
}
