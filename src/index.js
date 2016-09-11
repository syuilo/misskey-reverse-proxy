const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
	const forwarded = req.headers['X-Forwarded-Proto'];

	if (typeof forwarded !== 'undefined' && forwarded !== null && forwarded === 'http') {
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
			proxy.web(req, res, { target: 'http://localhost:8000' });
			break;
		case 'api':
			proxy.web(req, res, { target: 'http://localhost:8001' });
			break;
		case 'file':
			proxy.web(req, res, { target: 'http://localhost:8002' });
			break;
		default:
			console.log(`Unknown domain: ${domain}`);
			break;
	}
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'ws://localhost:8001' });
});

server.listen(80);
