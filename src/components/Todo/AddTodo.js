import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class AddTodo extends Component {

    state = {
        title: "",
        loading: false
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title, this);
        this.setState({title: ""});
    }

    changeButtonState = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        const btn_state = this.state.loading;
        return (
            <form onSubmit={this.onSubmit} className="d-flex flex-row flex-nowrap p-0">
                <div className="input-group mb-2">
                    <input 
                        type="text" 
                        className="form-control"
                        name="title" 
                        style={{flex: '10', padding: "5px", fontSize: "17px"}}
                        placeholder="Add Todo ..."
                        value={this.state.title}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className="mb-2 pl-2">
                    <button 
                    type="submit" 
                    className="btn btn-success form-control">
                        {btn_state && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {!btn_state && <span>Submit</span>}
                    </button>
                </div>
                
            </form>
        )
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
};
