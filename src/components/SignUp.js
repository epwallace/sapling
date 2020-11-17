import React, { useState } from 'react';
import { auth, generateUserDocument } from '../firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (e, email, password) => {
        e.preventDefault();
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, displayName);
        }
        catch(error) {
            setError('Error signing up with email and password');
        }
    };

    const onChangeHandler = (e) => {
        e.preventDefault();

        const {name, value} = e.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
        else if (name === 'userDisplayName') {
            setDisplayName(value);
        }
    };

    return (
        <div className='login-form'>
            <form>
                <p className='form-error'>{error}</p>
                <label htmlFor='userDisplayName'>Display Name:</label>
                <input
                    type='displayName'
                    name='userDisplayName'
                    value={displayName}
                    id='userDisplayName'
                    onChange={(e) => onChangeHandler(e)}
                />
                <label htmlFor='userEmail'>Email:</label>
                <input
                    type='email'
                    name='userEmail'
                    value={email}
                    id='userEmail'
                    onChange={(e) => onChangeHandler(e)}
                />

                <label htmlFor='userPassword'>Password:</label>
                <input
                    type='password'
                    name='userPassword'
                    value={password}
                    id='userPassword'
                    onChange={(e) => onChangeHandler(e)}
                />
                <button onClick={(e) => createUserWithEmailAndPasswordHandler(e, email, password)}>sign up</button>
            </form>
        </div>
    )
}

export default SignUp;