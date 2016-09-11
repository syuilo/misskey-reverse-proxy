const http = require('http');
const httpProxy = require('http-proxy');

const config = require('./config');

// Load Configuration
let conf;
try {
	conf = config();
} catch (e) {
	if (e.code !== 'ENOENT') {
		console.error('Failed to load configuration');
		process.exit(1);
	}
	console.error('Config not found');
	process.exit(1);
}

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
	const forwarded = req.headers['X-Forwarded-Proto'];

	if (typeof forwarded !== 'undefined' && forwarded !== null && forwarded === 'http' && conf.https) {
		res.writeHead(301, {
			'Location': 'https://' + req.host + req.originalUrl
		});
		res.end();
		return;
	}

	const domain = req.headers.host.replace(/\.?misskey\.xyz$/, '');
	switch (domain) {
		case '':
		case 'about':
		case 'signin':
		case 'signout':
		case 'signup':
		case 'status':
		case 'talk':
			proxy.web(req, res, { target: 'http://localhost:' + conf.ports.web });
			break;
		case 'api':
			proxy.web(req, res, { target: 'http://localhost:' + conf.ports.core });
			break;
		case 'file':
			proxy.web(req, res, { target: 'http://localhost:' + conf.ports.file });
			break;
		default:
			console.log(`Unknown domain: ${domain}`);
			break;
	}
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'ws://localhost:8001' });
});

server.listen(conf.port);
