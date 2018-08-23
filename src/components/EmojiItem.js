import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './EmojiItem.css'

const EmojiItem = ({ file }) => (
  <li className="EmojiItem">
    {file.data.name}
    <div className="EmojiItem-actions">
      <a className="EmojiItem-action EmojiItem-action--download" href={`#file`}>
        <FontAwesomeIcon icon={faDownload} size="1x" />
      </a>
      <span className="EmojiItem-action EmojiItem-action--remove">
        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
      </span>
    </div>
  </li>
)

export default EmojiItem
