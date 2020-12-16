import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setToken } from './reducers/auth/authActions';

export default function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);

  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if(localStorage.getItem('accessToken')){
    store.dispatch(setToken(localStorage.getItem('accessToken')));
  }
  

  return store;
}