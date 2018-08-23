import React, { Component } from 'react';
import imageType from 'image-type'
import DropZone from './DropZone'
import EmojiZone from './EmojiZone'
import { getId } from '../utils'
import './App.css';

class App extends Component {
  state = {
    files: {}
  }

  addFile = file => {
    file.getBinary().then(binary => {
      if (!this.isValidFile(binary)) {
        // Invalid image
        return
      }

      const files = {...this.state.files}
      files[getId.next().value] = file
      this.setState({ files })
    })
  }

  isValidFile (binary) {
    const validTypes = ['png', 'jpg']
    const fileType = imageType(binary)

    return fileType && validTypes.indexOf(fileType.ext) > -1
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
          { Object.keys(this.state.files).length ? <EmojiZone files={this.state.files}></EmojiZone> : null }
        </div>
        <footer className="App-footer">
          Hacked together by <a href="https://github.com/jamsinclair/slackmojize">jamsinclair</a>
        </footer>
      </div>
    );
  }
}

export default App;
