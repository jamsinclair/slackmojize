import React, { Component } from 'react';
import imageType from 'image-type'
import { DropFile } from 'ascender'
import DropZone from './DropZone'
import EmojiZone from './EmojiZone'
import resizeImageForSlack from '../resizeImageForSlack'
import { getId } from '../utils'
import './App.css';

class App extends Component {
  state = {
    images: {}
  }

  addFile = file => {
    file.getBinary().then(binary => {
      const type = this.getFileType(binary)
      if (!type) {
        // Invalid image
        return
      }

      const images = {...this.state.images}
      const key = getId.next().value
      images[key] = {
        original: file,
        resized: null,
        resizedDataUri: null
      }
      this.setState({ images })
      this.resizeFile(file, type, key)
    })
  }

  getFileType (binary) {
    const validTypes = ['png', 'jpg']
    const fileType = imageType(binary)

    return fileType && validTypes.indexOf(fileType.ext) > -1 ? fileType : null;
  }

  resizeFile = async (file, type, key) => {
    const resizedBlob = await resizeImageForSlack(file, type)
    const resizedFile = new DropFile(resizedBlob)
    const images = {...this.state.images}
    images[key].resized = resizedFile
    images[key].resizedDataUri = resizedBlob ? await resizedFile.getDataUri() : null
    images[key].error = !Boolean(resizedBlob)
    this.setState({ images })
  }

  removeImage = (key) => {
    const images = {...this.state.images}
    delete images[key]
    this.setState({ images })
  }

  renderAppBody = () => {
    const emojiZoneNode = <EmojiZone images={this.state.images} removeImage={this.removeImage}></EmojiZone>
    const hasImages = Object.keys(this.state.images).length

    return (
      <div className="App-body">
        <DropZone addFile={this.addFile}></DropZone>
        {hasImages ? emojiZoneNode : null}
      </div>
    )
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
        {this.renderAppBody()}
        <footer className="App-footer">
          Hacked together by <a href="https://github.com/jamsinclair/slackmojize">jamsinclair</a>
        </footer>
      </div>
    );
  }
}

export default App;
