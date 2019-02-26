import uuid from "uuid";

export const CREATE_COLUMN = "CREATE_COLUMN";
export function createColumn(column) {
  return {
    type: CREATE_COLUMN,
    column: {
      id: uuid.v4(),
      tasks: column.tasks || [],
      ...column
    }
  };
}

export const UPDATE_COLUMN = "UPDATE_COLUMN";
export function updateColumn(updatedColumn) {
  return {
    type: UPDATE_COLUMN,
    ...updatedColumn
  };
}

export const DELETE_COLUMN = "DELETE_COLUMN";
export function deleteColumn(id) {
  return {
    type: DELETE_COLUMN,
    id
  };
}

export const ADD_TO_COLUMN = "ADD_TO_COLUMN";
export function attachToColumn(columnId, taskId) {
  return {
    type: ADD_TO_COLUMN,
    columnId,
    taskId
  };
}

export const DETACH_FROM_COLUMN = "DETACH_FROM_COLUMN";
export function detachFromColumn(columnId, taskId) {
  return {
    type: DETACH_FROM_COLUMN,
    columnId,
    taskId
  };
}

export const MOVE = "MOVE";
export function move({ sourceId, targetId }) {
  return {
    type: MOVE,
    sourceId,
    targetId
  };
}
