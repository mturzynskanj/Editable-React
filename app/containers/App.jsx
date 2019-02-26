import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Columns from "../components/Columns.jsx";
import { createColumn } from "../actions/columns";

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('event',event);
    }, false);
  }


  render() {
    const { columns, createColumn } = this.props;
    console.log('createColumn===', createColumn);

    return (
      <div>
        <button
          className="add-column"
          onClick={createColumn.bind(null, { "name": 'default column' })}
        >
          +
        </button>
        <Columns columns={columns} />
      </div>
    );
  }
}

//export default App; 

export default compose(
  connect(
    state => ({
      columns: state.columns
    }),
    {
      createColumn
    }
  ),
  DragDropContext(HTML5Backend)
)(App);
