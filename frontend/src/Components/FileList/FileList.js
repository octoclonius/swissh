import React, { useState, useEffect } from 'react';
import File from '../File/File';
import Directory from '../Directory/Directory';
import './FileList.css';

const FileList = ({ sessionID }) => {
  const [desiredCwd, setDesiredCwd] = useState(['.']);
  const [cwd, setCwd] = useState(['.']);
  const [files, setFiles] = useState(null);

  const inDir = (_cwd, dir) => {
    setDesiredCwd([..._cwd, dir]);
    console.log(cwd.join('/'));
  };

  const outDir = (_cwd) => {
    setDesiredCwd(_cwd.length > 1 && _cwd[_cwd.length - 1] !== '..' ? _cwd.slice(0, -1) : [..._cwd, '..']);
    console.log(cwd.join('/'));
  };

  /* Heartbeat */
  useEffect(() => {
    const getFiles = async (_sessionID, _desiredCwd) => {
      console.log('Getting files in', _desiredCwd.join('/'));
      let newFiles = null;
      if (_sessionID) {
        const controller = new AbortController();
        const timeoutID = setTimeout(() => controller.abort(), 3000);
        let res = null;
        try {
          res = await fetch(`https://${window.location.hostname}:8000/api/readdir`, {
            signal: controller.signal,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionID: _sessionID,
              path: _desiredCwd.join('/')
            }),
          });

          clearTimeout(timeoutID);
  
          if (!res.ok) {
            throw res.error;
          }

          newFiles = (await res.json()).map(file => {
            const isDir = (file?.attrs?.mode & 0o040000) !== 0;
            return { ...file, isDir };
          });
        } catch (e) {
          console.warn(e);
          setDesiredCwd(['.']);
        }

        console.log(newFiles);
        setFiles(newFiles);
        setCwd(_desiredCwd);
      }
    }

    getFiles(sessionID, desiredCwd);

    const intervalID = setInterval(() => {
      getFiles(sessionID, desiredCwd);
    }, 5000);
    return () => clearInterval(intervalID);
  }, [sessionID, desiredCwd]);

  return (
    <div className='files'>
      {files &&
      <ul>
        {files?.map((file, index) => (
          file.isDir ?
          <li key={index}>
            <Directory
              file={file}
              cwd={cwd}
              inCb={inDir}
              outCb={outDir}
            />
          </li>
          :
          <li key={index}>
            <File
              file={file}
            />
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default FileList;