import * as React from 'react'
import { shallow } from 'enzyme'
import * as ContentData from '../components/Layout/Context';
import Content from '../components/Content';

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
      location: {
        pathname: '/privacy',
      },
      push: jest.fn(),
    }),
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
  it('it should mock the context', () => {

    const wrapper = shallow(<Content />);
    expect(wrapper.find('form').exists()).toBe(true)
  })
  it('should return three children', () => {
    const wrapper = shallow(<Content />)
    expect(wrapper.find('form').children().length).toEqual(3)
  })
});
