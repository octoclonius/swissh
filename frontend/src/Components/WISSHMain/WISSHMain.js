import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import FileList from '../FileList/FileList';
import WISSHTerminal from '../WISSHTerminal/WISSHTerminal';
import './WISSHMain.css';
import 'react-resizable/css/styles.css';

const WISSHMain = () => {
  const [height, setHeight] = useState(408);

  const handleResize = (e, { size }) => {
    setHeight(size.height);
  };

  return (
    <div className='wissh-main'>

      <div className='file-container'>
        <FileList />
      </div>

      <span className='gap' />

      <ResizableBox
        width={Infinity}
        height={height}
        minConstraints={[Infinity, 10]}
        handle={(h, ref) => <span className={`resize-handle resize-handle-${h}`} ref={ref} />}
        resizeHandles={['n']}
        onResize={handleResize}
        axis='y'
      >
        <WISSHTerminal
          height={height}
        />
      </ResizableBox>
      
    </div>
  );
};

export default WISSHMain;