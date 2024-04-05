import React, { useState, useEffect } from 'react';
import File from '../File/File';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.sessionID) {
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
              sessionID: localStorage.sessionID,
              path: '.'
            }),
          });

          if (!res.ok) {
            throw new Error('Error: Failed to add machine');
          }

          setFiles(await res.json());
        } catch (e) {
          console.warn(e);
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
              filename={file.filename}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;