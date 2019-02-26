import React from 'react';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
};

const taskTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

class Task extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, id, editing, ...props} = this.props;
    // Pass through if we are editing
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}

export default compose(
  DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Task);
