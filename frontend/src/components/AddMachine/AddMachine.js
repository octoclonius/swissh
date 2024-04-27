import React, { useState } from 'react';
import './AddMachine.css';

const initialState = {
  host: '',
  port: 22,
  username: '',
  password: '',
};

const AddMachine = ({ _hostname, _sessionID, onCloseHandler }) => {
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
      const res = await fetch(`https://${window.location.hostname}:8000/auth`, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        throw res.error;
      }

      const { hostname, sessionID } = await res.json();

      clearTimeout(timeoutID);
      setLoading(false);
      onCloseHandler(hostname, sessionID);
    } catch (e) {
      clearTimeout(timeoutID);
      setLoading(false);
      setError(`${e}`);
    }
  };

  return (
    <div className='add-machine'>
      <div className='modal-content'>
        <div className='close' onClick={() => { onCloseHandler(_hostname, _sessionID) }}>
          &times;
        </div>
        <form action='/auth' method='POST' onSubmit={onSubmitHandler}>
          <label htmlFor='host'>Host: </label>
          <input
            id='host'
            name='host'
            type='text'
            onChange={onChangeHandler}
            value={formState.host}
            autoComplete='on'
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
            autoComplete='username'
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
            autoComplete='current-password'
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