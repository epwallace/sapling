import React from 'react';

const PlantForm = (props) => {
    return(
        <form action='submit'>
            <label htmlFor='inputName'>plant name:</label>
            <input type='text' name='inputName' id='inputName' onChange={props.handleChange} value={props.inputName} />

            <label htmlFor='inputNotes'>plant notes:</label>
            <textarea name='inputNotes' id='inputNotes' onChange={props.handleChange} value={props.inputNotes}></textarea>

            {/* form submission button */}
            <button onClick={(event) => {
                // prevent page refresh
                event.preventDefault();

                // only submit if plantName starts with a letter and is less than 30 chars
                if (props.plantName.match('[a-zA-z].{0,29}')) {
                    props.handleSubmit()
                } else {
                    alert("Your plant name must start with a letter and cannot exceed 30 characters.");
                }
            }}>Submit</button>
        </form>
    )
}

export default PlantForm;