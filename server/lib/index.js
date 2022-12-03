const { v4: uuidv4 } = require('uuid');


const createAdditionalTask = (data) => {
  return {
    ...data,
    id: uuidv4(),
    complete: false,
  }
}

function createNewProject (data) {
  return {
    name: data.name,
    description: data.description,
    id: uuidv4(),
    task_list: [],
    columns: [
      {
        id: 'queue',
        tasks: []
      },
      {
        id: 'development',
        tasks: []
      },
      {
        id: 'done',
        tasks: []
      }
    ]
  }
}

function createNewTask(data) {
  const odj = {
    ...data,
    id: uuidv4(),
    create_date: Date.now(),
    finish_date: null,
    status: 'queue',
    other_tasks: [],
    comments: [],
  }
  return odj;
} 

function createFileObj(data) {
  const odj = {
    ...data,
    id: uuidv4(),
  }
  return odj;
} 

module.exports = {
  createAdditionalTask,
  createNewProject,
  createNewTask,
  createFileObj,
}