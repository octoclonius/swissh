import React from 'react';
import './File.css';

const File = ({ file }) => {
  return (
    <div className='file'>
      <span class='file-icon' />
      <tt>
        {file.filename}
      </tt>
    </div>
  );
};

export default File;