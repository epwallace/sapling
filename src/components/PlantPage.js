import React from 'react';

const PlantPage = (props) => {
    const {plantName, plantNotes} = props.plant;
    return(
        <section className="plantPage">
            <h3>{plantName}</h3>
            <p>{plantNotes}</p>

            <div className="buttonsContainer">
                <button onClick={props.handleEdit} className="raisedButton greenButton">
                    edit this plant
                </button>

                <button onClick={props.handleDelete} className="raisedButton greenButton">
                    delete this plant
                </button>
            </div>

        </section>
    )
}

export default PlantPage;