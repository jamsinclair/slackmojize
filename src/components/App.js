import React, { Component } from "react";
import imageType from "image-type";
import DropZone from "./DropZone";
import EmojiZone from "./EmojiZone";
import resizeImageForSlack from "../resizeImageForSlack";
import { getId } from "../utils";
import "./App.css";

class App extends Component {
  state = {
    images: {}
  };

  addFile = file => {
    file.getBinary().then(binary => {
      const type = this.getFileType(binary);
      if (!type) {
        // Invalid image
        return;
      }

      const images = { ...this.state.images };
      const key = getId.next().value;
      images[key] = {
        original: file,
        resizedBlob: null,
        resizedImgUrl: null,
        error: false,
        ready: false
      };
      this.setState({ images });
      this.resizeFile(file, type, key);
    });
  };

  getFileType(binary) {
    const validTypes = ["png", "jpg"];
    const fileType = imageType(binary);

    return fileType && validTypes.indexOf(fileType.ext) > -1 ? fileType : null;
  }

  resizeFile = async (file, type, key) => {
    const resizedBlob = await resizeImageForSlack(file, type);
    const images = { ...this.state.images };
    images[key].resizedBlob = resizedBlob;
    images[key].resizedImgUrl = URL.createObjectURL(resizedBlob);
    images[key].error = !Boolean(resizedBlob);
    images[key].ready = true;
    this.setState({ images });
  };

  removeImage = key => {
    const images = { ...this.state.images };
    delete images[key];
    this.setState({ images });
  };

  renderAppBody = () => {
    const emojiZoneNode = (
      <EmojiZone images={this.state.images} removeImage={this.removeImage} />
    );
    const hasImages = Object.keys(this.state.images).length;

    return (
      <div className="App-body">
        <DropZone addFile={this.addFile} />
        {hasImages ? emojiZoneNode : null}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slackmojize</h1>
          <h2>
            <img className="App-parrot-left" src="./parrot.gif" alt="Parrot" />
            Easily resize images for Slack&nbsp;Emojis
            <img
              className="App-parrot-right"
              src="./rightparrot.gif"
              alt="Right Parrot"
            />
          </h2>
        </header>
        {this.renderAppBody()}
        <footer className="App-footer">
          Hacked together by{" "}
          <a href="https://github.com/jamsinclair/slackmojize">jamsinclair</a>
        </footer>
      </div>
    );
  }
}

export default App;
