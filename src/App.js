import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      plantName: '',
      plantNotes: '',
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('click handled')
  };

  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value,
    });
    console.log('change handled', event.target)
  };

  render() { 
    return (
      <div className="App">
        <Header />
        <main>
          <h2>your collection</h2>
          
          <section className="addNewPlant">
            <h2>add a plant</h2>
            <form action='submit'>
              <label htmlFor='plantName'>plant name:</label>
              <input type='text' id='plantName' onChange={this.handleChange} value={this.state.plantName} />
              <label htmlFor='plantNotes'>plant notes:</label>
              <input type='text' id='plantNotes' onChange={this.handleChange} value={this.state.plantNotes} />
              <button onClick={this.handleClick}>Submit</button>
            </form>
          </section>

        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;