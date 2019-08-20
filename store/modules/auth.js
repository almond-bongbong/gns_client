import Cookie from 'js-cookie';
import Router from 'next/router';
import { auth } from '../../api/auth';

export const authTypes = {
  AUTH: 'auth/AUTH',
  LOGOUT: 'auth/LOGOUT',
  SET_USER: 'auth/SET_USER',
};

export const authActions = {
  auth: () => async (dispatch) => {
    try {
      const user = await auth();
      dispatch(authActions.setUser(user));
    } catch (e) {
      console.error(e);
    }
  },
  logout: () => (dispatch) => {
    dispatch(authActions.setUser(null));
    Cookie.remove('authorization');
    Router.push('/');
  },
  setUser: user => ({ type: authTypes.SET_USER, user }),
};

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGOUT: return {
      ...state,
      user: null,
    };
    case authTypes.SET_USER: return {
      ...state,
      user: action.user,
    };
    case '': return;
    default: return state;
  }
};