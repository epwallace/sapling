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
  };

  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value,
    });
  };

  render() { 
    return (
      <div className="App">
        <Header />
        
        <main>
          <section className="collection wrapper">
            <h2>your collection</h2>
          </section>

          <section className="addNewPlant wrapper">
            <h2>add a plant</h2>

            {/* form for submitting a new plant */}
            <form action='submit'>

              <label htmlFor='plantName'>plant name:</label>
              <input type='text' name='plantName' id='plantName' onChange={this.handleChange} value={this.state.plantName} />

              <label htmlFor='plantNotes'>plant notes:</label>
              <textarea name='plantNotes' id='plantNotes' onChange={this.handleChange} value={this.state.plantNotes}></textarea>

              {/* form submission button */}
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