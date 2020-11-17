import React, { Component } from 'react';
import firebase from './firebase.js';
import ReactModal from 'react-modal';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import SignIn from './components/SignIn.js';
import PlantForm from './components/PlantForm.js';
import PlantPage from './components/PlantPage.js';
import TilesContainer from './components/TilesContainer.js';

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

  // update state as user types into form inputs
  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value,
    });
  };

  // launches the new entry modal
  startNewEntry = (plant) => {
    this.setState({
      modalActive: true,
      modalType: 'newPlant'
    })
  }

  // create a new entry in firebase when user submits a completed form
  submitNewEntry = () => {
    // connect to firebase and send user input
    const dbRef = firebase.database().ref();
    dbRef.push({
      plantName: this.state.inputName,
      plantNotes: this.state.inputNotes,
    });

    // reset state and close modal
    this.closeModal();
  };

  // when a user clicks a tile, launch a modal with the relevant plant entry
  displayPlant = (plant) => {
    this.setState({
      currentPlant: plant,
      modalType: 'plantPage',
      modalActive: true,
    })
  }

  // remove a plant entry from the database
  deletePlant = (key) => {
    // connect to firebase and remove entry with provided key
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();

    // reset state and close modal
    this.closeModal();
  }
  
  // launches the edit modal without resetting the currently selected plant
  displayEditForm = (plant) => {
    this.setState({
      modalType: 'editPlant',
      inputName: this.state.currentPlant.plantName,
      inputNotes: this.state.currentPlant.plantNotes,
    })
  }

  // send edited entry to firebase and reveal the updated plant page
  submitEditedEntry = (key) => {
    // connect to firebase and update the relevant entry
    const dbRef = firebase.database().ref();
    dbRef.child(key).update({
      plantName: this.state.inputName,
      plantNotes: this.state.inputNotes,
    })

    // restore plant page modal
    this.setState({
      // update currentPlant with the newest information
      currentPlant: {
        key: key,
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
  closeModal = () => {
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

  // read this.state.modalType to determine what content should be returned
  getModalContent = () => {
    const { modalType } = this.state;
    if (modalType === 'newPlant') {
      // return a form whose submission pushes a new entry to firebase
      return (
        <PlantForm
          handleChange={this.handleChange}
          handleSubmit={this.submitNewEntry}
          plantName={this.state.inputName}
          plantNotes={this.state.inputNotes}
        />
      )
    } else if (modalType === 'editPlant') {
      // return a form whose submission modifies the firebase entry with this key
      const { key } = this.state.currentPlant;
      return (
        <PlantForm
          handleChange={this.handleChange}
          handleSubmit={() => this.submitEditedEntry(key)}
          plantName={this.state.inputName}
          plantNotes={this.state.inputNotes}
        />
      )
    } else if (modalType === 'plantPage') {
      // return the expanded entry for the currently selected plant
      const { currentPlant } = this.state;
      return (
        <PlantPage
          plant={currentPlant}
          handleDelete={() => this.deletePlant(currentPlant.key)}
          handleEdit={() => this.displayEditForm(currentPlant)}
        />
      )
    }
  }

  render() { 
    return (
      <div className="App">
        {/* --- modal section --- */}
        <ReactModal
          isOpen={this.state.modalActive}
          onRequestClose={this.closeModal}
          className='modal'
          overlayClassName='overlay'
        >

          {/* 'X' button for closing modal */}
          <button onClick={this.closeModal} className='closeButton'>
            <i className="far fa-window-close"></i>
          </button>

          {/* modal content is dynamically determined by the state */}
          {this.getModalContent()}
        </ReactModal>

        {/* --- header section --- */}
        <Header />
        
        {/* --- main section --- */}
        <main>
            <SignIn />
          <section className="collection wrapper">
            <h2>your collection</h2>

            {/* --- tiles for each plant entry are rendered here --- */}
            <TilesContainer plants={this.state.plants} clickHandler={this.displayPlant} />

            {/* --- 'add a new plant' button --- */}
            <button className='addPlantButton raisedButton brownButton' onClick={this.startNewEntry}>
              add a new plant
            </button>
          </section>
        </main>

        {/* --- footer section --- */}
        <Footer />
      </div>
    );
  }
}
 
export default App;