import React, { Component, PropTypes } from 'react';
import _ from 'underscore';

export class Gauge extends Component {

  // A not-so-smart function
  singularize(size, str) {
    if (size != 1) return str;
    return str.replace(/s$/, '');
  }

  render() {
    const { percent, count, label } = this.props;
    return (
      <div className="gauge-wrapper">
        <div className="gauge" data-progress={percent}>
          <div className="core">
            <div className="count">{count}</div>
            <div className="label">{this.singularize(count, label)}</div>
          </div>
        </div>
      </div>
    );
  }
}

Gauge.propTypes = {
  percent: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default Gauge;
