import React from 'react'
import { useHistory } from "react-router-dom"
import './index.css'

const PageLink = ({ linkTitle, path, active }) =>  {
  const history = useHistory()

  const handleClick = () => {
    history.push(path);
  }

  return (
    <button type="button" className={`${active ? "active" : ""}`} onClick={handleClick}>
      {linkTitle}
    </button>
  )
}

export default PageLink
