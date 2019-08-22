import Cookie from 'js-cookie';
import Router from 'next/router';
import { auth } from '../../api/auth';
import { getMyAccount } from '../../api/account';

export const authTypes = {
  AUTH: 'auth/AUTH',
  LOGOUT: 'auth/LOGOUT',
  SET_ME: 'auth/SET_ME',
};

export const authActions = {
  auth: () => async (dispatch) => {
    try {
      await auth();
      await dispatch(authActions.fetchMyAccount());
    } catch (e) {
      console.error(e);
    }
  },
  fetchMyAccount: () => async (dispatch) => {
    try {
      const { data } = await getMyAccount();
      dispatch(authActions.setMe(data.account));
    } catch (e) {
      console.error(e);
    }
  },
  logout: () => (dispatch) => {
    dispatch(authActions.setMe(null));
    Cookie.remove('authorization');
    Router.push('/');
  },
  setMe: me => ({ type: authTypes.SET_ME, me }),
};

const initialState = {
  me: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGOUT: return {
      ...state,
      me: null,
    };
    case authTypes.SET_ME: return {
      ...state,
      me: action.me,
    };
    case '': return;
    default: return state;
  }
};