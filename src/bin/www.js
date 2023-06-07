#!/usr/bin/env node
import 'dotenv/config';
import 'module-alias/register';

import createDebugger from 'debug';
import http from 'http';

import app from '../app';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		// Named pipe
		return val;
	}

	if (port >= 0) {
		// Port number
		return port;
	}

	return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const debug = createDebugger('api:server');

/**
 * Event listener for HTTP server "error" event.
 * @param {Error} error The thrown error when trying to connect to the port.
 * @returns {void}
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// Handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(`${bind} requires elevated privileges`);
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(`${bind} is already in use`);
		process.exit(1);
		break;
	default:
		throw error;
	}
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Keep alive for AWS
 */
server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`
 

/**
 * Event listener for HTTP server "listening" event.
 * @returns {void}
 */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Listening on port ${port}`));
server.on('error', onError);
server.on('listening', onListening);
