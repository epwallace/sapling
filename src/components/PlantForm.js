import React from 'react';

const PlantForm = (props) => {
    return(
        <form action='submit'>
            <label htmlFor='inputName'>plant name:</label>
            <input type='text' name='inputName' id='inputName' onChange={props.handleChange} value={props.inputName} />

            <label htmlFor='inputNotes'>plant notes:</label>
            <textarea name='inputNotes' id='inputNotes' onChange={props.handleChange} value={props.inputNotes}></textarea>

            {/* form submission button */}
            <button onClick={props.handleSubmit}>Submit</button>
        </form>
    )
}

export default PlantForm;