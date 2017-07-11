import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../templates';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';

import { template } from './fixtures';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::Templates', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches templates successfully', () => {
    nock(API)
      .get('/templates/template-dir')
      .reply(200, [template]);

    const expectedActions = [
      { type: types.FETCH_TEMPLATES_REQUEST },
      { type: types.FETCH_TEMPLATES_SUCCESS, templates: [template] }
    ];

    const store = mockStore({ templates: [], isFetching: false });

    return store.dispatch(actions.fetchTemplates('template-dir'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the template successfully', () => {
    nock(API)
      .get('/templates/template.html')
      .reply(200, template);

    const expectedActions = [
      { type: types.FETCH_TEMPLATE_REQUEST},
      { type: types.FETCH_TEMPLATE_SUCCESS, template }
    ];

    const store = mockStore({ template: {}, isFetching: true });

    return store.dispatch(actions.fetchTemplate(null, 'template.html'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('deletes the template successfully', () => {
    nock(API)
      .delete('/templates/template-dir/template.html')
      .reply(200);

    const expectedActions = [
      { type: types.DELETE_TEMPLATE_SUCCESS },
      { type: types.FETCH_TEMPLATES_REQUEST }
    ];

    const store = mockStore({});

    return store.dispatch(actions.deleteTemplate('template-dir', 'template.html'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_TEMPLATE_FAILURE when deleting a template failed', () => {
    nock(API)
      .delete('/templates/template.html')
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DELETE_TEMPLATE_FAILURE,
      error: 'something awful happened'
    };

    const store = mockStore({ templates: [template] });

    return store.dispatch(actions.deleteTemplate('template.html'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

  it('updates the template successfully', () => {
    nock(API)
      .put('/templates/template-dir/template.html')
      .reply(200, template);

    const expectedActions = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_TEMPLATE_SUCCESS, template }
    ];

    const store = mockStore({ metadata: { metadata: template } });

    return store.dispatch(actions.putTemplate('edit', 'template-dir', 'template.html'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates the template successfully', () => {
    nock(API)
      .put('/templates/template-dir/new_template.html')
      .reply(200, template);

    const expectedActions = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_TEMPLATE_SUCCESS, template }
    ];

    const store = mockStore({metadata: { metadata: { path: 'new_template.html' } } });

    return store.dispatch(actions.putTemplate('create', 'template-dir'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates PUT_TEMPLATE_FAILURE when updating template failed', () => {
    nock(API)
      .put(`/templates/assets/${template.name}`)
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_TEMPLATE_FAILURE, error: 'something awful happened' }
    ];

    const store = mockStore({ metadata: { metadata: template } });

    return store.dispatch(actions.putTemplate('edit', 'assets', template.name))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('creates VALIDATION_ERROR if required field is not provided.', () => {
    const expectedActions = [
      {
        type: types.VALIDATION_ERROR,
        errors: [
          "The filename is not valid."
        ]
      }
    ];

    const store = mockStore({ metadata: { metadata: { path: '', title: '' } } });

    store.dispatch(actions.putTemplate(template.name));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
