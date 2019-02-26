import React from "react";

export default class Editable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, onEdit, onValueClick, editing, className } = this.props;

    return (
      <div className={className}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit = () => {
    return (
      <input
        type="text"
        ref={e => (e ? (e.selectionStart = this.props.value.length) : null)}
        autoFocus={true}
        defaultValue={this.props.value}
        onKeyPress={this.checkEnter}
        onClick={this.cancelEvent}
      />
    );
  };
  renderValue = () => {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">
          {this.props.value}
        </span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  cancelEvent = (e) => {
    e.stopPropagation();
  }

  renderDelete = () => {
    return (
      <button className="delete" onClick={this.props.onDelete}>
        x
      </button>
    );
  };
  checkEnter = ({ key, target: { value } }) => {
    if (key === "Enter") {
      this.finishEdit(value);
    }
  };
  finishEdit = value => {
    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
    }
  };
}
