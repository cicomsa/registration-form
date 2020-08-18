import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ContentData } from '../Layout'
import CheckSVG from '../CheckSVG'
import Input from '../Input'
import './index.css'

const props = {
  button: ({ name }) => ({ name }),
  input: ({ name, inputType, copy, required, register, errors, handleChange, inputValues }) =>
    ({ name, inputType, copy, required, register, errors, handleChange, inputValues }),
  text: ({ name, copyFormCompleted, copyFormIncompleted, done }) => ({ name, copyFormCompleted, copyFormIncompleted, done })
}

const components = {
  button: ({ name }) => <button type="submit">{name}</button>,
  input: ({ name, inputType, copy, required, register, errors, handleChange, inputValues }) => {
    const inputProps = { name, inputType, copy, required, register, errors, handleChange, inputValues }
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

const Content = () => {
  const content = useContext(ContentData)
  const { formSections, path, contextValue, initialUser } = content
  const { state, dispatch } = contextValue
  const pageType = path.substring(1)
  const [data, setData] = useState({ user: {...initialUser}, privacy: {}, done: false })
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const onSubmit = () => {
    const nextpageType = pageType === 'user' ? '/privacy' : pageType === 'privacy' ? '/done' : '/user'
    const pageData = () => {
      if (pageType === 'privacy') {
        if (!data.privacy.updates) data.privacy.updates = false
        if (!data.privacy.marketing) data.privacy.marketing = false
      }

      return data[pageType]
    }

    dispatch({ type: pageType, payload: {[pageType]: pageData()} })
    history.push(nextpageType)
  }

  const handleChange = e => {
    const { name, value, checked, type } = e.target

    setData({
      ...data,
      [pageType]: {
        ...data[pageType],
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  useEffect(data => {
    if (path === '/done' && state.done) {
      console.log(state)
    }
    if (path === '/user') {
      setData({...data, user: initialUser})
    }
  }, [state, initialUser, path])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {
      formSections.map(section => {
        const Component = components[section.type]
        const inputValues = data[pageType][section.name]
        const componentProps = props[section.type]({
          ...section, register, errors, handleChange, inputValues, done: state.done
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
