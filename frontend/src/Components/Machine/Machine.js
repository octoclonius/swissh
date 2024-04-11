import React from 'react';
import './Machine.css';

const Machine = ({ name }) => {
  return (
    <div className='machine'>
      {name}
    </div>
  );
};

export default Machine;