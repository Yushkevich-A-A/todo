import { deleteData, postData, postDataForm, putData } from 'api';
import { call, put, fork, all, takeLatest, takeLeading } from 'redux-saga/effects';

function* workerAddTask(action) {
  const editedProject = yield call(postData, 'task' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerDeleteTask(action) {
  const editedProject = yield call(deleteData, 'task' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

// проработать ручку изменения проекта

function* workerChangeColumns(action) {
  yield fork(putData, 'task/columns' , action.payload );
  yield put({ type:'DND_EFFECT_PROJECT', payload: action.payload});
}

function* workerChangeName(action) {
    const editedProject = yield call(putData, 'task/name' , action.payload );
    yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerChangeDescription(action) {
  const editedProject = yield call(putData, 'task/description' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerChangePriority(action) {
  const editedProject = yield call(putData, 'task/priority' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

// дополнительные задачи

function* workerAddAdditionalTask(action) {
  const editedProject = yield call(postData, 'task/additional' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerChangeAdditionalTask(action) {
  const editedProject = yield call(putData, 'task/additional' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerDeleteAdditionalTask(action) {
  const editedProject = yield call(deleteData, 'task/additional' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

// отправка файлов на сервер

function* workerAddFilesTask(action) {
  const editedProject = yield call(postDataForm, 'task/files' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

function* workerDeleteFilesTask(action) {
  const editedProject = yield call(deleteData, 'task/files' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

// добавление комментария

function* workerAddComment(action) {
  const editedProject = yield call(postData, 'task/comment' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

// изменение даты окончания задачи

function* workerChangeDeadline(action) {
  const editedProject = yield call(putData, 'task/deadline' , action.payload );
  yield put({ type:'EDIT_PROJECT', payload: { editedProject }});
}

export default function* whatchSelectedProject () {
  yield all([
      takeLatest('CREATE_NEW_TASK_SAGA', workerAddTask),
      takeLeading('DELETE_TASK_SAGA', workerDeleteTask),
      takeLatest('EDIT_COLUMNS_SAGA', workerChangeColumns),
      takeLatest("CHANGE_NAME_SAGA", workerChangeName),
      takeLatest("CHANGE_DESCRIPTION_SAGA", workerChangeDescription),
      takeLatest("CHANGE_PRIORITY_SAGA", workerChangePriority),
      takeLeading("ADD_ADDITIONAL_TASK_SAGA", workerAddAdditionalTask),
      takeLatest("CHANGE_ADDITIONAL_TASK_SAGA", workerChangeAdditionalTask),
      takeLeading("DELETE_ADDITIONAL_TASK_SAGA", workerDeleteAdditionalTask),
      takeLeading("ADD_FILES_TASK_SAGA", workerAddFilesTask),
      takeLeading("DELETE_FILE_TASK_SAGA", workerDeleteFilesTask),
      takeLeading("ADD_COMMENT_SAGA", workerAddComment),
      takeLeading("CHANGE_FINAL_DATA_SAGA", workerChangeDeadline),
    ])
}