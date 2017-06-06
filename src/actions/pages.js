import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from '../actions/utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, trimObject } from '../utils/helpers';
import { getTitleRequiredMessage, getFilenameNotValidMessage } from '../constants/lang';
import { pagesAPIUrl, pageAPIUrl } from '../constants/api';

export function fetchPages(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGES_REQUEST});
    return get(
      pagesAPIUrl(directory),
      { type: ActionTypes.FETCH_PAGES_SUCCESS, name: 'pages'},
      { type: ActionTypes.FETCH_PAGES_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function fetchPage(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PAGE_REQUEST});
    return get(
      pageAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_PAGE_SUCCESS, name: 'page'},
      { type: ActionTypes.FETCH_PAGE_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function putPage(mode, directory, filename = '') {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;

    // if path is not given or equals to directory, generate filename from the title
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else if (!path && !title) {
      return dispatch(
        validationError(validatePage(metadata))
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
      payload = { front_matter, raw_content };
    } else {
      payload = { path: path, front_matter, raw_content };
    }

    //send the put request
    return put(
      pageAPIUrl(directory, filename),
      preparePayload(payload),
      { type: ActionTypes.PUT_PAGE_SUCCESS, name: 'page'},
      { type: ActionTypes.PUT_PAGE_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function deletePage(directory, filename) {
  return (dispatch) => {
    return fetch(pageAPIUrl(directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_PAGE_SUCCESS });
      dispatch(fetchPages(directory));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_PAGE_FAILURE,
      error
    }));
  };
}

const validatePage = (metadata) => {
  return validator(
    metadata,
    { 'path': 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage()
    }
  );
};

const preparePayload = (obj) => JSON.stringify(trimObject(obj));
