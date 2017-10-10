import React, { Component } from 'react';

class FormContent extends Component {
  render () {
    return (
      <div className={`refContent ${this.props.className ? this.props.className : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

FormContent.defaultProps = {
  className: null,
  type: 'content'
}

export default FormContent;
