import React, { Component } from 'react';
import './DropZone.css';
import Ascender from 'ascender'

class DropZone extends Component {
  dropZoneRef = React.createRef()

  componentDidMount = () => {
    this.dropZone = new Ascender(this.dropZoneRef.current)
    this.dropZone.on('file:added', file => this.props.addFile(file))
  }

  componentWillUnmount = () => {
    // Tidy up Ascender listeners
    this.dropZone.destroy()
    this.dropZone = null
  }

  render() {
    return (
      <form className="DropZone" ref={this.dropZoneRef}>
        <h1 className="DropZone-title">
          Drag Files Here or <span className="DropZone-prompt">
            Browse&nbsp;To&nbsp;Select
          </span>
        </h1>
      </form>
    );
  }
}

export default DropZone;
