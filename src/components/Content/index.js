import React, { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContentData } from '../Layout/Context'
import CheckSVG from '../CheckSVG'
import Input from '../Input'
import './index.css'

const props = {
  button: ({ name }) => ({ name }),
  input: ({ name, inputType, copy, conditions, register, errors, pageType, values, setValues }) =>
    ({ name, inputType, copy, conditions, register, errors, pageType, values, setValues }),
  text: ({ name, copyFormCompleted, copyFormIncompleted, done }) => ({ name, copyFormCompleted, copyFormIncompleted, done })
}

const components = {
  button: ({ name }) => <button type="submit">{name}</button>,
  input: ({ name, inputType, copy, conditions, register, errors, pageType, values, setValues }) => {
    const inputProps = { name, inputType, copy, conditions, register, errors, pageType, values, setValues }
    return <Input {...inputProps} />
  },
  text: ({ name, copyFormCompleted, copyFormIncompleted, done }) => (
    <div className="wrapper">
    {
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

const initialState = {}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'register':
      return { ...state, ...payload }
    default:
      return state
  }
}

const Content = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [values, setValues] = useState({})
  const content = useContentData()
  const { formSections, nextPath } = content
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const path = history.location.pathname
  const pageType = path.substring(1)
  const done = state.name && state.email && state.password

  const onSubmit = () => {
    if (pageType === 'privacy')
      dispatch({
        type: 'register',
        payload: values
      })

    history.push(nextPath)
  }

  useEffect(() => {
    if (path === '/done' && done) {
      console.log(state)
    }
  }, [path, state, values, done])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {
      formSections.map(section => {
        const Component = components[section.type]
        const componentProps = props[section.type]({
          ...section, register, errors, done, pageType, values, setValues
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
