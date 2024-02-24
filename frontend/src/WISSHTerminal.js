import React, { useEffect } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
//import { WebglAddon } from '@xterm/addon-webgl';
import { AttachAddon } from '@xterm/addon-attach';
import '@xterm/xterm/css/xterm.css'

function WISSHTerminal() {
  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(document.getElementById("terminal"));

    /* TODO: Fix/block xterm.js WebGL addon on mobile */
    /*const xtermWebglAddon = new WebglAddon();
    try {
      xtermWebglAddon.onContextLoss(() => {
        xtermWebglAddon.dispose();
      });
      terminal.loadAddon(xtermWebglAddon);
    } catch (err) {
      console.warn("Failed to load xterm WebGL addon", err);
      xtermWebglAddon.dispose();
    }*/

    const xtermFitAddon = new FitAddon();
    try {
      terminal.loadAddon(xtermFitAddon);
    } catch (err) {
      console.error("Failed to load xterm fit addon", err);
      xtermFitAddon.dispose();
    }

    const ws = new WebSocket('wss://127.0.0.1:8000/wissh');
    ws.onopen = () => {
      xtermFitAddon.fit();
      ws.send(JSON.stringify({ resize: { cols: terminal.cols, rows: terminal.rows } }));
    };

    const xtermAttachAddon = new AttachAddon(ws);
    try {
      terminal.loadAddon(xtermAttachAddon);
    } catch (err) {
      console.error("Failed to load xterm attach addon", err);
      xtermAttachAddon.dispose();
      ws.close();
    }

    const handleResize = () => {
      xtermFitAddon.fit();
      ws.send(JSON.stringify({ resize: { cols: terminal.cols, rows: terminal.rows } }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      terminal.dispose();
      //xtermWebglAddon.dispose();
      xtermFitAddon.dispose();
      xtermAttachAddon.dispose();
      ws.close();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div id="terminal" />;
};

export default WISSHTerminal;