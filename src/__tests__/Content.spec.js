import * as React from 'react'
import { shallow } from 'enzyme'
import * as ContentData from '../components/Layout/Context';
import Content from '../components/Content';


const mockPush = jest.fn()


jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    location: {
      pathname: '/privacy',
    },
    push: mockPush,
  })
}));

const content = {
  nextPath: '/done',
  formSections: [
    {
      "name": "updates",
      "type": "input",
      "inputType": "checkbox",
      "copy": "Receive updates about Tray.io product by email",
      "conditions": {
        "required": false
      }
    },
    {
      "name": "marketing",
      "type": "input",
      "inputType": "checkbox",
      "copy": "Receive communication by email for other products created by the Tray.io team",
      "conditions": {
        "required": false
      }
    },
    {
      "name": "Submit",
      "type": "button",
      "path": "/done"
    }
  ]
}

jest
  .spyOn(ContentData, 'useContentData')
  .mockImplementation(() => content);

describe('Content', () => {
  it('should return three children', () => {
    const wrapper = shallow(<Content />)
    expect(wrapper.find('form').children().length).toEqual(3)
  })
  it('should contain two inputs', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper.find('input').length).toBe(2)
  })
  it('should contain button component', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper.find('button').exists()).toBe(true)
  })
  it('should call the action to redirect to nextPath page on button click behaviour', () => {
    const wrapper = shallow(<Content />);
    const button = wrapper.find('form')
    button.simulate('submit')

    expect(mockPush).toHaveBeenCalledWith(content.nextPath)
  })
});
