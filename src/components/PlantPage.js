import React, { Component } from 'react';

const PlantPage = (props) => {
    const {key, plantName, plantNotes} = props.plant;
    return(
        <section className="plantPage">
            <h3>{plantName}</h3>
            <p>{plantNotes}</p>

            <button onClick={props.handleDelete} className="deleteButton">
                delete me
            </button>

        </section>
    )
}

export default PlantPage;