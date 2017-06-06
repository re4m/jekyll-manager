import React from 'react';
import { mount } from 'enzyme';

import Collapsible from '../Collapsible';

const content = (
  <p>Lorem ipsum dolor sit amet</p>
);
const defaultProps = {
  label: 'Test content',
  panel: content
};

function setup(props=defaultProps) {
  const component = mount(<Collapsible {...props} />);

  return {
    component,
    label: component.find('.collapsible-toggle'),
    panel: component.find('.collapsible-panel')
  };
}

describe('Components::Collapsible', () => {
  it('should render correctly', () => {
    const { label, panel } = setup();
    expect(label.text()).toBe('Test content');
    expect(panel.prop('style').maxHeight).toBe(0);
  });

  it('should toggle correct class names', () => {
    let { label } = setup();
    expect(label.prop('className')).toBe('collapsible-toggle collapsed');

    label.simulate('click');
    expect(label.prop('className')).toBe('collapsible-toggle');

    label.simulate('click');
    expect(label.prop('className')).toBe('collapsible-toggle collapsed');
  });

  it('should assign optional className based on props', () => {
    let { panel } = setup(Object.assign({}, defaultProps, {
      overflow: false
    }));
    expect(panel.prop('className')).toBe('collapsible-panel no-overflow');
  });

  it('should render panel with dynamic height', () => {
    const { component, label, panel } = setup(Object.assign({}, defaultProps, {
      height: 50
    }));
    component.setProps({ height: 50 });
    label.simulate('click');
    expect(panel.prop('style').maxHeight).not.toBe(0);
    component.setProps({ height: 100 });
    expect(panel.prop('style').maxHeight).toBe(200);
  });
});
