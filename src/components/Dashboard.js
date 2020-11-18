import React, { useContext } from 'react';
import { auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const Dashboard = () => {
    const user = useContext(UserContext);

    const handleLogOut = (e) => {
        auth.signOut();
    }

    return(
        <div>
            <p>Welcome back, {user.displayName}.</p>
            <button onClick={(e) => handleLogOut(e)}>logout</button>
        </div>
    )
}

export default Dashboard;