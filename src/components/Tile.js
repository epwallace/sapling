import React, { Component } from 'react';

const Tile = (props) => {

    return(
        <button onClick={props.clickHandler} className="tile">
            {props.plantName}
        </button>
    )
}

export default Tile;