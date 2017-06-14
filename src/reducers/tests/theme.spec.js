import reducer from '../theme';
import * as types from '../../constants/actionTypes';

import { template, theme } from './fixtures';

describe('Reducers::Theme', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      theme: {},
      template: {},
      isFetching: false,
      updated: false
    });
  });

  it('should handle fetchTheme', () => {
    expect(
      reducer({}, {
        type: types.FETCH_THEME_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({ theme }, {
        type: types.FETCH_THEME_SUCCESS,
        theme: theme
      })
    ).toEqual({
      theme: theme,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_THEME_FAILURE
      })
    ).toEqual({
      isFetching: false
    });
  });

  it('should handle fetchThemeItem(id)', () => {
    expect(
      reducer({}, {
        type: types.FETCH_THEME_ITEM_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_THEME_ITEM_SUCCESS,
        template
      })
    ).toEqual({
      template,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_THEME_ITEM_FAILURE
      })
    ).toEqual({
      template: {},
      isFetching: false
    });
  });

  it('should handle putThemeItem', () => {
    expect(
      reducer({}, {
        type: types.PUT_THEME_ITEM_SUCCESS,
        template
      })
    ).toEqual({
      template,
      updated: true
    });
    expect(
      reducer({updated:true}, {})
    ).toEqual({
      updated: false
    });
  });
});
