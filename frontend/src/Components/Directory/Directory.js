import React from 'react';
import './Directory.css';

const Directory = ({ file, cwd, inCb, outCb }) => {
  return (
    <div className='directory'>
      <span class='directory-icon'></span>
      <tt className='directory-text'
        onClick={() => {
          if (file.filename === '..') {
            outCb(cwd);
          } else if (file.filename !== '.') {
            inCb(cwd, file.filename);
          }
        }}
      >
        {file.filename}
      </tt>
    </div>
  );
};

export default Directory;