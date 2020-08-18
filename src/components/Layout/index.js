import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import data from '../../data/forms.json'

const initialState = initialUser => ({
  user: {...initialUser},
  privacy: {},
  done: false
})

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'user':
      return { ...state, user: {...state.user, ...payload.user} }
    case 'privacy':
      return { ...state, privacy: {...state.privacy, ...payload.privacy} }
    case 'done':
      return { ...state, done: payload.done }
    default:
      return state
  }
}

const ContentData = createContext({})

const Layout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname

  // data should come from an API call/GraphQL query - mock functionality not implemented
  const content = data.find(content => content.path === pathName)
  const { formSections, path } = content
  const links = data.map(content => ({ path: content.path, linkTitle: content.linkTitle }))

  // set user props for the initialState of the reducer 
  const userPageContent = data.find(content => content.path === '/user')
  const initialUser = {}
  userPageContent.formSections
    .filter(section => section.name !== 'Submit')
    .map(section => {
      initialUser[section.name] = ''

      return initialUser[section.name]
  })
  const [state, dispatch] = useReducer(reducer, initialState(initialUser));
  const contextValue = useMemo(() => {
  return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    state.user.name
    && state.user.email
    && state.user.password
    && state.privacy.marketing !== undefined
    && state.privacy.updates !== undefined
      ? dispatch({ type: 'done', payload: {done: true} })
      : dispatch({ type: 'done', payload: {done: false} })
  }, [state.user.name, state.user.email, state.user.password, state.privacy.marketing, state.privacy.updates])

  return (
    <ContentData.Provider value={{ formSections, path, contextValue, initialUser }}>
      <Header links={links} pathName={pathName} />
      {children(pathName)}
    </ContentData.Provider>
  )
}

export { ContentData }
export default Layout
