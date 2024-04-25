import React from 'react';
import './File.css';

const File = ({ file }) => {
	const { name, isDir } = file; 

  return (
    <div className={file.isDir ? 'directory' : 'file'}>
	<span className={isDir ? 'folder-icon': 'file-icon'}></span>	
	<span className='file-name'>{name}</span>
      {file.filename}{file.isDir ? '/' : ''}
    </div>
  );
};

export default File;
