import { auth } from '../firebase';
import React, { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (e, email, password) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                setError("Error signing in with email and password.");
                console.log("Error signing in with email and password.")
            })
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
    };

    return (
        <div className='login-form'>
            <form>
                <p className='form-error'>{error}</p>
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
                <button onClick={(e) => signInWithEmailAndPasswordHandler(e, email, password)}>sign in</button>
            </form>
        </div>
    )
}

export default SignIn;