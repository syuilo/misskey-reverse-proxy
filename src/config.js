const path = require('path');
const fs = require('fs');

const configDirPath = `${__dirname}${path.sep}..${path.sep}.config`
const configPath = `${configDirPath}${path.sep}config.json`;

const config = require(configPath);

module.exports = config;
