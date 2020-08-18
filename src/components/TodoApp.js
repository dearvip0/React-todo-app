import React from "react";
import "../components/styles.css";
import Headers from "./layout/Header";
import Footer from "../store/containers/Footer";
import Todos from "./Todos/Todos";
import AddTodo from "./Todos/AddTodo";
import axios from "axios";
class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  handleCheckboxChange = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  };

  deleteTodo = (id) => {
    let URL = `https://jsonplaceholder.typicode.com/todos/${id}`;
    axios.delete(URL).then((response) => {
      this.setState({
        todos: [
          ...this.state.todos.filter((todo) => {
            return todo.id !== id;
          })
        ]
      });
    });
  };
  addTodo = (title) => {
    const todoData = {
      title: title,
      complete: false
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", todoData)
      .then((response) => {
        console.log(response.data);
        this.setState({
          todos: [...this.state.todos, response.data]
        });
      });
  };

  componentDidMount() {
    const config = {
      param: {
        _limit: 5
      }
    };
    //Get request de lau danh sach
    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then((response) => {
        this.setState({ todos: response.data });
      });
  }

  render() {
    return (
      <div className="container">
        <Headers />
        <AddTodo addTodo={this.addTodo} />
        <Todos
          todos={this.state.todos}
          handleChange={this.handleCheckboxChange}
          deleteTodo={this.deleteTodo}
        />
        <Footer />
      </div>
    );
  }
}
export default TodoApp;
