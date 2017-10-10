import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';

class RadioGroup extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    value: this.props.value,
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

  _onChange = (value) => {
    if (this.state.isValid) {
      this.setState({ isValid: false })
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({ value: value });

    if (this.state.attempted) {
      this.validate(value)
    }
  }

  removeFocus () {
    this.refs.radioGroup.blur();
  }

  renderRadios () {
    const groupClass = classHelper('refGroup-item', [
      ['refGroup-item--inline', this.props.inline],
      ['refGroup-item--error', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    return this.props.data.map((item, index) => {
      const boxClass = classHelper('refGroup-radioInput', [
        ['refGroup-radioInput--isActive', this.state.value === item.code]
      ])

      return (
        <div className={groupClass} key={index} onClick={() => this._onChange(item.code)}>
          <div className={boxClass} />
          <label className="refGroup-label">{item.label}</label>
        </div>
      )
    });
  }

  render () {
    const newRadioClass = classHelper(`RadioGroup refInput ${this.props.className ? this.props.className : ''}`, [
      ['refInput-field--noTitle', !this.props.title]
    ]);

    return (
      <div className={newRadioClass} ref="radioGroup">
        {this.props.title ? <label className="refInput-title">{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="refInput-subTitle">{this.props.subTitle}</p> : null}
        <div className="refInput-group">
          {this.renderRadios()}
        </div>
      </div>
    )
  }
}

export default RadioGroup;

RadioGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  error: PropTypes.bool,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool,
  value: PropTypes.string
};

RadioGroup.defaultProps = {
  className: null,
  error: false,
  inline: false,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: false,
  value: null
};
