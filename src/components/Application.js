import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Dashboard from './Dashboard';
import PlantPage from './PlantPage';
import PlantForm from './PlantForm';

const Application = () => {
    const user = useContext(UserContext);

    return(
        <div className='App'>
            <Header />
            <BrowserRouter>
                <Route exact path='/'>
                    {user
                        ? <Dashboard />
                        : <SignIn />}
                </Route>
                <Route path='/signin'>
                    {user
                        ? <Redirect to='/' />
                        : <SignIn /> }
                </Route>
                <Route path='/signup'>
                    {user
                        ? <Redirect to="/" />
                        : <Route path='/signup' component={SignUp} />}
                </Route>
                <Route path='/plants/:id/edit'>
                    <PlantForm />
                </Route>
                <Route exact path='/plants/:id'>
                    <PlantPage />
                </Route>
            </BrowserRouter>
        </div>

    )
}

export default Application;