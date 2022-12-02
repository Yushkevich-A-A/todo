import { deleteData, postData, putData } from 'api';
import { call, take, put, takeEvery, fork, all, spawn, takeLatest } from 'redux-saga/effects';

function* workerAddTask() {
  while(true) {
    const action = yield take('ADD_TASK_SAGA');
    const editedProject = yield call(postData, 'task' , action.payload );
    yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
  }
}

// проработать ручку изменения проекта

function* workerChangeColumns(action) {
  yield fork(putData, 'task/columns' , action.payload );
  yield put({ type:'DND_EFFECT_PROJECT', payload: action.payload});
}


// function* workerAddTask() {
//   while(true) {
//     const action = yield take('ADD_TASK_SAGA');
//     const editedProject = yield call(postData, 'task' , action.payload );
//     yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
//   }
// }


export default function* whatchSelectedProject () {
  yield all([
      call(workerAddTask),
      takeLatest('EDIT_COLUMNS_SAGA', workerChangeColumns)
    ])
}