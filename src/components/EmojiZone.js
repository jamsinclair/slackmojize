import React, { Component } from 'react';
import EmojiItem from './EmojiItem'
import ZipDownloadContainer from './ZipDownloadContainer'
import './EmojiZone.css';

class EmojiZone extends Component {
  render() {
    return (
      <div className="EmojiZone">
        <ul className="EmojiZone-list">
          {Object.keys(this.props.images).map(key => {
            return <EmojiItem
              key={key}
              image={this.props.images[key]}
              imageKey={key}
              removeImage={this.props.removeImage}
              />
            })
          }
        </ul>
        <ZipDownloadContainer files={this.props.images}></ZipDownloadContainer>
      </div>
    );
  }
}

export default EmojiZone;
