import React, { useState, useEffect } from 'react';
import File from '../File/File';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sessionID = localStorage.getItem('sessionID');
      if (sessionID !== null) {
        const controller = new AbortController();
        const timeoutID = setTimeout(() => controller.abort(), 3000);
        try {
          const res = await fetch(`https://${window.location.hostname}:8000/api/readdir`, {
            signal: controller.signal,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionID: sessionID,
              path: '.'
            }),
          });

          if (!res.ok) {
            throw new Error('Error: Failed to add machine');
          }

          setFiles((await res.json()).map(file => {
            const isDir = (file?.attrs?.mode & 0o040000) !== 0;
            return { ...file, isDir };
          }));
        } catch (e) {
          console.warn(e);
          localStorage.removeItem('sessionID');
          setFiles([]);
        } finally {
          clearTimeout(timeoutID);
        }
      }
    }

    const intervalID = setInterval(fetchData, 4000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className='files'>
      <ul>
        {files?.map((file, index) => (
          <li key={index}>
            <File
              file={file}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;