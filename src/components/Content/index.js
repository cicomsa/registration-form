import React, { useContext } from 'react'
import { ContentData } from '../Layout'
import CheckSVG from '../CheckSVG'
import './index.css'

const components = {
  button: ({ name, handleClick }) => <button type="submit" onClick={handleClick}>{name}</button>,
  input: ({ name, inputType, copy }) => (
    <>
      {!copy && <label htmlFor={name}>{name}</label>}
      <input type={inputType} id={name} name={name} />
      {copy && <label htmlFor={name}>{copy}</label>}
    </>
  ),
  text: ({ name, copy }) => (
    <div className="wrapper">
      <CheckSVG />
      <p>{copy}</p>
    </div>
  )
}

const Content = () => {
  const content = useContext(ContentData)
  const { formSections } = content

  return (
    <form type="submit">
    {
      formSections.map(section => {
        const Component = components[section.type]

        return (
          <div key={section.name}>
            <Component {...section} />
          </div>
        )
      })
    }
    </form>
  )
}

export default Content
