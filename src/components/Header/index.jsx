import React from 'react';
import { Component, PropTypes } from 'react';

import styles from './styles.css';
import QueryInput from 'components/QueryInput';

const Header = ({onSubmit, queryValue}) => (
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

          <QueryInput onSubmit={onSubmit} value={queryValue}/>
          <a className="btn btn-danger navbar-btn navbar-right" href="https://brunoluizone.typeform.com/to/QTLCIS" data-mode="1" target="_blank">Avalie o site</a>
        </div>
      </nav>
    </div>
  </div>
);
Header.propTypes = { onSubmit: React.PropTypes.func };

export default Header;
