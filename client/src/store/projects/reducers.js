import { createNewProject } from "lib/createNewProject";
import { createNewTask } from "lib/createNewTask";
import { nanoid } from 'nanoid';

const initialState = []

function serviceManageProject( state = initialState, action ) {
  switch(action.type) {
    case "SET_INIT_DATA" :
      const { data } = action.payload;
      return [ ...data ];
    case "CREATE_PROJECT" :
      const { newProject } = action.payload;
      const initDataProject = createNewProject( newProject );
      return [...state, { ...initDataProject }];
    case "DELETE_PROJECT" :
      const { id } = action.payload;
      const stateWithoutProject = state.filter( item => item.id !== id )
      return [...stateWithoutProject];
    case "EDIT_PROJECT" :
      const { editedProject } = action.payload;
      const editProjectIndex = state.findIndex( item => item.id === editedProject.id);
      const newProjectsArray = [...state]
      newProjectsArray.splice(editProjectIndex, 1, editedProject)
      return [...newProjectsArray];
    default: 
      return state;
  }
}

export default serviceManageProject;