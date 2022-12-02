import { call, take, put, takeEvery, fork, all, spawn } from 'redux-saga/effects';
import loadBasicData from 'store/sagas/loadBasicData';
import watchProjects from 'store/sagas/watchProjects';
import whatchSelectedProject from 'store/sagas/whatchSelectedProject';



export default function* rootSaga() {
  const sagas = [
    loadBasicData,
    watchProjects,
    whatchSelectedProject,
  ]

  const retrySagas = yield sagas.map( (saga) => {
    return spawn( function* () {
      while(true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.warn(e);
        }
      }
    })
  })

  yield all(retrySagas);
  
}