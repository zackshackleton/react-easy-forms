import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';

class RadioGroup extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    value: this.props.value || null,
    type: 'radio'
  }

  validate (value = this.state.value) {
    let isValid;

    if (this.props.validate) {
      isValid = value ? true : false;
    } else {
      isValid = true;
    }

    this.setState({
      attempted: true,
      isValid: isValid
    });

    return {
      isValid: isValid,
      value: value
    }
  }

  _onChange = (event) => {
    if (this.state.isValid) {
      this.setState({ isValid: false })
    }

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }

    this.setState({ value: event.target.value });

    if (this.state.attempted) {
      this.validate(event.target.value)
    }
  }

  removeFocus () {
    this.refs.radioGroup.blur();
  }

  renderRadios () {
    const groupClass = classHelper('RadioGroup-group', [
      ['RadioGroup-group--inline', this.props.inline],
      ['RadioGroup-group--error', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    const groupName = this.props.name ? this.props.name : this.props.labels.join();

    return this.props.labels.map((label, index) => {
      return (
        <div className={groupClass} key={index}>
          <input className="RadioGroup-radioInput" id={`${label}-${index}`} name={groupName} onChange={this._onChange} type="radio" value={label} />
          <label className="RadioGroup-radioLabel" htmlFor={`${label}-${index}`}>{label}</label>
        </div>
      )
    });
  }

  render () {
    const newRadioClass = classHelper('RadioGroup', [
      ['RadioGroup--noTitle', !this.props.title]
    ]);

    return (
      <div className={newRadioClass} ref="radioGroup">
        {this.props.title ? <label className="RadioGroup-title">{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="RadioGroup-subTitle">{this.props.subTitle}</p> : null}
        {this.renderRadios()}
      </div>
    )
  }
}

export default RadioGroup;

RadioGroup.propTypes = {
  error: PropTypes.bool,
  inline: PropTypes.bool,
  labels: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool,
  value: PropTypes.string
};

RadioGroup.defaultProps = {
  error: false,
  inline: true,
  name: null,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: true,
};
