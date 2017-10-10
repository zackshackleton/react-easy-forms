import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';

class TextArea extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    type: 'textArea',
    value: this.props.value,
  }

  validate (value = this.state.value) {
    let isValid = false;

    if (this.props.validate) {
      isValid = this.props.regex.test(value);
    } else {
      isValid = true;
    }

    this.setState({
      attempted: true,
      isValid: isValid
    });

    return {
      isValid: isValid,
      value: this.state.value
    };
  }

  removeFocus () {
    this.refs.textArea.blur();
  }

  _onChange = (event) => {
    if (this.state.isValid) {
      this.setState({ isValid: false });
    }

    this.setState({ value: event.target.value });

    if (this.state.attempted) {
      this.validate(event.target.value);
    }
  }

  inputProps () {
    const textFieldClass = classHelper('refInput-field', [
      ['refInput-field--noTitle', !this.props.title],
      ['refInput-field--isError', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    return {
      className: textFieldClass,
      value: this.state.value,
      disabled: this.props.disabled,
      id: this.props.id,
      onChange: this._onChange,
      placeholder: this.props.placeholder,
      tabIndex: this.props.tabIndex,
      rows: this.props.rows,
      ref: 'textArea'
    }
  }

  render () {
    return (
      <div className={`TextArea refInput ${this.props.className ? this.props.className : ''}`}>
        {this.props.title ? <label className="refInput-title" htmlFor={this.props.id}>{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="refInput-subTitle">{this.props.subTitle}</p> : null}
        <textarea {...this.inputProps()} />
      </div>
    );
  }
}

TextArea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool
}

TextArea.defaultProps = {
  className: null,
  disabled: false,
  error: false,
  placeholder: '',
  regex: /([^\s])/,
  rows: 4,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: false,
  value: ''
}

export default TextArea;
