import React, { Component } from 'react';

class FormContent extends Component {
  render () {
    return (
      <div className="FormContent">
        {this.props.children}
      </div>
    )
  }
}

FormContent.defaultProps = {
  type: 'content'
}

export default FormContent;
