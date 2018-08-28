import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCircleNotch, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './EmojiItem.css'

const renderEmojiImage = image => {
  if (image.error) {
    return (
      <div className="EmojiItem-icon EmojiItem-icon--error">
        <FontAwesomeIcon icon={faExclamationCircle} size="1x" />
      </div>
    )
  }

  if (!image.resizedDataUri) {
    return (
      <div className="EmojiItem-icon EmojiItem-icon--spinner">
        <FontAwesomeIcon icon={faCircleNotch} size="1x" />
      </div>
    )
  }

  return <img className="EmojiItem-image" src={image.resizedDataUri} alt={image.original.name} />
}

const EmojiItem = ({ image, imageKey, removeImage }) => {
  const isLoading = !image.resizedDataUri && !image.error

  return (
    <li className={`EmojiItem ${ isLoading ? 'EmojiItem--loading' : '' }`}>
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
}

export default EmojiItem
