import React from 'react'

const Input = ({ name, inputType, copy, required, register, errors, handleChange, inputValues }) => {
  const validation = () => {
    const conditions = {}
    conditions.required = {}
    conditions.required = required ? `${name} field is required` : ''

    if (name === 'email') {
      conditions.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email addres. Email must have standard email format. Please try again.'
      }
    }

    if (name === 'password') {
      conditions.pattern = {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/,
        message: 'Invalid password. Password must have minimum 9 characters of which minimum 1 uppercase letter, 1 lowercase letter and 1 number.'
      }
    }

    return conditions
  }

  return (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input
        type={inputType}
        id={name}
        name={name}
        onChange={handleChange}
        value={inputValues}
        ref={register({
          ...validation()
        })}
      />
      {copy && <label htmlFor={name}>{copy}</label>}
      {errors[name] && <p>{errors[name].message}</p>}
    </>
  )
}

export default Input
