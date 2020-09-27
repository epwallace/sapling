import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

// layout components
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {  }
  }

  render() { 
    return (
      <div className="App">
        <Header />
        <main>
          <h2>your collection</h2>
          <h2>add a plant</h2>
        </main>
        <Footer />
      </div>
    );
  }
}
 
export default App;