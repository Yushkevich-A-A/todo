import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import serviceManageProject from 'store/projects/reducers';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  manageProject: serviceManageProject, 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
    ),
);

sagaMiddleware.run(saga);

export default store;