import update from "react-addons-update";
import * as types from "../actions/columns";

const initialState = [];

export default function columns(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_COLUMN:
      return [...state, action.column];


    case types.DELETE_COLUMN: {
      const { id } = action;
      return state.filter(column => column.id !== id);
    }


    case types.UPDATE_COLUMN:
      return state.map(column => {
        if (column.id === action.id) {
          const { type, ...updatedColumn } = action;
          return Object.assign({}, column, updatedColumn);
        }

        return column;
      });

    case types.ADD_TO_COLUMN:
      const columnId = action.columnId;
      const taskId = action.taskId;

      return state.map(column => {
        const index = column.tasks.indexOf(taskId);

        if (index >= 0) {
          return Object.assign({}, column, {
            tasks:
              column.tasks.length > 1
                ? column.tasks
                  .slice(0, index)
                  .concat(column.tasks.slice(index + 1))
                : []
          });
        }
        if (column.id === columnId) {
          return Object.assign({}, column, {
            tasks: [...column.tasks, taskId]
          });
        }

        return column;
      });

    case types.DETACH_FROM_COLUMN:
      return state.map(column => {
        if (column.id === action.columnId) {
          return Object.assign({}, column, {
            tasks: column.tasks.filter(id => id !== action.taskId)
          });
        }

        return column;
      });

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const columns = state;
      const sourceColumn = columns.filter(column => {
        return column.tasks.indexOf(sourceId) >= 0;
      })[0];
      const targetColumn = columns.filter(column => {
        return column.tasks.indexOf(targetId) >= 0;
      })[0];
      const sourceTaskIndex = sourceColumn.tasks.indexOf(sourceId);
      const targetTaskIndex = targetColumn.tasks.indexOf(targetId);

      if (sourceColumn === targetColumn) {
        return state.map(column => {
          return column.id === sourceColumn.id
            ? Object.assign({}, column, {
              tasks: update(sourceColumn.tasks, {
                $splice: [
                  [sourceTaskIndex, 1],
                  [targetTaskIndex, 0, sourceId]
                ]
              })
            })
            : column;
        });
      } else {
        return state.map(column => {
          if (column === sourceColumn) {
            // get rid of the source task
            return Object.assign({}, column, {
              tasks:
                column.tasks.length > 1
                  ? column.tasks
                    .slice(0, sourceTaskIndex)
                    .concat(column.tasks.slice(sourceTaskIndex + 1))
                  : []
            });
          }

          if (column === targetColumn) {
            // and move it to target
            return Object.assign({}, column, {
              tasks: column.tasks
                .slice(0, targetTaskIndex)
                .concat([sourceId])
                .concat(column.tasks.slice(targetTaskIndex))
            });
          }

          return column;
        });
      }

      return state;

    default:
      return state;
  }
}
