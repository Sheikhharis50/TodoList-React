import React, { Component } from 'react';
import Todos from '../Todo/Todos';
import {v4 as uuid} from "uuid"; 
import axios from 'axios';
import {BASEURL} from '../../Constants';

class Home extends Component{
    intervalID;

    state = {
        todos: []
    }

    // Method called when Components Mount
    componentDidMount = () => {
        this.getData();
        this.ping();
    }

    // Method called when Components UnMount
    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    // Method to ping to Server
    ping = () => {
        axios.get(`${BASEURL}ping`).then(
            res => {
                if (res.data.state){
                    this.getData();
                }
                this.intervalID = setTimeout(this.ping.bind(this), 3000);
            }
        ).catch(
            e => console.log(e)
        )
    }

    // Method to getData from Server
    getData = () => {
        axios.get(`${BASEURL}todo`).then(
            res => {
                this.setState({ todos: res.data.data });
            }
        ).catch(
            e => console.log(e)
        )
    }

    // Toggle Complete
    markCompleteOrNot = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id ){
                    todo.completed = !todo.completed;
                    axios.put(
                        `${BASEURL}todo/${id}/`,
                        {
                            title: todo.title,
                            completed: todo.completed
                        }
                    )
                }
                return todo;
            })
        });
    }

    // del Todo Previous
    delTodo = (id, obj) => {
        obj.changeButtonState();
        this.setState({
            todos: this.state.todos.filter(todo => {
                return todo.id !== id;
            })
        });
    }

    // del Todo New
    delTodoNew = (id, obj) => {
        obj.changeButtonState();
        axios.delete(
            `${BASEURL}todo/${id}/`
        ).then(
            res => {
                this.setState({
                    todos: this.state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                });
            }
        ).catch(
            e => {
                console.log(e);
            }
        )
    }

    // add Todo Previous
    addTodo = (title, obj) => {
        obj.changeButtonState();
        this.setState({
            todos: this.state.todos.concat({
                id: uuid(),
                title,
                completed: false
            })
        });
        obj.changeButtonState();
    }

    // add Todo New 
    addTodoNew = (title, obj) => {
        obj.changeButtonState();
        axios.post(
            `${BASEURL}todo`,
            {
                title,
            }
        ).then(
            res => {
                this.setState({
                    todos: this.state.todos.concat({
                        id: res.data.data.id,
                        title: res.data.data.title,
                        completed: res.data.data.completed
                    })
                });
                obj.changeButtonState();
            }
        ).catch(
            e => {
                obj.changeButtonState();
            }
        )
    }

    render(){
        return (
            <React.Fragment>
                <div className="heading">
                    <h1>Home</h1>
                </div>
                <Todos todos={this.state.todos} markCompleteOrNot={this.markCompleteOrNot} delTodo={this.delTodoNew} addTodo={this.addTodoNew} />
            </React.Fragment>
        );
    }
}

export default Home;