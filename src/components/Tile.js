import React, { Component } from 'react';

const Tile = (props) => {
    return(
        <a href="#" className="tile">
            <p>{props.plantName}</p>
        </a>
    )
}

export default Tile;