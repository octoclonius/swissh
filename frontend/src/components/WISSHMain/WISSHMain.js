import React from 'react';
import FileList from '../FileList/FileList';
import WISSHTerminal from '../WISSHTerminal/WISSHTerminal';
import './WISSHMain.css';

const WISSHMain = () => {
  return (
    <div className='wissh-main'>

      <div className='file-container'>
        <FileList />
      </div>

      <div className='wissh-term-container'>
        <WISSHTerminal />
      </div>
      
    </div>
  );
};

export default WISSHMain;