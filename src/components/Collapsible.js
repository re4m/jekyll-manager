import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

export default class Collapsible extends Component {

  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);

    this.state = {
      collapsedPanel: true,
      height: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.height !== nextProps.height) {
      const panelHeight = nextProps.height;
      this.setState({ height: panelHeight + panelHeight });
    }
  }

  toggleCollapse() {
    const panelHeight = findDOMNode(this.refs.panel).clientHeight + 2;
    if (this.state.collapsedPanel) {
      this.setState({
        collapsedPanel: false,
        height: panelHeight
      });
    }
    else {
      this.setState({
        collapsedPanel: true,
        height: 0
      });
    }
  }

  render() {
    const { label, panel, overflow } = this.props;
    const collapsibleClasses = classnames({
      "collapsible-toggle": true,
      "collapsed": this.state.collapsedPanel
    });

    const panelClasses = classnames({
      "collapsible-panel": true,
      "no-overflow": !overflow
    });

    return (
      <div>
        <div className={collapsibleClasses} onClick={this.toggleCollapse}>
          {label}
          <div className="chevrons"><i className="fa fa-chevron-up" /></div>
        </div>
        <div className={panelClasses} style={{ maxHeight: this.state.height }}>
          <div className="panel-content" ref="panel">
            {panel}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  panel: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  height: PropTypes.number,
  overflow: PropTypes.bool
};
