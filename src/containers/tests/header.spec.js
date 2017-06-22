import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../Header';
import { config } from './fixtures';

const defaultProps = {
  admin: {},
  config: config.content
};

function setup(props = defaultProps) {
  const component = mount(
    <Header {...props} />
  );

  return {
    component: component,
    title: component.find('h3 span'),
    version: component.find('.version')
  };
}

describe('Containers::Header', () => {
  it('should render correctly', () => {
    const { component, title } = setup();
    const { config } = component.props();
    expect(title.text()).toEqual(config.title);
  });

  it('should render placeholder title', () => {
    const { component, title } = setup(Object.assign({}, defaultProps, {
      config: {}
    }));
    const { config } = component.props();
    expect(title.text()).toEqual('You have no title!');
  });

  it('should render app version', () => {
    const { component, version } = setup(Object.assign({}, defaultProps, {
      admin: { version: '0.1.0' }
    }));
    expect(version.text()).toEqual('0.1.0');
  });
});
