import React from 'react';
import './Directory.css';

const Directory = ({ file, cwd, inCb, outCb }) => {
  return (
    <tt className='directory'
      onClick={() => {
        if (file.filename === '..') {
          outCb(cwd);
        } else if (file.filename !== '.') {
          inCb(cwd, file.filename);
        }
      }}
    >
      {file.filename}/
    </tt>
  );
};

export default Directory;