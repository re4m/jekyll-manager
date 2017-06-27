import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import Gauge from './Gauge';
import { toTitleCase } from '../../utils/helpers';

export class GaugeBoard extends Component {

  calcPercentage(operand, base) {
    return Math.round(operand / base * 100);
  }

  renderGauges(item) {
    const { dataSet, baseValue } = this.props;

    return _.map(item, (entry, index) => {
      return (
        <Gauge
          key={index}
          percent={this.calcPercentage(dataSet[entry].length, baseValue)}
          count={dataSet[entry].length}
          label={toTitleCase(entry.replace('_', ' '))}
          hoverContents={dataSet[entry]} />
      );
    });
  }

  renderColumns(list) {
    const slotClasses = classnames({
      "slot": true,
      "single-column": list.length == 1
    });

    return _.map(list, (items, i) => {
      return (
        <div key={i} className={slotClasses}>
          {this.renderGauges(items)}
        </div>
      );
    });
  }

  renderRows() {
    const { layoutArray } = this.props;
    return _.map(layoutArray, (items, i) => {
      return (
        <div key={i} className="row">
          {this.renderColumns(items)}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="gauge-board">
        <div className="caption">
          <span className="well">
            Total no. of content files: <strong>{this.props.baseValue}</strong>
          </span>
        </div>
        {this.renderRows()}
      </div>
    );
  }
}

GaugeBoard.propTypes = {
  dataSet: PropTypes.object.isRequired,
  baseValue: PropTypes.number.isRequired,
  layoutArray: PropTypes.array.isRequired
};

export default GaugeBoard;
