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

    // reset state and close modal
    this.handleCloseModal();
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
  handleDelete = (key) => {
    // connect to firebase and remove entry with provided key
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();

    // reset state and close modal
    this.handleCloseModal();
  }

  handleEdit = (plant) => {
    this.setState({
      modalType: 'editPlant',
      inputName: this.state.currentPlant.plantName,
      inputNotes: this.state.currentPlant.plantNotes,
    })
  }

  handleEditSubmission = (key) => {
    // connect to firebase and update the relevant entry
    const dbRef = firebase.database().ref();
    dbRef.child(key).update({
      plantName: this.state.inputName,
      plantNotes: this.state.inputNotes,
    })

    // restore plant page modal
    this.setState({
      // update currentPlant with the newest information
      // TODO: is there a way to do this automatically?
      currentPlant: {
        plantName: this.state.inputName,
        plantNotes: this.state.inputNotes,
      },

      // reset input fields and display updated plantPage
      modalType: 'plantPage',
      inputName: '',
      inputNotes: '',
    })
  }

  // close modal and restore any modified state attributes to default values
  handleCloseModal = () => {
    this.setState({
      modalActive: false,
      modalType: '',
      currentPlant: {
        plantName: '',
        plantNotes: '',
        key: '',
      },
      inputName: '',
      inputNotes: '',
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
        />
      )
    } else if (modalType === 'editPlant') {
      // TODO: handle editing logic; need to write handlers, deal with cancellation, etc
      const { plantName, plantNotes, key } = this.state.currentPlant;
      return (
        <PlantForm
          handleChange={this.handleChange}
          handleSubmit={() => this.handleEditSubmission(key)}
          inputName={this.state.inputName}
          inputNotes={this.state.inputNotes}
        />
      )
    } else if (modalType === 'plantPage') {
      return (
        <PlantPage
          plant={this.state.currentPlant}
          handleDelete={() => this.handleDelete(this.state.currentPlant.key)}
          handleEdit={() => this.handleEdit(this.state.currentPlant)}
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
          <button onClick={this.handleCloseModal} className='closeButton'>
            <i class="far fa-window-close"></i>
          </button>
          {this.getModalContent()}
        </ReactModal>

        <Header />
        
        <main>
          <section className="collection wrapper">
            <h2>your collection</h2>

            <div className='tilesContainer'>
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

            {/* launch form for submitting a new plant */}
            <button className='addPlantButton' onClick={() => {
              // TODO: write a proper handler for this button
              this.setState({
                modalActive: true,
                modalType: 'newPlant'
              })
            }}>
              add a plant
            </button>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;