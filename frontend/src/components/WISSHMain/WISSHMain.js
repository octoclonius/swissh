import React from 'react';
import File from '../File/File';
import WISSHTerminal from '../WISSHTerminal/WISSHTerminal';
import './WISSHMain.css';

const WISSHMain = () => {
  return (
    <div className='wissh-main'>

      <div className='file-container'>
        <File />
      </div>

      <div className='wissh-term-container'>
        <WISSHTerminal />
      </div>
      
    </div>
  );
};

export default WISSHMain;