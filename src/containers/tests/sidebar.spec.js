import React from 'react';
import _ from 'underscore';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import { Sidebar } from '../Sidebar';

import { config, site, blank_site } from './fixtures';

const defaultProps = {
  config,
  site,
  templates: ['_layouts/test.html']
};

const nonCollectionLinks = ['content_pages', 'data_files', 'static_files', 'configuration', 'drafts', 'posts'];

function setup(props = defaultProps) {
  const actions = {
    fetchTemplates: jest.fn()
  };

  const component = mount(<Sidebar {...props} {...actions} />);

  return {
    component: component,
    actions: actions,
    links: component.find('.routes').find('li')
  };
}

describe('Containers::Sidebar', () => {
  it('should render correctly', () => {
    const { links, component } = setup();
    const { config, templates } = component.props();

    const keys = _.filter(_.keys(site), key => nonCollectionLinks.includes(key));
    const collections = site.collections.length > 1 ? site.collections.length : 0;
    const theme = config.theme ? 1 : 0;

    const actual = links.length;
    const expected = keys.length + collections + templates.length + theme + 1; // the link to /configuration

    expect(actual).toEqual(expected);
  });

  it('should call fetchTemplates action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchTemplates).toHaveBeenCalled();
  });

  it('should render collapsible list-item for collections', () => {
    const { component, links } = setup();
    const listItem = links.find('.accordion-label');
    expect(listItem.text()).toContain('Collections');
    expect(component.state('collapsedPanel')).toBe(true);

    listItem.find('a').first().simulate('click');
    expect(component.state('collapsedPanel')).toBe(false);
    listItem.find('a').first().simulate('click');
    expect(component.state('collapsedPanel')).toBe(true);
  });

  it('should render fine for a "blank" Jekyll site', () => {
    const minimal_config = { gems: ['jekyll-admin'] };
    const { component, links, actions } = setup(Object.assign({}, defaultProps, {
      site: blank_site,
      config: minimal_config,
      templates: []
    }));
    expect(links.length).toEqual(1); // the link to /Configuration
  });
});
