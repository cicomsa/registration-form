import * as React from 'react'
import { shallow } from 'enzyme'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Content from '../components/Content'
import data from '../data/forms.json'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/privacy'
  }),
  useHistory: jest.fn().mockReturnValue({
    location: {
      pathname: '/privacy'
    },
    push: jest.fn()
  })
}))

const mockData = data
jest.mock('mockData', () => mockData, { virtual: true })

const children = () => <Content />

describe('Layout', () => {
  it('it should exist', () => {
    const wrapper = shallow(<Layout children={children} />)
    expect(wrapper.exists()).toBe(true)
  })
  it('it should return two children', () => {
    const wrapper = shallow(<Layout children={children} />)
    expect(wrapper.children().length).toEqual(2)
  })
  it('it should contain the Header component', () => {
    const wrapper = shallow(<Layout children={children} />)
    expect(wrapper.find(Header).exists()).toBe(true)
  })
  it('it should contain the Content component', () => {
    const wrapper = shallow(<Layout children={children} />)
    expect(wrapper.find(Content).exists()).toBe(true)
  })
});
