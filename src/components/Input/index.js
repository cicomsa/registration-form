import React from 'react'
import regexParser from 'regex-parser'

const Input = ({ name, inputType, copy, conditions, register, errors, pageType, values, setValues }) => {
  const handleChange = e => {
    const { name, value, checked } = e.target

    setValues({...values, [name]: inputType === 'checkbox' ? checked : value})
  }

  if (conditions.pattern && typeof conditions.pattern.value === 'string') {
    const regex = regexParser(conditions.pattern.value)
    conditions.pattern.value = regex
  }

  return (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input
        className="input"
        type={inputType}
        id={name}
        name={name}
        onChange={handleChange}
        value={values[name] ? values[name] : ''}
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
