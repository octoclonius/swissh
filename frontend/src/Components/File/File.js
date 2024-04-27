import React from 'react';
import './File.css';

const File = ({ file }) => {
  return (
    <div className='file'>
      <tt>
        {file.filename}
      </tt>
    </div>
  );
};

export default File;