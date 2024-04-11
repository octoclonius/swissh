import React from 'react';

const File = ({ file }) => {
  return (
    <div className={file.isDir ? 'directory' : 'file'}>
      {file.filename}{file.isDir ? '/' : ''}
    </div>
  );
};

export default File;