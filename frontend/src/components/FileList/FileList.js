import React from 'react';
import File from '../File/File';

const FileList = () => {
  /* TODO: Fix file list displaying */
  let files = localStorage.files ? JSON.parse(localStorage.files) : [];

  return (
    <div className='files'>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <File
              filename={file.filename}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;