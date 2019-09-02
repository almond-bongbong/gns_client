import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import modules from './modules';

const configure = (initialState = {}) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  return createStore(
    modules,
    initialState,
    composeEnhancers(applyMiddleware(ReduxThunk)),
  );
};

export default configure;
