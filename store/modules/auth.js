export const authTypes = {
  SET_USER: 'auth/SET_USER',
};

export const authActions = {
  setUser: user => ({ type: authTypes.SET_USER, user }),
};

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_USER: return {
      ...state,
      user: action.user,
    };
    case '': return;
    default: return state;
  }
};