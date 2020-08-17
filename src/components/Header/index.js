import React from 'react'
import PageLink from '../PageLink'
import './index.css'

const Header = ({ links, pathName }) => {
  return (
    <ul className="links">
      {
        links
          .map(content => {
            const active = content.path === pathName

            return (
              <PageLink
                path={content.path}
                linkTitle={content.linkTitle}
                key={content.linkTitle}
                active={active}
              />
            )
          }
        )
      }
    </ul>
  )
}

export default Header
