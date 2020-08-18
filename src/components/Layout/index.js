import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import data from '../../data/forms.json'

const initialState = {
  user: {},
  privacy: {},
  done: false
}

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation()
  const pathName = location.pathname

  // data should come from an API call/GraphQL query - mock functionality not implemented
  const content = data.find(content => content.path === pathName)
  const contextValue = useMemo(() => {
  return { state, dispatch };
}, [state, dispatch]);
  const { formSections, path } = content
  const links = data.map(content => ({ path: content.path, linkTitle: content.linkTitle }))

  useEffect(() => {
    if (state.user.name && state.user.email && state.user.password) {
      dispatch({ type: 'done', payload: {done: true} })
    } else {
      dispatch({ type: 'done', payload: {done: false} })
    }
    // console.log('asd', state)
  }, [state.user.name, state.user.email, state.user.password, dispatch])

  return (
    <ContentData.Provider value={{ formSections, path, contextValue }}>
      <Header links={links} pathName={pathName} />
      {children(pathName)}
    </ContentData.Provider>
  )
}

export { ContentData }
export default Layout
