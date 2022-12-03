import { deleteData, postData } from 'api';
import { call, take, put, all, takeLeading } from 'redux-saga/effects';

function* workerAddPoroject() {
  while(true) {
    const action = yield take('ADD_PROJECT_SAGA');
    const newProject = yield call(postData, 'projects' , action.data );
    yield put({ type:'CREATE_PROJECT', payload: { newProject }});
    
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

function* workerDeletePoroject(action) {
  // while(true) {
  //   const action = yield take('DELETE_PROJECT_SAGA');
  //   const reloadProject = yield call(deleteData, 'projects' , action.id );
  //   yield put({ type:'DELETE_PROJECT', payload: { reloadProject }});
    
  // }
  const reloadProject = yield call(deleteData, 'projects', action.payload );
  yield put({ type:'DELETE_PROJECT', payload: { reloadProject }});
}

export default function* watchProjects () {
  yield all([
      call(workerAddPoroject),
      takeLeading('DELETE_PROJECT_SAGA', workerDeletePoroject)
    ])
}