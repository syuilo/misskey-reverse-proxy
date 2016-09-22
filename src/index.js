const http = require('http');
const httpProxy = require('http-proxy');
const config = require('./config');
const host = 'localhost';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
	const forwarded = req.headers['X-Forwarded-Proto'];

	if (forwarded && forwarded === 'http' && config.https) {
		res.writeHead(301, {
			'Location': 'https://' + req.host + req.originalUrl
		});
		res.end();
		return;
	}

	const host = req.headers.host;

	if (host == null) {
		return;
	}

	const domain = host.replace(/\.?misskey\.xyz$/, '');
	switch (domain) {
		case '':
		case 'about':
		case 'signin':
		case 'signout':
		case 'signup':
		case 'status':
		case 'talk':
			proxy.web(req, res, { target: `http://${host}:${config.ports.web}` });
			break;
		case 'api':
			proxy.web(req, res, { target: `http://${host}:${config.ports.core}` });
			break;
		case 'file':
			proxy.web(req, res, { target: `http://${host}:${config.ports.file}` });
			break;
		default:
			console.log(`Unknown domain: ${domain}`);
			break;
	}
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: `ws://${host}:${config.ports.core}` });
});

server.listen(config.port);
