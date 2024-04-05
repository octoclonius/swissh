import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { AttachAddon } from '@xterm/addon-attach';
import '@xterm/xterm/css/xterm.css';

const WISSHTerminal = ({ termHeight }) => {
  const termRef = useRef(null);

  useEffect(() => {
    const term = new Terminal();
    const addonFit = new FitAddon();
    const ws = new WebSocket(`wss://${window.location.hostname}:8000/wissh`);
    const addonAttach = new AttachAddon(ws);
    
    term.open(termRef.current);

    term.loadAddon(addonFit);
    term.loadAddon(addonAttach);

    const handleResize = () => {
      let timeoutID;
      return () => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          term.height = termHeight;
          addonFit.fit();
          ws.send(JSON.stringify({ resize: { cols: term.cols, rows: term.rows } }));
        }, 100);
      };
    };

    ws.onopen = () => {
      window.addEventListener('resize', handleResize);
      handleResize();
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      ws.readyState === WebSocket.OPEN && ws.close();
      addonAttach.dispose();
      addonFit.dispose();
      term.dispose();
    };
  }, [termHeight]);

  return <div ref={termRef} className='wissh-term'/>;
}

export default WISSHTerminal;