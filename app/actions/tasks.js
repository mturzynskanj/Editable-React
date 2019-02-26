import uuid from "uuid";

export const CREATE_TASK = "CREATE_TASK";
export function createTask(task) {
  return {
    type: CREATE_TASK,
    task: {
      id: uuid.v4(),
      ...task
    }
  };
}

export const UPDATE_TASK = "UPDATE_TASK";
export function updateTask(updatedTask) {
  return {
    type: UPDATE_TASK,
    ...updatedTask
  };
}

export const DELETE_TASK = "DELETE_TASK";
export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id
  };
}
