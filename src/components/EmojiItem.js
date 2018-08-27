import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './EmojiItem.css'

const EmojiItem = ({ image, imageKey, removeImage }) => (
  <li className="EmojiItem">
    <img className="EmojiItem-image" src={image.resizedDataUri} alt={image.original.name} />
    <div className="EmojiItem-name">
      {image.original.data.name}
    </div>
    <div className="EmojiItem-actions">
      <a className="EmojiItem-action EmojiItem-action--download" href={`#file`}>
        <FontAwesomeIcon icon={faDownload} size="1x" />
      </a>
      <span className="EmojiItem-action EmojiItem-action--remove" onClick={() => removeImage(imageKey)}>
        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
      </span>
    </div>
  </li>
)

export default EmojiItem
