import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './EmojiItem.css'

const renderEmojiImage = image => {
  if (!image.resizedDataUri) {
    return (
      <div className="EmojiItem-spinner">
        <FontAwesomeIcon icon={faCircleNotch} size="1x" />
      </div>
    )
  }

  return <img className="EmojiItem-image" src={image.resizedDataUri} alt={image.original.name} />
}

const EmojiItem = ({ image, imageKey, removeImage }) => (
  <li className={ `EmojiItem ${(image.resizedDataUri ? '' : ' EmojiItem--loading')}`}>
    {renderEmojiImage(image)}
    <div className="EmojiItem-name">
      {image.original.data.name}
    </div>
    <div className="EmojiItem-actions">
      <a
        className="EmojiItem-action EmojiItem-action--download"
        download={image.original.data.name}
        href={image.resizedDataUri}
        >
        <FontAwesomeIcon icon={faDownload} size="1x" />
      </a>
      <span className="EmojiItem-action EmojiItem-action--remove" onClick={() => removeImage(imageKey)}>
        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
      </span>
    </div>
  </li>
)

export default EmojiItem
