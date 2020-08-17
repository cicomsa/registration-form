import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import data from '../../data/forms.json'

const Layout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname

  // data should come from an API call/GraphQL query - mock functionality not implemented
  const content = data.find(content => content.path === pathName)
  const links = data.map(content => ({ path: content.path, linkTitle: content.linkTitle }))

  return (
    <>
      <Header links={links} pathName={pathName} />
      {children(pathName, content)}
    </>
  )
}

export default Layout
