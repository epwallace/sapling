import React from 'react';

const Tile = (props) => {

    return(
        <button onClick={props.clickHandler} className="tile raisedButton brownButton">
            <p>{props.plantName}</p>
        </button>
    )
}

export default Tile;