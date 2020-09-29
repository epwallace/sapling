import React, { Component } from 'react';

const PlantPage = (props) => {
    return(
        <section className="plantPage">
            <h3>{props.plantName}</h3>
            <p>{props.plantNotes}</p>
        </section>
    )
}

export default PlantPage;