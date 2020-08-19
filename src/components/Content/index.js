import React, { useContext, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ContentData } from '../Layout'
import CheckSVG from '../CheckSVG'
import Input from '../Input'
import './index.css'

const props = {
  button: ({ name }) => ({ name }),
  input: ({ name, inputType, copy, conditions, register, errors, pageType, state, dispatch }) =>
    ({ name, inputType, copy, conditions, register, errors, pageType, state, dispatch }),
  text: ({ name, copyFormCompleted, copyFormIncompleted, done }) => ({ name, copyFormCompleted, copyFormIncompleted, done })
}

const components = {
  button: ({ name }) => <button type="submit">{name}</button>,
  input: ({ name, inputType, copy, conditions, register, errors, pageType, state, dispatch }) => {
    const inputProps = { name, inputType, copy, conditions, register, errors, pageType, state, dispatch }
    return <Input {...inputProps} />
  },
  text: ({ name, copyFormCompleted, copyFormIncompleted, done }) => (
    <div className="wrapper">
    {
      // 'done' to be reconsidered
      done ? (
        <>
          <CheckSVG />
          <p>{copyFormCompleted}</p>
        </>
      ) : (
        <p>{copyFormIncompleted}</p>
      )
    }
    </div>
  )
}

const initialState = {
  user: {},
  privacy: {}
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'user':
      return { ...state, user: {...state.user, ...payload.user} }
    case 'privacy':
      return { ...state, privacy: {...state.privacy, ...payload.privacy} }
    default:
      return state
  }
}

const Content = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const content = useContext(ContentData)
  const { formSections, nextPath } = content
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const path = history.location.pathname
  const pageType = path.substring(1)
  const onSubmit = () => {
    if (pageType === 'privacy') {
      // 'state.privacy' values to be reconsidered
     // if (!state.privacy.updates) state.privacy.updates = false
     // if (!state.privacy.marketing) state.privacy.marketing = false
   }
    history.push(nextPath)
  }

  useEffect(() => {
    if (path === '/done') {
      console.log(state)
    }
  }, [path, state])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {
      formSections.map(section => {
        const Component = components[section.type]
        const componentProps = props[section.type]({
          ...section, register, errors, done: true, dispatch, state, pageType
        })

        return (
          <div key={section.name}>
            <Component {...componentProps}/>
          </div>
        )
      })
    }
    </form>
  )
}

export default Content
