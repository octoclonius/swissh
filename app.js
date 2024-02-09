let https;
try {
    https = require('node:https');
} catch (err) {
    console.error('https support is disabled!');
}
const fs = require('node:fs');
const express = require('express');
const pty = require('node-pty');
const path = require('path');
const { WebSocketServer } = require('ws');
const { getShell } = require('./getShell');

/* Handles routes */
const app = express();
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* Handles terminal communication */
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on('connection', (ws, req) => {
    if (req.url === '/wissh') {
        const shell = getShell();
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-256color',
            cwd: process.env.HOME,
            env: process.env
        });

        ptyProcess.onData((data) => {
            ws.send(data);
        });

        ws.on('message', (message) => {
            /* TODO: Come up with a more robust solution for communicating resize events */
            try {
                const parsedMessage = JSON.parse(message);
                if (parsedMessage && parsedMessage.resize) {
                    const { cols, rows } = parsedMessage.resize;
                    ptyProcess.resize(cols, rows);
                } else {
                    throw error;
                }
            } catch (error) {
                ptyProcess.write(message);
            }
        });

        ws.on('close', () => {
            ptyProcess.kill();
        });
    }
});

/* Handles HTTP requests and links `app` with `wsServer` */
const server = https.createServer({
    key: fs.readFileSync('/etc/ssl/private/key.pem'),
    cert: fs.readFileSync('/etc/ssl/certs/certificate.pem')
}, app);

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
    });
});

server.listen(443);