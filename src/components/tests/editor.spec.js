import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';
import { json } from './fixtures';

const content = JSON.stringify(json);

function setup(props = {content, editorChanged: false, type: 'yaml'}) {
  const actions = {
    onEditorChange: jest.fn()
  };

  let component = shallow(
    <Editor {...props} {...actions} />
  );

  return {
    component,
    editor: component.find('.editor'),
    actions: actions
  };
}

describe('Components::Editor', () => {
  it('should render correctly', () => {
    const { editor } = setup();
    expect(editor.prop('value')).toEqual(content);
  });
  it('should call onEditorChange if editor is not changed', () => {
    const { actions, editor } = setup();
    editor.simulate('change');
    expect(actions.onEditorChange).toHaveBeenCalled();
  });
});
