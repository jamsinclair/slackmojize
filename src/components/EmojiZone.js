import React, { Component } from 'react';
import EmojiItem from './EmojiItem'
import './EmojiZone.css';

class EmojiZone extends Component {
  render() {
    return (
      <div className="EmojiZone">
        <ul className="emoji-items">
          {Object.keys(this.props.files).map(key => {
            return <EmojiItem
              key={key}
              file={this.props.files[key]}
              />
            })
          }
        </ul>
      </div>
    );
  }
}

export default EmojiZone;
