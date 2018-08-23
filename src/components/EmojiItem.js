import React from 'react'

const EmojiItem = (props) => (
  <li className="EmojiItem">
    {props.file.data.name}
  </li>
)

export default EmojiItem
