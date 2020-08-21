import * as React from 'react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { when } from 'jest-when'
import PageLink from '../components/PageLink'

const props = {
  linkTitle: 'User',
  path: '/user',
  active: false
}

describe('PageLink', () => {
  it('should return component', () => {
    const wrapper = mount(<PageLink {...props} />)
    expect(wrapper.find('.link').exists()).toBe(true)
  })
  it('should have correct title', () => {
    const wrapper = mount(<PageLink {...props} />)
    expect(wrapper.find('.link').text()).toBe(props.linkTitle)
  })
  it('should not have active state', () => {
    const wrapper = mount(<PageLink {...props} />)
    expect(wrapper.find('.active').exists()).toBe(false)
  })
  it('should have active state', () => {
    const activeLinkProps = {
      linkTitle: 'User',
      path: '/user',
      active: true
    }

    const wrapper = mount(<PageLink {...activeLinkProps} />)
    expect(wrapper.find('.active').exists()).toBe(true)
  })
  it('should redirect to correct page', () => {
    const wrapper = mount(<PageLink {...props} />)

    const history = createMemoryHistory({ initialEntries: ['/privacy'], push: jest.fn() })
    const spy = jest.spyOn(history, 'push');
    history.push(props.path);

    // wrapper.find('li').simulate('click')

    expect(spy).toHaveBeenCalled();
    expect(history.push).toHaveBeenLastCalledWith(props.path);

    spy.mockRestore();
  })
})
