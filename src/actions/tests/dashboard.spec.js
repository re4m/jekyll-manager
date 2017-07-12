import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../dashboard';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { meta } from './fixtures';

describe('Actions::Dashboard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches app meta successfully', () => {
    nock(API)
      .get('/dashboard')
      .reply(200, meta);

    const expectedActions = [
      { type: types.FETCH_META_REQUEST },
      { type: types.FETCH_META_SUCCESS, meta }
    ];

    const store = mockStore({ meta: {} });

    return store.dispatch(actions.fetchMeta())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
