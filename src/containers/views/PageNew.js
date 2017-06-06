import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import Collapsible from '../../components/Collapsible';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath, updateDraft } from '../../actions/metadata';
import { createPage } from '../../actions/pages';
import { clearErrors } from '../../actions/utils';
import { getLeaveMessage } from '../../constants/lang';
import { injectDefaultFields } from '../../utils/metadata';
import { preventDefault } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

export class PageNew extends Component {

  constructor(props) {
    super(props);

    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);

    this.state = { panelHeight: 0 };
  }

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(`${ADMIN_PREFIX}/pages/${nextProps.page.path}`);
    }

    if (this.props.new_field_count !== nextProps.new_field_count) {
      const panelHeight = findDOMNode(this.refs.frontmatter).clientHeight;
      this.setState({ panelHeight: panelHeight + 60 }); // extra height for various types of metafield field
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors} = this.props;
    // clear errors if any
    if (errors.length) {
      clearErrors();
    }
  }

  routerWillLeave(nextLocation) {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  }

  handleClickSave(e) {
    const { fieldChanged, createPage, params } = this.props;

    // Prevent the default event from bubbling
    preventDefault(e);

    if (fieldChanged) {
      createPage(params.splat);
    }
  }

  render() {
    const {
      errors, updated, updateTitle, updateBody, updatePath, fieldChanged, params, config
    } = this.props;

    const keyboardHandlers = {
      'save': this.handleClickSave,
    };

    return (
      <HotKeys handlers={keyboardHandlers} className="single">
        {errors.length > 0 && <Errors errors={errors} />}
        <div className="content-header">
          <Breadcrumbs type="pages" splat={params.splat || ''} />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            <InputPath onChange={updatePath} type="pages" path="" />
            <InputTitle onChange={updateTitle} title="" ref="title" />

            <Collapsible
              label="Edit Front Matter"
              overflow={true}
              height={this.state.panelHeight}
              panel={<Metadata fields={{}} ref="frontmatter"/>} />

            <Splitter />

            <MarkdownEditor
              onChange={updateBody}
              onSave={this.handleClickSave}
              placeholder="Body"
              initialValue=""
              ref="editor" />
            <Splitter />
          </div>

          <div className="content-side">
            <Button
              onClick={this.handleClickSave}
              type="create"
              active={fieldChanged}
              triggered={updated}
              icon="plus-square"
              block />
          </div>
        </div>
      </HotKeys>
    );
  }
}

PageNew.propTypes = {
  createPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  new_field_count: PropTypes.number
};

const mapStateToProps = (state) => ({
  page: state.pages.page,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.pages.updated,
  config: state.config.config,
  new_field_count: state.metadata.new_field_count
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateTitle,
  updateBody,
  updatePath,
  updateDraft,
  createPage,
  clearErrors
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageNew));
