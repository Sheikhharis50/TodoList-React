import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    state = {
        loading: false
    }

    getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            color: "black",
        }
    }

    getSelectedStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            paddingLeft: '10px'
        }
    }

    changeButtonState = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        const { id,title,completed } = this.props.todo;
        const btn_state = this.state.loading;
        return (
            <div style={this.getStyle()}>
                <p className="d-flex justify-content-between align-items-center m-0">
                    <span>
                        <input type="checkbox" checked={completed} onChange={this.props.markCompleteOrNot.bind(this, id)}/>
                        <span style={this.getSelectedStyle()}>{title}</span>
                    </span>
                    <button onClick={this.props.delTodo.bind(this, id, this)} className="btn btn-danger rounded-circle del-btn">
                        {btn_state && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {!btn_state && <span>x</span>}
                    </button>
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

export default TodoItem
