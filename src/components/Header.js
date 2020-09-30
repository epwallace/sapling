import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <header className='wrapper'>
                <h1>sapling</h1>
                <p>
                    Sapling is a simple plant journal that will help you keep tabs on your plant collection.
                    Add a plant to Sapling and write any notes you find helpful:
                    care instructions, where you bought it, or anything else.
                    Your entries will appear in the area below this message.
                    Happy growing!
                </p>
            </header>
        );
    }
}
 
export default Header;