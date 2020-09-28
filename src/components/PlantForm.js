import React from 'react';

const PlantForm = (props) => {
    return(
        <form action='submit'>
            <label htmlFor='plantName'>plant name:</label>
            <input type='text' name='plantName' id='plantName' onChange={props.handleChange} value={props.plantName} />

            <label htmlFor='plantNotes'>plant notes:</label>
            <textarea name='plantNotes' id='plantNotes' onChange={props.handleChange} value={props.plantNotes}></textarea>

            {/* form submission button */}
            <button onClick={props.handleSubmit}>Submit</button>
        </form>
    )
}

export default PlantForm;