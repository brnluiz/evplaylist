import React from 'react';
import {Component, PropTypes} from 'react';
import ExampleComponent from 'components/ExampleComponent/ExampleComponent';

class HelloWorldBox extends React.Component {
  render() {
    return(
      <ExampleComponent title={this.props.title} />
    );
  }
}

HelloWorldBox.propTypes = {
  title: PropTypes.string
} 
HelloWorldBox.defaultProps = {
  title: "Hello World!"
}

export default HelloWorldBox;
