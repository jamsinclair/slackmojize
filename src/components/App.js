import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Slackmojize</h1>
          <h2>
            <img src="./parrot.gif" alt="Parrot"/>
            Easily resize images in your browser for Slack Emojis
            <img src="./rightparrot.gif" alt="Right Parrot"/>
          </h2>
        </header>
      </div>
    );
  }
}

export default App;
