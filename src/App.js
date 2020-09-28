import React, { Component } from 'react';
import firebase from './firebase.js';
import ReactModal from 'react-modal';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PlantForm from './components/PlantForm.js';
import Tile from './components/Tile.js';

// set root element so react-modal can apply aria-hidden properly
ReactModal.setAppElement('#root');

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalActive: false,
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
  
  // close modal by changing modalOpen to false
  handleRequestClose = () => {
    this.setState({
      modalActive: false,
    })
  }

  render() { 
    return (
      <div className="App">
        <ReactModal
          isOpen={this.state.modalActive}
          onRequestClose={this.handleRequestClose}
          className='modal'
          overlayClassName='overlay'
          />
        <Header />
        
        <main>
          <section className="collection wrapper">
            <h2>your collection</h2>

            <div className='tilesContainer'>
              {/* TODO: clickHandler method needs to set the "active plant" in the state so information can be displayed in the modal */}
              {this.state.plants.map((plant) => {
                return(
                  <Tile
                  plantName={plant.plantName}
                  clickHandler={() => this.setState({modalActive: true})}
                  />
                )
              })}
            </div>
          </section>

          <section className="addNewPlant wrapper">
            <h2>add a plant</h2>

            {/* form for submitting a new plant */}
            <PlantForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              plantName={this.state.plantName}
              plantNotes={this.state.plantNotes}
            />

          </section>

        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;