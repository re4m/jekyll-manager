import * as ActionTypes from '../constants/actionTypes';
import { sessionMetaUrl } from '../constants/api';
import { get } from '../utils/fetch';

export function fetchMeta() {
  return dispatch => {
    dispatch({ type: ActionTypes.FETCH_META_REQUEST });
    return get(
      sessionMetaUrl(),
      { type: ActionTypes.FETCH_META_SUCCESS, name: 'meta'},
      { type: ActionTypes.FETCH_META_FAILURE, name: 'error'},
      dispatch
    );
  };
}
