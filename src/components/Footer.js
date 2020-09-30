import React, { Component } from 'react';

class Footer extends Component {
    state = {  }
    render() { 
        return (
            <footer className='wrapper'>
                <p>
                    <span>Made by <a href="https://www.github.com/epwallace">Evan Wallace</a> </span>
                    <span>at <a href="https://www.junocollege.com">Juno College</a> in 2020.</span>
                </p>
            </footer>
        );
    }
}
 
export default Footer;