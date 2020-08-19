import React, { useState } from 'react'
import regexParser from 'regex-parser'

const Input = ({ name, inputType, copy, conditions, register, errors, pageType, state, dispatch }) => {
  const [inputValue, setInputValue] = useState("")

  const handleChange = e => {
    const { value, checked, type } = e.target
    setInputValue(type === 'checkbox' ? checked : value)
  }

  const handleBlur = e => {
    const { name, value, checked, type } = e.target

    dispatch({
      type: pageType,
      payload: {
        ...state,
        [pageType]: {
          ...state[pageType],
          [name]: type === 'checkbox' ? checked : value
        }
      }
    })
  }

  if (conditions.pattern && typeof conditions.pattern.value === 'string') {
    let regex = conditions.pattern.value
    regex = regexParser(regex)
    conditions.pattern.value = regex
  }

  return (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input
        type={inputType}
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputValue}
        ref={register({
          ...conditions
        })}
      />
      {copy && <label htmlFor={name}>{copy}</label>}
      {errors[name] && <p>{errors[name].message}</p>}
    </>
  )
}

export default Input
