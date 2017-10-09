import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { classHelper } from './classHelper';
import Check from './Check';

class CheckGroup extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    checks: this.props.data,
    type: 'checks'
  }

  validate () {
    let result = [];

    this.state.checks.map((data, index) => {
      if (data.value) {
        result.push(data.label);
      }
    })

    let isValid;

    if (this.props.validate) {
      isValid = result.length ? true : false;
    } else {
      isValid = true;
    }

    this.setState({
      attempted: true,
      isValid: isValid
    });

    return {
      isValid: isValid,
      value: result
    }
  }

  _onChange = (changedIndex) => {
    if (this.state.isValid) {
      this.setState({ isValid: false })
    }

    let isValid = false;
    let checks = this.state.checks;

    checks.map((check, index) => {
      if (index === changedIndex) {
        if (!check.value) isValid = true;
        check.value = !check.value;
      } else if (check.value === true) {
        isValid = true;
      }
    });

    if (this.props.onChange) {
      this.props.onChange(checks);
    }

    this.setState({ checks: checks });

    if (this.state.attempted) {
      this.validate();
    }
  }

  removeFocus () {
    this.refs.checkGroup.blur();
  }

  renderChecks () {
    const groupClass = classHelper('refGroup-item', [
      ['refGroup-item--inline', this.props.inline],
      ['refGroup-item--error', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    return this.state.checks.map((data, index) => {
      const boxClass = classHelper('refGroup-checkInput', [
        ['refGroup-checkInput--isActive', data.value]
      ])

      return (
        <div className={groupClass} key={index} onClick={() => this._onChange(index)}>
          <div className={boxClass}><Check /></div>
          <label className="refGroup-label">{data.label}</label>
        </div>
      )
    });
  }

  render () {
    const newCheckClass = classHelper(`CheckGroup refInput ${this.props.className}`, [
      ['refInput-field--noTitle', !this.props.title]
    ]);

    return (
      <div className={newCheckClass} ref="checkGroup">
        {this.props.title ? <label className="refInput-title">{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="refInput-subTitle">{this.props.subTitle}</p> : null}
        <div className="refInput-group">
          {this.renderChecks()}
        </div>
      </div>
    )
  }
}

export default CheckGroup;

CheckGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  error: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool
};

CheckGroup.defaultProps = {
  className: null,
  error: false,
  inline: false,
  name: null,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: false,
};
