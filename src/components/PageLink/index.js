import React from 'react'
import { useHistory } from "react-router-dom"
import './index.css'

const PageLink = ({ linkTitle, path, active }) =>  {
  const history = useHistory()

  const handleClick = () => {
    history.push(path);
  }

  return (
    <li onClick={handleClick}>
      <p className={`link ${active ? "active" : ""}`}>{linkTitle}</p>
    </li>
  )
}

export default PageLink
