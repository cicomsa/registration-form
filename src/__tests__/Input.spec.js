import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Input from '../components/Input'

const props = {
  name: 'Privacy',
  inputType: 'checkbox',
  copy: 'Receive updates about Tray.io product by email',
  conditions: {
    "required": false
  },
  register: jest.fn(),
  errors: {},
  pageType: 'privacy',
  state: {},
  dispatch: jest.fn()
}

describe('Input', () => {
  it('should return component', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').exists()).toBe(true)
  })
  it('should match input type', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').prop('type')).toBe(props.inputType)
  })
  it('should match input default value', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').prop('defaultValue')).toBe('')
  })
  it('should have checkbox unchecked', () => {
    const wrapper = shallow(<Input {...props} />)
    expect(wrapper.find('.input').prop('checked')).toBe(undefined)
  })
  it('should call dispatch function on blur', async () => {
    const wrapper = mount(<Input {...props} />)
    wrapper
      .find('.input')
      .simulate('blur', { target: { checked: true } })
    expect(props.dispatch).toHaveBeenCalled()
  })
})
