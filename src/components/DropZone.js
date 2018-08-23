import React, { Component } from 'react';
import './DropZone.css';
import Ascender from 'ascender'

class DropZone extends Component {
  dropZoneRef = React.createRef()

  componentDidMount = () => {
    this.dropZone = new Ascender(this.dropZoneRef.current)
  }

  componentWillUnmount = () => {
    // Tidy up Ascender listeners
    this.dropZone.destroy()
    this.dropZone = null
  }

  render() {
    return (
      <form className="drop-zone" ref={this.dropZoneRef}>
        {this.props.children}
      </form>
    );
  }
}

export default DropZone;
