import React, { useContext } from 'react';
import { auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const user = useContext(UserContext);
    let history = useHistory();

    const handleLogOut = (e) => {
        auth.signOut();
    }

    const loadPlantPage = (id) => {
        history.push(`/plants/${id}`);
    }

    return(
        <div>
            <p>Welcome back, {user.displayName}. Here's your list of plants:</p>
            <ul>
            {user.entries.map(entry => {
                return (
                    <li key={entry.id} onClick={() => loadPlantPage(entry.id)}>
                        {entry.name}
                    </li>
                )
            })}
            </ul>
            <button onClick={(e) => handleLogOut(e)}>logout</button>
        </div>
    )
}

export default Dashboard;