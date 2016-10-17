const http = require('http');
const httpProxy = require('http-proxy');
const accesses = require('accesses');
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

	const reqHost = req.headers.host;

	if (reqHost == null) {
		return;
	}

	switch (reqHost) {
		case 'misskey.xyz':
		case 'm.misskey.xyz':
		case 'mobile.misskey.xyz':
		case 'about.misskey.xyz':
		case 'signin.misskey.xyz':
		case 'signout.misskey.xyz':
		case 'signup.misskey.xyz':
		case 'status.misskey.xyz':
		case 'talk.misskey.xyz':
			proxy.web(req, res, { target: `http://${host}:${config.ports.web}` });
			break;
		case 'api.misskey.xyz':
			proxy.web(req, res, { target: `http://${host}:${config.ports.core}` });
			break;
		case 'himasaku.net':
			proxy.web(req, res, { target: `http://${host}:${config.ports.file}` });
			break;
		case 'proxy.himasaku.net':
			proxy.web(req, res, { target: `http://${host}:${config.ports.proxy}` });
			break;
		case 'log.misskey.xyz':
			proxy.web(req, res, { target: `http://${host}:616` });
			break;
		default:
			console.log(`Unknown host: ${reqHost}`);
			break;
	}
});

server.on('upgrade', (req, socket, head) => {
	const reqHost = req.headers.host;

	if (reqHost == null) {
		return;
	}

	switch (reqHost) {
		case 'misskey.xyz':
		case 'm.misskey.xyz':
		case 'mobile.misskey.xyz':
		case 'about.misskey.xyz':
		case 'signin.misskey.xyz':
		case 'signout.misskey.xyz':
		case 'signup.misskey.xyz':
		case 'status.misskey.xyz':
		case 'talk.misskey.xyz':
			proxy.ws(req, socket, head, { target: `ws://${host}:${config.ports.web}` });
			break;
		case 'api.misskey.xyz':
			proxy.ws(req, socket, head, { target: `ws://${host}:${config.ports.core}` });
			break;
		case 'log.misskey.xyz':
			proxy.ws(req, socket, head, { target: `ws://${host}:616` });
			break;
		default:
			console.log(`Unknown host: ${reqHost}`);
			break;
	}
});

accesses.attach(server);

server.listen(config.port);
