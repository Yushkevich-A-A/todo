import { createNewProject } from "lib/createNewProject";
import { createNewTask } from "lib/createNewTask";
import { cloneDeep } from 'lodash';

const initialState = []

function serviceManageProject( state = initialState, action ) {
  switch(action.type) {
    case "SET_INIT_DATA" :
      const { data } = action.payload;
      return [ ...data ];
    case "CREATE_PROJECT" :
      const { newProject } = action.payload;
      return [...state, { ...newProject }];
    case "DELETE_PROJECT" :
      const { reloadProject } = action.payload;
      return [...reloadProject];
    case "EDIT_PROJECT" :
      const { editedProject } = action.payload;
      const editProjectIndex = state.findIndex( item => item.id === editedProject.id);
      const newProjectsArray = cloneDeep(state);
      newProjectsArray.splice(editProjectIndex, 1, editedProject)
      return [...newProjectsArray];
    case "DND_EFFECT_PROJECT" :
        const { id_project, columns } = action.payload;
        const indexChangingColumns = state.findIndex( item => item.id === id_project);
        const projects = cloneDeep(state);
        projects[indexChangingColumns].columns = columns;
        return [...projects];
    default: 
      return state;
  }
}

export default serviceManageProject;