import React from 'react';
import Machine from '../Machine/Machine';
import './MachineList.css';

const MachineList = ({ machines }) => {
  return (
    <div className='machine-list'>
      <ul>
        {machines.map((machine, index) => (
          <li key={index}>
            <Machine
              name={machine.name}
              username={machine.username}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MachineList;