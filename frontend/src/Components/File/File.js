import React from 'react';
import './File.css';

const File = ({ file }) => {
  return (
    <div className='file'>
      <span class='file-icon'>
        <tt>
          {file.filename}
        </tt>
      </span>
    </div>
  );
};

export default File;