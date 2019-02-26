import * as types from "../actions/tasks";

const initialState = [];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TASK: {
      console.log('state is ===', action.task);
      return [...state, action.task];
    }

    case types.UPDATE_TASK:
      return state.map(task => {
        if (task.id === action.id) {
          const { type, ...updatedTask } = action;
          return Object.assign({}, task, updatedTask);
        }

        return task;
      });

    case types.DELETE_TASK:
      return state.filter(task => task.id !== action.id);

    default:
      return state;
  }
}
