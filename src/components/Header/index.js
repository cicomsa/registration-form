import React from 'react'
import PageLink from '../PageLink'

const Header = ({ links, pathName }) => {
  return (
    <div>
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
    </div>
  )
}

export default Header
