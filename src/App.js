import React, { Component } from 'react';
import firebase from './firebase.js';
import ReactModal from 'react-modal';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PlantForm from './components/PlantForm.js';
import PlantPage from './components/PlantPage.js';
import Tile from './components/Tile.js';

// set root element so react-modal can apply aria-hidden properly
ReactModal.setAppElement('#root');

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalActive: false,
      modalType: '',
      currentPlant: {
        plantName: '',
        plantNotes: '',
        key: '',
      },
      inputName: '',
      inputNotes: '',
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
      plantName: this.state.inputName,
      plantNotes: this.state.inputNotes,
    });

    // clear input from text boxes
    this.setState({
      inputName: '',
      inputNotes: '',
    })
  };

  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value,
    });
  };

  // when a user clicks a tile, launch a modal with the relevant plant entry
  handlePlantSelection = (plant) => {
    this.setState({
      currentPlant: plant,
      modalType: 'plantPage',
      modalActive: true,
    })
  }

  // remove an entry from the database
  handleRemove = (key) => {
    // connect to firebase and remove entry with provided key
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();

    // reset state and close modal
    this.setState({
      currentPlant: {},
      modalType: '',
      modalActive: false,
    })
  }

  // TODO: what happens if modal is exited mid-edit?
  // close modal by changing modalOpen to false
  handleCloseModal = () => {
    this.setState({
      modalActive: false,
    })
  }

  // TODO: refactor into smaller functions
  getModalContent = () => {
    const { modalType } = this.state;
    if (modalType === 'newPlant') {
      return (
        <PlantForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          plantName={this.state.inputName}
          plantNotes={this.state.inputNotes}
          key={null}
        />
      )
    } else if (modalType === 'editPlant') {
      // TODO: handle editing logic; need to write handlers, deal with cancellation, etc
      const { plantName, plantNotes, key } = this.state.currentPlant;
      return (
        <PlantForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          plantName={plantName}
          plantNotes={plantNotes}
          key={key}
        />
      )
    } else if (modalType === 'plantPage') {
      return (
        <PlantPage
          plant={this.state.currentPlant}
          handleRemove={() => this.handleRemove(this.state.currentPlant.key)}
        />
      )
    }
  }

  render() { 
    return (
      <div className="App">
        <ReactModal
          isOpen={this.state.modalActive}
          onRequestClose={this.handleCloseModal}
          className='modal'
          overlayClassName='overlay'
        >
          {this.getModalContent()}
        </ReactModal>
        <Header />
        
        <main>
          <section className="collection wrapper">
            <h2>your collection</h2>

            <div className='tilesContainer'>
              {/* TODO: clickHandler method needs to set the "active plant" in the state so information can be displayed in the modal */}
              {this.state.plants.map((plant) => {
                return(
                  <Tile
                  key={plant.key}
                  plantName={plant.plantName}
                  clickHandler={() => this.handlePlantSelection(plant)}
                  />
                )
              })}
            </div>
          </section>

          <section className="addNewPlant wrapper">
            <h2>add a plant</h2>
            
            {/* TODO: style this button */}
            {/* launch form for submitting a new plant */}
            <button onClick={() => {
              // TODO: write a proper handler for this button
              this.setState({
                modalActive: true,
                modalType: 'newPlant'
              })
            }}>click</button>

          </section>

        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;