const cluster = require('cluster');
const accesses = require('accesses');

// Master
if (cluster.isMaster) {

	// Count the machine's CPUs
	const cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}

	accesses.serve({
		appName: 'Misskey',
		port: 616
	});
}
// Workers
else {
	require('./server');
}
