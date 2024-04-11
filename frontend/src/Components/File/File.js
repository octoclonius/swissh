import React from 'react';

const File = ({ file }) => {
  const isDir = (file?.attrs?.mode & 0o040000) !== 0;

  return (
    <div className={isDir ? 'directory' : 'file'}>
      {file.filename}{isDir ? '/' : ''}
    </div>
  );
};

export default File;