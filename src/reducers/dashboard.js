import {
  FETCH_META_REQUEST, FETCH_META_SUCCESS, FETCH_META_FAILURE
} from '../constants/actionTypes';

export default function dashboard(state = {
  meta: {},
  isFetching: true
}, action) {
  switch (action.type) {
    case FETCH_META_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_META_SUCCESS:
      return Object.assign({}, state, {
        meta: action.meta,
        isFetching: false
      });
    case FETCH_META_FAILURE:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}
