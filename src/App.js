import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Tile from './components/Tile.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      plantName: '',
      plantNotes: '',
      plants: [],
    }
  }

  componentDidMount() {
    // connect to firebase
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      // index plant information with firebase key
      for (const key in data) {
        newState.push({
          key: key,
          plantName: data[key].plantName,
          plantNotes: data[key].plantNotes,
        });
      }

      // pass firebase data to App state
      this.setState({
        plants: newState,
      });
    });
  }

  handleSubmit = (event) => {
    // prevent page refresh
    event.preventDefault();

    // connect to firebase and send user input
    const dbRef = firebase.database().ref();
    dbRef.push({
      plantName: this.state.plantName,
      plantNotes: this.state.plantNotes,
    });

    // clear input from text boxes
    this.setState({
      plantName: '',
      plantNotes: ''
    })
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

            <div className='tilesContainer'>
              {this.state.plants.map((plant) => {
                return(
                  <Tile plantName={plant.plantName} />
                )
              })}
            </div>
          </section>

          <section className="addNewPlant wrapper">
            <h2>add a plant</h2>

            {/* form for submitting a new plant */}
            {/* TODO: turn form into a component */}
            <form action='submit'>

              <label htmlFor='plantName'>plant name:</label>
              <input type='text' name='plantName' id='plantName' onChange={this.handleChange} value={this.state.plantName} />

              <label htmlFor='plantNotes'>plant notes:</label>
              <textarea name='plantNotes' id='plantNotes' onChange={this.handleChange} value={this.state.plantNotes}></textarea>

              {/* form submission button */}
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
          </section>

        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;