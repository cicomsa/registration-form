import * as React from 'react'
import { mount } from 'enzyme'
import Header from '../components/Header'

const props = {
  links: [
    {
      linkTitle: 'User',
      path: '/user'
    },
    {
      linkTitle: 'Privacy',
      path: '/privacy'
    },
    {
      linkTitle: 'Done',
      path: '/done'
    }
  ],
  pathName: '/user'
}

describe('Header', () => {
  it('should return component', () => {
    const wrapper = mount(<Header {...props} />)
    expect(wrapper.find('.links').exists()).toBe(true)
  })
  it('should return three children', () => {
    const wrapper = mount(<Header {...props} />)
    expect(wrapper.find('.link').length).toEqual(3)
  })
})
