const cluster = require('cluster');

// Master
if (cluster.isMaster) {

	// Count the machine's CPUs
	const cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
}
// Workers
else {
	require('./server');
}
