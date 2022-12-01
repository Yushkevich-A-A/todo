import { call, take, put, takeEvery, fork, all, spawn } from 'redux-saga/effects';
import loadBasicData from 'store/sagas/loadBasicData';


export default function* rootSaga() {
  const sagas = [
    loadBasicData,
    // watchProjects,
    // watchTask,
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