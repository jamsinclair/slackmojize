import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner'
import './EmojiItem.css'

const renderEmojiImage = image => {
  if (image.error) {
    return (
      <div className="EmojiItem-icon EmojiItem-icon--error">
        <FontAwesomeIcon icon={faExclamationCircle} size="1x" />
      </div>
    )
  }

  if (!image.ready) {
    return <Spinner className="EmojiItem-icon" />
  }

  return <img className="EmojiItem-image" src={image.resizedImgUrl} alt={image.original.name} />
}

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null
  }

  return <span className="EmojiItem-name-error">Error Resizing: </span>
}

const RemoveAction = ({removeImage, imageKey}) => (
  <span
    className="EmojiItem-action EmojiItem-action--remove"
    onClick={() => removeImage(imageKey)}
    >
    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
  </span>
)

const DownloadAction = ({ image }) => {
  if (image.error) {
    return null
  }

  return (
    <a
      className="EmojiItem-action EmojiItem-action--download"
      download={image.original.data.name}
      href={image.resizedImgUrl}
      >
      <FontAwesomeIcon icon={faDownload} size="1x" />
    </a>
  )
}

const EmojiItem = ({ image, imageKey, removeImage }) => {
  const isLoading = !image.ready

  return (
    <li className={`EmojiItem ${ isLoading ? 'EmojiItem--loading' : '' }`}>
      {renderEmojiImage(image)}
      <div className="EmojiItem-name">
        <ErrorMessage error={image.error} />
        {image.original.data.name}
      </div>
      <div className="EmojiItem-actions">
        <DownloadAction image={image} />
        <RemoveAction removeImage={removeImage} imageKey={imageKey} />
      </div>
    </li>
  )
}

export default EmojiItem
