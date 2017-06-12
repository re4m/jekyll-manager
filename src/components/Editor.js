import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/coffee';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/plain_text';
import 'brace/mode/sass';
import 'brace/mode/scss';
import 'brace/mode/yaml';
import 'brace/theme/monokai';
import Splitter from './Splitter';

class Editor extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.type !== this.props.type;
  }

  handleChange() {
    // TODO better handling
    const { onEditorChange, editorChanged } = this.props;
    if (!editorChanged) {
      onEditorChange();
    }
  }

  getValue() {
    return this.refs.ace.editor.getValue();
  }

  render() {
    const { content, type, onEditorChange } = this.props;

    let mode;
    if (type) {
      const currentType = type.toLowerCase();
      const extn_modes = ["coffee", "css", "html", "json", "sass", "scss", "yaml"];
      if (extn_modes.includes(currentType)) {
        mode = currentType;
      } else if (currentType == 'js') {
        mode = 'javascript';
      } else if (currentType == 'yml') {
        mode = 'yaml';
      } else {
        mode = 'plain_text';
      }
    }

    return (
      <div>
      <div className="editor-wrap">
        <AceEditor
          editorProps={{ $blockScrolling: Infinity}}
          value={content}
          mode={mode}
          theme="monokai"
          width="100%"
          height="400px"
          showGutter={false}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="editor"
          fontSize={14}
          ref="ace"
          onChange={() => this.handleChange()}
          onBlur={onEditorChange} />
      </div>
      <div className="editor-mode">Syntax Mode: {mode}</div>
      <Splitter />
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.any.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default Editor;
