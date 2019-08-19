import Cookie from 'js-cookie';
import Router from 'next/router';

export const authTypes = {
  LOGOUT: 'auth/LOGOUT',
  SET_USER: 'auth/SET_USER',
};

export const authActions = {
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