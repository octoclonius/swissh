import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import FileList from '../FileList/FileList';
import WISSHTerminal from '../WISSHTerminal/WISSHTerminal';
import './WISSHMain.css';
import 'react-resizable/css/styles.css';

const WISSHMain = ({ sessionID }) => {
  const [height, setHeight] = useState(408);

  const handleResize = (e, { size }) => {
    setHeight(size.height);
  };

  return (
    <div className='wissh-main'>

      <div className='file-container'>
        <FileList
          sessionID={sessionID}
        />
      </div>

      <span className='gap' />

      <ResizableBox
        width={Infinity}
        height={height}
        minConstraints={[Infinity, 10]}
        handle={(_, ref) => <span className='resize-handle' ref={ref} />}
        resizeHandles={['n']}
        onResize={handleResize}
        axis='y'
      >
        <WISSHTerminal
          termHeight={height}
        />
      </ResizableBox>
      
    </div>
  );
};

export default WISSHMain;