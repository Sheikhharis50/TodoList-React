import React, { Component } from 'react';
import Todos from '../Todo/Todos';
import {v4 as uuid} from "uuid"; 
import axios from 'axios';

class Home extends Component{
    state = {
        todos: []
    }

    // Method called when Components Mount
    componentDidMount = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(
            res => {
                this.setState({ todos: res.data })
            }
        ).catch(
            e => console.log(e)
        )
    }

    // Toggle Complete
    markCompleteOrNot = (id) => {
        this.setState({
        todos: this.state.todos.map(todo => {
            todo.completed = todo.id === id ? !todo.completed : todo.completed
            return todo;
        })
        });
    }

    // del Todo Previous
    delTodo = (id) => {
        this.setState({
        todos: this.state.todos.filter(todo => {
            return todo.id !== id;
        })
        });
    }

    // del Todo New
    delTodoNew = (id) => {
        axios.delete(
            `https://jsonplaceholder.typicode.com/todos/${id}`
        ).then(
            res => {
                this.setState({
                    todos: this.state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                });
            }
        )
    }

    // add Todo Previous
    addTodo = (title) => {
        this.setState({
        todos: this.state.todos.concat({
            id: uuid(),
            title,
            completed: false
        })
        });
    }

    // add Todo New 
    addTodoNew = (title) => {
        axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            {
                title,
                completed: false
            }
        ).then(
            res => {
                this.setState({
                    todos: this.state.todos.concat({
                        id: res.data.id,
                        title: res.data.title,
                        completed: res.data.completed
                    })
                });
            }
        )   
    }

    render(){
        return (
            <React.Fragment>
                <div style={{background: 'white', color: 'black', padding: '5px', margin: '10px 0px'}}>
                    <h1>Home</h1>
                </div>
                <Todos todos={this.state.todos} markCompleteOrNot={this.markCompleteOrNot} delTodo={this.delTodoNew} addTodo={this.addTodoNew} />
            </React.Fragment>
        );
    }
}

export default Home;