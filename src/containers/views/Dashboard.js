import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';
import { fetchMeta } from '../../actions/dashboard';
import Gauge from '../../components/dashboard/Gauge';
import GaugeBoard from '../../components/dashboard/GaugeBoard';
import Splitter from '../../components/Splitter';
import { VERSION } from '../../constants';

export class Dashboard extends Component {

  componentDidMount() {
    const { fetchMeta } = this.props;
    fetchMeta();
  }

  getUsername() {
    const config = this.props.config.content;

    let user = 'User';
    if (_.isString(config.author)) {
      user = config.author;
    } else if (_.isObject(config.author)) {
      user = config.author.name;
    } else if (config.name) {
      user = config.name;
    }

    return user;
  }

  totalSiteFiles() {
    const site = this.props.meta.site;
    const keys = Object.keys(site).filter(key => {
      return !key.includes('collection');
    });

    return _.map(keys, key => {
      return site[key].length;
    }).reduce((a, b) => a + b, 0);
  }

  renderTile(obj) {
    const keys = Object.keys(obj);
    return _.map(keys, (key, i) => {
      return (
        <div className="tile-entry" key={i}>
          <div className="tile-key">{key}:</div>
          <div className="tile-value">{obj[key]}</div>
        </div>
      );
    });
  }

  render() {
    const { isFetching, meta } = this.props;
    if (isFetching) {
      return null;
    }

    const { jekyll, admin, site } = meta;

    const user = this.getUsername();
    const size = this.totalSiteFiles();


    const { collections } = site;
    const site_keys = Object.keys(site);


    const pages = site_keys.filter(key => {
      return key.includes('_pages');
    });

    const files = site_keys.filter(key => {
      return key.includes('_files');
    });

    const posts = site_keys.filter(key => {
      return ['drafts', 'posts'].includes(key);
    });

    const collection_docs = site_keys.filter(key => {
      return key == 'collection_docs';
    });

    const gaugeList = [
      [pages, files, collection_docs],
      [posts]
    ];


    return (
      <div className="single">
        <div className="content-header">
          <h1>Welcome, {user}!</h1>
        </div>
        <div className="dashboard">
          <div className="main">
            <GaugeBoard
              dataSet={site}
              baseValue={size}
              layoutArray={gaugeList} />
          </div>
          <Splitter />
          <div className="tiles">
            <div className="first tile">
              <div className="label">Jekyll</div>
              {this.renderTile(jekyll)}
            </div>
            <div className="last tile">
              <div className="label">Admin</div>
              {this.renderTile(admin)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchMeta: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  meta: state.dashboard.meta,
  config: state.config.config,
  isFetching: state.drafts.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMeta
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
