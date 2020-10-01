import React from 'react';
import Tile from './Tile.js';

const TilesContainer = (props) => {
    const { plants, clickHandler } = props;
    if (plants.length === 0) {
        console.log('nothing here');
        return (
            <p className="noPlantsMsg">
                You haven't added any plants yet! Click the button below to get started.
            </p>
        );
    } else {
        return(
            <div className="tilesContainer">
                {plants.map((plant) => {
                    return(
                        <Tile
                            key={plant.key}
                            plantName={plant.plantName}
                            clickHandler={() => clickHandler(plant)}
                        />
                    )
                })}
            </div>
        );
    }
};      
 
export default TilesContainer;