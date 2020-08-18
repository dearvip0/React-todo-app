import React from "react";

class AddTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  addTodo = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState = {
      title: ""
    };
  };

  onInputChangle = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  render() {
    return (
      <form className="form-container" onSubmit={this.addTodo}>
        <input
          type="text"
          placeholder="Add Todo..."
          className="input-text"
          value={this.state.title}
          onChange={this.onInputChangle}
        />
        <input type="submit" value="Submit" className="input-submit" />
      </form>
    );
  }
}
export default AddTodo;
