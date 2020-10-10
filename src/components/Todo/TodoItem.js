import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            color: "black",
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    render() {
        const { id,title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markCompleteOrNot.bind(this, id)}/>
                    <span style={{paddingLeft: '10px'}}>{title}</span>
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
        )
    }

}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markCompleteOrNot: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
};

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    float: 'right',
    cursor: 'pointer',
    borderRadius: '50%'
}


export default TodoItem
