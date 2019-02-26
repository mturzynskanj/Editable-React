import React from "react";
import Column from "./Column.jsx";

export default ({ columns }) => {
  return (
    <div className="columns">
      {columns.map(column =>
        <Column className="column" key={column.id} column={column} />
      )}
    </div>
  );
};
