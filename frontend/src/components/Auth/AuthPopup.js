import React, { useState } from 'react';

const AuthPopup = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
    console.log('Logging in with:', username, password);
    onClose();
    };

    /* we can change it to a form??? */
    return (
        <div className='popupLogin'>
            <div className='popupLogin-inner'>
                <button className="close-btn" onClick={onClose}>Close</button>
                <h2>Please Login Here!</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Machine"
                    value={machine}
                    onChange={(e) => setMachine(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>

    )
};

export default AuthPopup;