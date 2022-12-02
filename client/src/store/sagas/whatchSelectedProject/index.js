import { deleteData, postData, putData } from 'api';
import { call, take, put, takeEvery, fork, all, spawn } from 'redux-saga/effects';

function* workerAddTask() {
  while(true) {
    const action = yield take('ADD_TASK_SAGA');
    const editedProject = yield call(postData, 'task' , action.payload );
    yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
  }
}

// проработать ручку изменения проекта

// function* workerEditPoroject() {
//   while(true) {
//     const action = yield take('EDIT_PROJECT_SAGA');
//     const newProject = yield call(putData, 'projects' , action.data );
//     yield put({ type:'EDIT_PROJECT', payload: { newProject }});
    
//   }
// }

// function* workerDeletePoroject() {
//   while(true) {
//     const action = yield take('DELETE_PROJECT_SAGA');
//     const reloadProject = yield call(deleteData, 'projects' , action.id );
//     yield put({ type:'DELETE_PROJECT', payload: { reloadProject }});
    
//   }
// }

export default function* whatchSelectedProject () {
  yield all([
      call(workerAddTask)
      // call(workerDeletePoroject)
    ])
}