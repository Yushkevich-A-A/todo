import { put, fork } from 'redux-saga/effects';
import { getData } from 'api';

function* loadData() {
  const data = yield fork(getData, 'projects');
  yield put({ type:'SET_INIT_DATA', payload: { data }});
}

export default function* loadBasicData() {
  yield fork(loadData);
}
