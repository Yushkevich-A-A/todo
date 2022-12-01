import { nanoid } from "nanoid";

const createAdditionalTask = (id, data) => {
  return {
    id: nanoid(),
    complete: false,
    main_task_id: id,
    description: data,
  }
}

export default createAdditionalTask;