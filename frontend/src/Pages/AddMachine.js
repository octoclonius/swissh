import React from 'react';
import MachineList from '../Components/MachineList/MachineList';

const AddMachine = () => {
  /* Placeholder machines */
  const machines = [
    { name: 'student10.cse.nd.edu', username: 'abannan' },
    { name: 'student10.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student10.cse.nd.edu', username: 'hsanche5' },
    { name: 'student10.cse.nd.edu', username: 'jporubci' },
    { name: 'student10.cse.nd.edu', username: 'kwilli29' },
    { name: 'student11.cse.nd.edu', username: 'abannan' },
    { name: 'student11.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student11.cse.nd.edu', username: 'hsanche5' },
    { name: 'student11.cse.nd.edu', username: 'jporubci' },
    { name: 'student11.cse.nd.edu', username: 'kwilli29' },
    { name: 'student12.cse.nd.edu', username: 'abannan' },
    { name: 'student12.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student12.cse.nd.edu', username: 'hsanche5' },
    { name: 'student12.cse.nd.edu', username: 'jporubci' },
    { name: 'student12.cse.nd.edu', username: 'kwilli29' },
    { name: 'student13.cse.nd.edu', username: 'abannan' },
    { name: 'student13.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student13.cse.nd.edu', username: 'hsanche5' },
    { name: 'student13.cse.nd.edu', username: 'jporubci' },
    { name: 'student13.cse.nd.edu', username: 'kwilli29' },
    { name: 'student14.cse.nd.edu', username: 'abannan' },
    { name: 'student14.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student14.cse.nd.edu', username: 'hsanche5' },
    { name: 'student14.cse.nd.edu', username: 'jporubci' },
    { name: 'student14.cse.nd.edu', username: 'kwilli29' },
    { name: 'student15.cse.nd.edu', username: 'abannan' },
    { name: 'student15.cse.nd.edu', username: 'cvalenc3' },
    { name: 'student15.cse.nd.edu', username: 'hsanche5' },
    { name: 'student15.cse.nd.edu', username: 'jporubci' },
    { name: 'student15.cse.nd.edu', username: 'kwilli29' },
  ];

  return (
    <MachineList machines={machines} />
  );
}

export default AddMachine;