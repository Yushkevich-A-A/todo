import { nanoid } from 'nanoid';

export  function createNewProject (data) {
  return {
    ...data,
    id: nanoid(),
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