import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Dashboard from './Dashboard';

const Application = () => {
    const user = useContext(UserContext);

    return(
        <div class='App'>
            <Header />
            <BrowserRouter>
                <Route exact path='/'>
                    {user
                        ? <Dashboard />
                        : <SignIn />}
                </Route>
                    {user
                        ? <Redirect to="/" />
                        : <Route path='/signup' component={SignUp} />}
            </BrowserRouter>
        </div>

    )
}

export default Application;