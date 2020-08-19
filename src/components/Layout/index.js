import React, { createContext } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import data from '../../data/forms.json'

const ContentData = createContext({})

const Layout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname

  // data should come from an API call/GraphQL query - mock functionality not implemented
  const content = data.find(content => content.path === pathName)
  const { formSections } = content
  const links = data.map(content => ({ path: content.path, linkTitle: content.linkTitle }))
  const nextPathIndex = data.indexOf(content) + 1
  const nextPath = data[nextPathIndex] ? data[nextPathIndex].path : data[0].path

  return (
    <ContentData.Provider value={{ formSections, nextPath }}>
      <Header links={links} pathName={pathName} />
      {children(pathName)}
    </ContentData.Provider>
  )
}

export { ContentData }
export default Layout
