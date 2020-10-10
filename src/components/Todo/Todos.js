import React, { Component } from 'react';
import TodoItem from "./TodoItem";
import AddTodo from './AddTodo';
import PropTypes from 'prop-types';

class Todos extends Component {

    render() {
        return (
            <React.Fragment>
                {<AddTodo addTodo={this.props.addTodo} />}
                {this.props.todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} markCompleteOrNot={this.props.markCompleteOrNot} delTodo={this.props.delTodo} />
                ))}
            </React.Fragment>
        )
    }
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markCompleteOrNot: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
};

export default Todos;
