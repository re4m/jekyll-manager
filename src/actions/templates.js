import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from '../actions/utils';
import { get, put, del } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, trimObject } from '../utils/helpers';
import { getTitleRequiredMessage, getFilenameNotValidMessage } from '../constants/lang';
import { templatesAPIUrl, templateAPIUrl } from '../constants/api';

export function fetchTemplates(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_TEMPLATES_REQUEST});
    return get(
      templatesAPIUrl(directory),
      { type: ActionTypes.FETCH_TEMPLATES_SUCCESS, name: "templates"},
      { type: ActionTypes.FETCH_TEMPLATES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchTemplate(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_TEMPLATE_REQUEST});
    return get(
      templateAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_TEMPLATE_SUCCESS, name: "template"},
      { type: ActionTypes.FETCH_TEMPLATE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putTemplate(mode, directory, filename = '', include_front_matter = true) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;

    let { path, raw_content } = metadata;
    if (!path) {
      return dispatch(
        validationError(validateTemplate(metadata))
      );
    }

    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});

    // omit raw_content, path and empty-value keys in metadata state from front_matter
    const front_matter = _.omit(metadata, (value, key, object) => {
      return key == 'raw_content' || key == 'path' || value === '';
    });

    let payload;
    if (mode == 'create') {
      filename = path;
      if (include_front_matter == false) {
        payload = { raw_content };
      } else {
        payload = { front_matter, raw_content };
      }
    } else {
      if (include_front_matter == false) {
        payload = { path: path, raw_content };
      } else {
        payload = { path: path, front_matter, raw_content };
      }
    }

    //send the put request
    return put(
      templateAPIUrl(directory, filename),
      preparePayload(payload),
      { type: ActionTypes.PUT_TEMPLATE_SUCCESS, name: 'template'},
      { type: ActionTypes.PUT_TEMPLATE_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function deleteTemplate(directory, filename) {
  return (dispatch) => {
    return fetch(templateAPIUrl(directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_TEMPLATE_SUCCESS });
      dispatch(fetchTemplates(directory));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_TEMPLATE_FAILURE,
      error
    }));
  };
}

const validateTemplate = (metadata) => {
  return validator(
    metadata,
    { 'path': 'filename' },
    {
      'path.filename': getFilenameNotValidMessage()
    }
  );
};

const preparePayload = (obj) => JSON.stringify(trimObject(obj));
