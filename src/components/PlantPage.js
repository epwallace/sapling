import React, { useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

const PlantPage = (props) => {
    const user = useContext(UserContext);
    let { id } = useParams();
    let history = useHistory();

    const {name, notes} = user.entries.find(entry => entry.name === id);

    const loadEditPage = () => {
        history.push(`/plants/${id}/edit`);
    }

    return(
        <section className="plantPage">
            <p><Link to='/'>Return to dashboard.</Link></p>
            <h3>{name}</h3>
            <p>{notes}</p>

            <div className="buttonsContainer">
                <button onClick={() => loadEditPage(id)} className="raisedButton greenButton">
                    edit this plant
                </button>

                <button className="raisedButton greenButton">
                    delete this plant
                </button>
            </div>

        </section>
    )
}

export default PlantPage;