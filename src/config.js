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
let config;
try {
	config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
	if (e.code !== 'ENOENT') {
		console.error('Failed to load configuration');
		process.exit(1);
	}
	console.error('Config not found');
	process.exit(1);
}

module.exports = config;
