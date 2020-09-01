import * as React from 'react'
import { mount, shallow } from 'enzyme'
import Input from '../components/Input'

const props = {
  name: 'updates',
  inputType: 'checkbox',
  copy: 'Receive updates about the product by email',
  conditions: {
    "required": false
  },
  register: jest.fn(),
  errors: {},
  pageType: 'privacy',
  values: {},
  setValues: jest.fn(e => props.values[props.name] = true)
}

describe('Input', () => {
  it('should match input type', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').prop('type')).toBe(props.inputType)
  })
  it('should match input default value', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').prop('value')).toBe('')
  })
  it('should have checkbox unchecked', () => {
    const wrapper = mount(<Input {...props} />)
    expect(wrapper.find('.input').prop('checked')).toBe(undefined)
  })
  it('should return values state with correct data after on change behaviour', () => {
    const wrapper = shallow(<Input {...props} />)
    const input = wrapper.find('.input')
    input.simulate('change', { target: { checked: true } })
    expect(props.values).toEqual({ updates: true })
    // expect(input.prop('checked')).toBe(true) - to fix
  })
})
