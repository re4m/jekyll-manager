import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { preventDefault, generateTitle } from '../../utils/helpers';
import DocumentTitle from 'react-document-title';
import sha1 from 'sha1';
import { ADMIN_PREFIX } from '../../constants';


export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  componentDidMount() {
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePassChange(event) {
    this.setState({password: event.target.value});
  }


  handleSubmit(event) {
    console.log('A name was submitted: ', this.state);
    window.auth = sha1(this.state.username + ':' + sha1(this.state.password));
    event.preventDefault();
    browserHistory.push(
      `${ADMIN_PREFIX}/dashboard` // remove `_`
    );
  }

  render() {
    return (
      <DocumentTitle title="Login">
        <div>
          <form className="notfound" onSubmit={this.handleSubmit}>
            <label>Username <input name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}></input></label>
            <br/>
            <label>Password <input name="password" type="password" value={this.state.password} onChange={this.handlePassChange.bind(this)}></input></label>
            <br/>
            <input type="submit" value="Login"></input>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => ({
  // page: state.pages.page,
  // fieldChanged: state.metadata.fieldChanged,
  // errors: state.utils.errors,
  // updated: state.pages.updated,
  // config: state.config.config,
  // new_field_count: state.metadata.new_field_count
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // updateTitle,
  // updateBody,
  // updatePath,
  // putPage,
  // clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
