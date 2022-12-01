export const createProject = (newProject) => {
  return { type: "CREATE_PROJECT", payload: { newProject } };
}

export const deleteProject = (id) => {
  return { type: "DELETE_PROJECT", payload: { id } };
}

export const editProject = (editedProject) => {
  return { type: "EDIT_PROJECT", payload: { editedProject } };
}

export const createNewTaskAction = ( idProjectToAdd, dataTask ) => {
  return { type: "CREATE_NEW_TASK", payload: { idProjectToAdd, dataTask} };
}