import { createStore, combineReducers } from 'redux';
import serviceManageProject from 'store/projects/reducers';

const reducers = combineReducers({
  manageProject: serviceManageProject, 
});

const store = createStore(reducers);

export default store;