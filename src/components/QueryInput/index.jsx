import React from 'react';
import { Component, PropTypes } from 'react';

class QueryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.value
    }
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({query: this.state.query});
  }

  render() {
    return (
      <form
        className="navbar-form navbar-left"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div className="input-group">
          <input
            type="text"
            name="event"
            className="form-control"
            value={this.state.query}
            onChange={this.handleChange.bind(this)}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-danger" >
              <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
            </button>
          </span>
        </div>
      </form>
    )
  }
}

export default QueryInput;
