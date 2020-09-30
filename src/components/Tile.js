import React, { Component } from 'react';

const Tile = (props) => {

    return(
        <button onClick={props.clickHandler} className="tile">
            <p>{props.plantName}</p>
        </button>
    )
}

export default Tile;