import React, { Component } from 'react';
import DropZone from './DropZone'
import './App.css';

class App extends Component {
  state = {
    files: []
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slackmojize</h1>
          <h2>
            <img className="App-parrot-left" src="./parrot.gif" alt="Parrot"/>
            Easily resize images for Slack Emojis
            <img className="App-parrot-right" src="./rightparrot.gif" alt="Right Parrot"/>
          </h2>
        </header>
        <DropZone></DropZone>
        <footer className="App-footer">
          Hacked together by <a href="https://github.com/jamsinclair/slackmojize">jamsinclair</a>
        </footer>
      </div>
    );
  }
}

export default App;
