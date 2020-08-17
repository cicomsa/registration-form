import React, { useContext, useReducer, useState, useEffect } from 'react'
import { useForm } from "react-hook-form";

import { ContentData } from '../Layout'
import CheckSVG from '../CheckSVG'
import './index.css'

const props = {
  button: ({ name, buttonType, handleClick }) => ({ name, buttonType, handleClick }),
  input: ({ name, inputType, copy, required, register, errors, handleChange, inputValues }) =>
    ({ name, inputType, copy, required, register, errors, handleChange, inputValues }),
  text: ({ name, copy }) => ({ name, copy })
}

const components = {
  button: ({ name, buttonType, handleClick }) => <button type={buttonType} onClick={handleClick}>{name}</button>,
  input: ({ name, inputType, copy, required, register, errors, handleChange, inputValues }) => (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input
        type={inputType}
        id={name}
        name={name}
        onChange={handleChange}
        value={inputValues}
        ref={register({ required })}
      />
      {copy && <label htmlFor={name}>{copy}</label>}
      {errors[name] && <p>{name} field is required</p>}
    </>
  ),
  text: ({ name, copy }) => (
    <div className="wrapper">
      <CheckSVG />
      <p>{copy}</p>
    </div>
  )
}

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

const Content = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const content = useContext(ContentData)
  const { formSections, path } = content
  const type = path.substring(1)
  const [data, setData] = useState({user: {}, privacy: {}})
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => console.log(data)
  const handleClick = () => {
    dispatch({ type, payload: {[type]: data[type]} })
  }

  const handleChange = e => {
    const { name, value, checked } = e.target
    setData({...data, [type]: {
      ...data[type],
      [name]: checked  === true || checked === false ? checked : value
    }})
  }

  useEffect(() => {
    if (state.user.name && state.user.email && state.user.password) {
      dispatch({ type: 'done', payload: {done: true} })
    } else {
      dispatch({ type: 'done', payload: {done: false} })
    }
  }, [state.user.name, state.user.email, state.user.password])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {
      formSections.map(section => {
        const Component = components[section.type]
        const inputValues = state[type][section.name]
        const componentProps = props[section.type]({
          ...section, register, errors, handleClick, handleChange, inputValues
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
