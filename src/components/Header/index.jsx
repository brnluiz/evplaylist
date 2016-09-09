import React from 'react';
import { Component, PropTypes } from 'react';

import styles from './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '173019273133291'
    }
  }

  handleChange(e) {
    this.setState({url: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#/"><span className="glyphicon glyphicon-headphones" aria-hidden="true"></span> EvPlaylist</a>
          </div>

          <form
          className="navbar-form navbar-left"
          role="search"
          data-show="logged"
          onSubmit={this.handleSubmit.bind(this)} >
            <div className="input-group">
              <input
              type="text"
              name="event"
              className="form-control"
              value={this.state.url}
              onChange={this.handleChange.bind(this)} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-danger" >
                  <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </button>
              </span>
            </div>
          </form>

          <a className="btn btn-danger navbar-btn navbar-right" href="https://brunoluizone.typeform.com/to/QTLCIS" data-mode="1" target="_blank">Avalie o site</a>
          </div>
      </nav>
      </div>
      </div>
    );
  }
}
Header.propTypes = { onSubmit: React.PropTypes.func };

export default Header;
