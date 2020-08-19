import React from 'react'
import regexParser from 'regex-parser'

const Input = ({ name, inputType, copy, conditions, register, errors, pageType, state, dispatch }) => {
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
    const regex = regexParser(conditions.pattern.value)
    conditions.pattern.value = regex
  }

  return (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input
        type={inputType}
        id={name}
        name={name}
        onBlur={handleBlur}
        defaultValue={state[pageType] ? state[pageType][name] : ''}
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
