import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';

class EmailInput extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    value: this.props.value,
    type: 'email'
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.value !== nextState.value) return true;
    if (this.state.isValid !== nextState.isValid) return true;
    if (this.state.attempted !== nextState.attempted) return true;
    if (this.state.error !== nextState.error) return true;
    return false;
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
    this.refs.textInput.blur();
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
    const textClass = classHelper('refInput-field', [
      ['refInput-field--noTitle', !this.props.title],
      ['refInput-field--isError', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    return {
      className: textClass,
      value: this.state.value,
      disabled: this.props.disabled,
      id: this.props.id,
      onChange: this._onChange,
      placeholder: this.props.placeholder,
      tabIndex: this.props.tabIndex,
      type: this.state.type,
      ref: 'textInput'
    }
  }

  render () {
    return (
      <div className={`EmailInput refInput ${this.props.className ? this.props.className : ''}`}>
        {this.props.title ? <label className="refInput-title" htmlFor={this.props.id}>{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="refInput-subTitle">{this.props.subTitle}</p> : null}
        <input {...this.inputProps()} />
      </div>
    );
  }
}

EmailInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool,
  value: PropTypes.string,
}

EmailInput.defaultProps = {
  className: null,
  disabled: false,
  error: false,
  placeholder: '',
  regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: false,
  value: ''
}

export default EmailInput;
