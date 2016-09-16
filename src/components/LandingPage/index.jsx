import React from 'react';
import styles from './styles.css'
import Footer from 'components/Footer'
import QueryInput from 'components/QueryInput';

const LandingPage = ({onSubmit}) => (
  <div className="homepage">
    <div className="row">
      <div className="col-md-offset-3 col-md-6">
        <h1>
          <a href="#/"><span className="glyphicon glyphicon-headphones" aria-hidden="true"></span> EvPlaylist</a>
        </h1>
        <h2>Easily create music playlists from Facebook Events</h2>
      </div>
    </div>

    <div className="row homepage-field">
      <div className="col-lg-offset-3 col-lg-6 center">
        <QueryInput onSubmit={onSubmit} extraClass="homepage-field"/>
      </div>
    </div>

    <Footer />
  </div>
);

LandingPage.propTypes = { onSubmit: React.PropTypes.func };

export default LandingPage;
