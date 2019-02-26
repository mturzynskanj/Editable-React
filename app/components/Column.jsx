import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import Tasks from "./Tasks.jsx";
import Editable from "./Editable.jsx";
import ItemTypes from "../constants/itemTypes";
import * as columnActions from "../actions/columns";
import * as taskActions from "../actions/tasks";

const taskTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.column.tasks.length) {
      targetProps.attachToColumn(targetProps.column.id, sourceId);
    }
  }
};

class Column extends React.Component {
  render() {
    const props = this.props;
    // const { connectDropTarget, column, columnTasks, className } = props;
    const { column, columnTasks, className } = props;
    const { id: columnId } = column;
    

    // return connectDropTarget(
    return (
      <div className={className}>
        <div
          className="column-header"
          onClick={() => props.updateColumn({ id: columnId, editing: true })}
        >
          <div className="column-add-task">
            <button onClick={this.addTask.bind(this, columnId)}>+</button>
          </div>
          <Editable
            className="column-name"
            editing={column.editing}
            value={column.name}
            onEdit={name =>
              props.updateColumn({ id: columnId, name, editing: false })}
          />
          <div className="column-delete">
            <button onClick={this.deleteColumn.bind(this, column)}>x</button>
          </div>
        </div>
        <Tasks
          tasks={columnTasks.reverse()}
          onValueClick={id => props.updateTask({ id, editing: true })}
          onEdit={(id, task) => props.updateTask({ id, task, editing: false })}
          onDelete={(id, e) => this.deleteTask(columnId, id, e)}
        />
      </div>
    );
  }
  deleteColumn(column, e) {
    e.stopPropagation();

    console.log('inside deleteColumn');

    const columnId = column.id;

    //Clean up tasks
    column.tasks.forEach(taskId => {
    this.props.detachFromColumn(columnId, taskId);
    this.props.deleteTask(taskId);
    });

    this.props.deleteColumn(columnId);
  }
  addTask(columnId, e) {
    e.stopPropagation();

    const o = this.props.createTask({
      task: "New task"
    });
    this.props.attachToColumn(columnId, o.task.id);
  }
  deleteTask(columnId, taskId, e) {
    e.stopPropagation();

    this.props.detachFromColumn(columnId, taskId);
    this.props.deleteTask(taskId);
  }
}

//export default Column;

export default compose(
  connect(
    (state, props) => ({
      columnTasks: props.column.tasks
        .map(id => state.tasks[state.tasks.findIndex(task => task.id === id)])
        .filter(task => task)

    }),
    {
      ...columnActions,
      ...taskActions
    }
  ),
  DropTarget(ItemTypes.TASK, taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Column);
