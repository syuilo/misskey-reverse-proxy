/**
 * MODULE LOADS
 */ 
const path = require('path');
const fs = require('fs');

/**
 * META CONSTS
 */
const configDirPath = `${__dirname}${path.sep}..${path.sep}.config`
const configPath = `${configDirPath}${path.sep}config.json`;

/**
 * LOAD CONFIG
 */
module.exports = () => JSON.parse(fs.readFileSync(configPath, 'utf8'));