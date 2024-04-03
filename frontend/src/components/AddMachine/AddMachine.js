import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileList from '../FileList/FileList';
import './AddMachine.css'

const initialState = {
  host: '',
  port: 22,
  username: '',
  password: '',
};

const AddMachine = () => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutID = setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch(`https://${window.location.hostname}:8000/auth`, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Error: Failed to add machine');
      }

      const responseData = await response.json();
      localStorage.files = JSON.stringify(responseData);

    } catch (e) {
      setError(`${e}`);
    } finally {
      clearTimeout(timeoutID);
      setLoading(false);
    }
  };

  return (
    <div className='add-machine'>
      <div className='modal-content'>
        <Link to='/' className='close'>
          &times;
        </Link>
        <form action='/auth' method='POST' onSubmit={onSubmitHandler}>
          <label htmlFor='host'>Host: </label>
          <input
            id='host'
            name='host'
            type='text'
            onChange={onChangeHandler}
            value={formState.host}
            required
          />
          <br />
          <label htmlFor='username'>Username: </label>
          <input
            id='username'
            name='username'
            type='text'
            onChange={onChangeHandler}
            value={formState.username}
            required
          />
          <br />
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={onChangeHandler}
            value={formState.password}
          />
          {error ? <div className='error'>{error}</div> : <br />}
          <br />
          <button type='submit' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMachine;