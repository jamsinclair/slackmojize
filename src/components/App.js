import React, { Component } from 'react';
import DropZone from './DropZone'
import EmojiZone from './EmojiZone'
import './App.css';

class App extends Component {
  state = {
    files: []
  }

  addFile = file => {
    const files = [...this.state.files]
    files.push(file)
    this.setState({ files })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slackmojize</h1>
          <h2>
            <img className="App-parrot-left" src="./parrot.gif" alt="Parrot"/>
            Easily resize images for Slack&nbsp;Emojis
            <img className="App-parrot-right" src="./rightparrot.gif" alt="Right Parrot"/>
          </h2>
        </header>
        <div className="App-body">
          <DropZone addFile={this.addFile}></DropZone>
          { this.state.files.length ? <EmojiZone></EmojiZone> : null }
        </div>
        <footer className="App-footer">
          Hacked together by <a href="https://github.com/jamsinclair/slackmojize">jamsinclair</a>
        </footer>
      </div>
    );
  }
}

export default App;
