import React from "react";
import { connect } from "react-redux";
import Editable from "./Editable.jsx";
import Task from "./Task.jsx";
import { move } from "../actions/columns";

const Tasks = ({ tasks, move, onValueClick, onEdit, onDelete }) =>
  <ul className="tasks">
    {tasks.map(task =>
      <Task
        className="task"
        id={task.id}
        key={task.id}
        editing={task.editing}
        onMove={move}
      >
        <Editable
          editing={task.editing}
          value={task.task}
          onValueClick={onValueClick.bind(null, task.id)}
          onEdit={onEdit.bind(null, task.id)}
          onDelete={onDelete.bind(null, task.id)}
        />
      </Task>
    )}
  </ul>;

export default connect(() => ({}), {
  move
})(Tasks);
