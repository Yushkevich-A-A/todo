import { nanoid } from "nanoid";

export function createNewTask(data) {
  const odj = {
    ...data,
    id: nanoid(),
    create_date: Date.now(),
    status: 'queue',
    other_tasks: [],
    comments: [],
  }
  return odj;
} 