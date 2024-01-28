const http = require('node:http');
const express = require('express');
const path = require('path');
const { WebSocketServer } = require('ws');
const xterm = require('@xterm/xterm');
const { WebglAddon } = require('@xterm/addon-webgl');
const pty = require('node-pty');
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
    if (req.url === '/xterm') {
        const terminal = new xterm.Terminal();
        terminal.loadAddon(new WebglAddon());

        const shell = getShell();
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-color',
            cols: terminal.cols,
            rows: terminal.rows,
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
            terminal.dispose();
        });
    }
});

/* Handles HTTP requests and links `app` with `wsServer` */
const server = http.createServer(app);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
    });
});

const port = 8080;
const host = '0.0.0.0';
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});